/* eslint-disable unicorn/no-process-exit -- This is a CLI script */
import { execSync } from "node:child_process";

/**
 * Renovate PRのpackage replacementを検出する
 *
 * 検出方法:
 * 1. PR本文（RENOVATE_PR_BODY環境変数）からreplacementテーブルをパース
 * 2. package.jsonのgit diffを解析して実際の変更を確認
 * 3. 両方にマッチするreplacementのみを出力
 *
 * 出力形式: "old-package-name new-package-name" (標準出力、改行区切りで複数可)
 * replacementがない場合は何も出力しない
 */

interface Replacement {
  oldPackage: string;
  newPackage: string;
}

/**
 * RenovateのPR本文からreplacementテーブルをパースする
 */
function parseReplacementsFromPRBody(prBody: string): Replacement[] {
  const replacements: Replacement[] = [];

  const lines = prBody.split("\n");
  let isInTable = false;

  for (const line of lines) {
    // テーブルヘッダーを検出（Package列とUpdate列を含む）
    if (line.includes("| Package |") && line.includes("| Update |")) {
      isInTable = true;
      continue;
    }

    // テーブル区切り行をスキップ
    const tableSeparatorPattern = /^\|[\s:|-]+\|$/;
    if (tableSeparatorPattern.test(line)) {
      continue;
    }

    // テーブル終了を検出
    if (isInTable && !line.startsWith("|")) {
      break;
    }

    if (isInTable) {
      // 行を列に分割（空の列を除外）
      const columns = line
        .split("|")
        .map((col) => col.trim())
        .filter((col) => col.length > 0);

      // Update列に "replacement" が含まれているかチェック
      if (!columns.includes("replacement")) {
        continue;
      }

      // Package列（通常最初の列）から "old → new" を抽出
      // 形式: [old-pkg](url) → [@scope/new-pkg](url)
      const [packageColumn] = columns;
      if (!packageColumn) {
        continue;
      }

      // 矢印で分割
      const [oldPart, newPart] = packageColumn.split("→").map((p) => p.trim());
      if (!oldPart || !newPart) {
        continue;
      }

      // Markdownリンクからパッケージ名を抽出: [package-name](url)
      const packageNamePattern = /\[([^\]]+)]/;
      const oldMatch = packageNamePattern.exec(oldPart);
      const newMatch = packageNamePattern.exec(newPart);

      if (oldMatch?.[1] && newMatch?.[1]) {
        replacements.push({
          oldPackage: oldMatch[1],
          newPackage: newMatch[1],
        });
      }
    }
  }

  return replacements;
}

/**
 * package.jsonのdiffから削除・追加されたパッケージを抽出
 */
function parsePackageJsonDiff(diff: string): {
  removed: Map<string, string>;
  added: Map<string, string>;
} {
  const lines = diff.split("\n");
  const removedPackages = new Map<string, string>();
  const addedPackages = new Map<string, string>();

  for (const line of lines) {
    // 削除された行: -    "package-name": "version"
    const removedMatch = /^-\s+"([^"]+)":\s+"([^"]+)"/.exec(line);
    if (removedMatch?.[1] && removedMatch[2]) {
      removedPackages.set(removedMatch[1], removedMatch[2]);
      continue;
    }

    // 追加された行: +    "package-name": "version"
    const addedMatch = /^\+\s+"([^"]+)":\s+"([^"]+)"/.exec(line);
    if (addedMatch?.[1] && addedMatch[2]) {
      addedPackages.set(addedMatch[1], addedMatch[2]);
      continue;
    }
  }

  return {
    removed: removedPackages,
    added: addedPackages,
  };
}

/**
 * PR本文のreplacementとpackage.json diffを照合
 */
function validateReplacements(
  candidates: Replacement[],
  removed: Map<string, string>,
  added: Map<string, string>,
): Replacement[] {
  const validated: Replacement[] = [];

  for (const candidate of candidates) {
    const { oldPackage, newPackage } = candidate;

    // package.jsonで実際に削除・追加されているか確認
    if (removed.has(oldPackage) && added.has(newPackage)) {
      validated.push(candidate);
    }
  }

  return validated;
}

/**
 * フォールバック: バージョンベースの検出
 * バージョンが同じで名前が変わった場合をreplacementとみなす
 */
function detectByVersionMatch(
  removed: Map<string, string>,
  added: Map<string, string>,
): Replacement[] {
  const replacements: Replacement[] = [];

  for (const [removedName, removedVersion] of removed) {
    for (const [addedName, addedVersion] of added) {
      // バージョンが同じ（^や~を除去して比較）
      const normalizedRemovedVersion = removedVersion.replace(/^[\^~]/, "");
      const normalizedAddedVersion = addedVersion.replace(/^[\^~]/, "");

      if (normalizedRemovedVersion === normalizedAddedVersion) {
        replacements.push({
          oldPackage: removedName,
          newPackage: addedName,
        });
      }
    }
  }

  return replacements;
}

try {
  // package.jsonの差分を取得
  const baseBranch = process.env.GITHUB_BASE_REF ?? "HEAD^";
  const diff = execSync(
    `git diff origin/${baseBranch}...HEAD -- package.json`,
    {
      encoding: "utf8",
    },
  );

  if (!diff) {
    console.error("No changes in package.json");
    process.exit(0);
  }

  // package.jsonの変更を解析
  const { removed, added } = parsePackageJsonDiff(diff);

  // PR本文からreplacementを抽出（環境変数が設定されている場合）
  const prBody = process.env.RENOVATE_PR_BODY;
  let replacements: Replacement[] = [];

  if (prBody) {
    // PR本文が利用可能な場合：PR本文をパースして照合
    const candidates = parseReplacementsFromPRBody(prBody);

    if (candidates.length > 0) {
      // PR本文のreplacement候補をpackage.json diffと照合
      replacements = validateReplacements(candidates, removed, added);

      if (process.env.GITHUB_ACTIONS) {
        console.error(
          `Found ${candidates.length} replacement candidate(s) in PR body`,
        );
        console.error(`Validated ${replacements.length} replacement(s)`);
      }
    }
  }

  // PR本文がない、またはreplacement候補がない場合：
  // フォールバック: 従来のロジック（バージョンが同じで名前が変わった場合）
  if (replacements.length === 0) {
    if (process.env.GITHUB_ACTIONS) {
      console.error("Falling back to version-based detection");
    }

    replacements = detectByVersionMatch(removed, added);
  }

  // 結果を出力
  if (replacements.length === 0) {
    console.error("No package replacement detected");
    process.exit(0);
  }

  // 複数のreplacementを改行区切りで出力
  for (const { oldPackage, newPackage } of replacements) {
    console.log(`${oldPackage} ${newPackage}`);
  }

  process.exit(0);
} catch (error) {
  console.error("Error detecting replacement:", error);
  process.exit(1);
}
