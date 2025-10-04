/* eslint-disable unicorn/no-process-exit -- This is a CLI script */
import { execSync } from "node:child_process";

/**
 * package.jsonのgit diffを解析してパッケージのreplacementを検出する
 *
 * 出力形式: "old-package-name new-package-name" (標準出力)
 * replacementがない場合は何も出力しない
 */

try {
  // package.jsonの差分を取得（base branchとの比較）
  // GitHub Actionsではbase branchがorigin/masterなど
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

  const lines = diff.split("\n");
  const removedPackages = new Map<string, string>();
  const addedPackages = new Map<string, string>();

  // dependencies セクションの変更を解析
  for (const line of lines) {
    // 削除された行: -    "package-name": "version"
    const removedMatch = /^-\s+"([^"]+)":\s+"([^"]+)"/.exec(line);
    if (removedMatch) {
      const [, packageName, version] = removedMatch;
      removedPackages.set(packageName, version);
      continue;
    }

    // 追加された行: +    "package-name": "version"
    const addedMatch = /^\+\s+"([^"]+)":\s+"([^"]+)"/.exec(line);
    if (addedMatch) {
      const [, packageName, version] = addedMatch;
      addedPackages.set(packageName, version);
      continue;
    }
  }

  // replacementを検出: バージョンが同じで名前が変わった場合
  for (const [removedName, removedVersion] of removedPackages) {
    for (const [addedName, addedVersion] of addedPackages) {
      // バージョンが同じ（^や~を除去して比較）
      const normalizedRemovedVersion = removedVersion.replace(/^[\^~]/, "");
      const normalizedAddedVersion = addedVersion.replace(/^[\^~]/, "");

      if (normalizedRemovedVersion === normalizedAddedVersion) {
        // replacement検出
        console.log(`${removedName} ${addedName}`);
        process.exit(0);
      }
    }
  }

  console.error("No package replacement detected");
  process.exit(0);
} catch (error) {
  console.error("Error detecting replacement:", error);
  process.exit(1);
}
