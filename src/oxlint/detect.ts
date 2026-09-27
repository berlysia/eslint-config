/**
 * 依存パッケージの自動検出ロジック
 */

import { isPackageExists } from "local-pkg";

export interface DetectedDependencies {
  typescript: boolean;
  react: boolean;
  testLibrary: "vitest" | "jest" | false;
  typeAware: boolean;
}

/**
 * プロジェクトの依存パッケージを自動検出
 */
export function detectDependencies(): DetectedDependencies {
  const useTypeScript = isPackageExists("typescript");
  const useReact = isPackageExists("react");
  const testLibrary = isPackageExists("vitest")
    ? "vitest"
    : isPackageExists("jest")
      ? "jest"
      : false;

  return {
    typescript: useTypeScript,
    react: useReact,
    testLibrary,
    // 型情報を使うlintはoxlint-tsgolintが入っているときだけ動く
    typeAware: useTypeScript && isPackageExists("oxlint-tsgolint"),
  };
}
