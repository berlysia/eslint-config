/**
 * oxlint用の型定義
 * @see https://oxc.rs/docs/guide/usage/linter/config
 */

export type RuleSeverity = "off" | "warn" | "error";

export type RuleEntry = RuleSeverity | [RuleSeverity, ...unknown[]];

export type RulesRecord = Record<string, RuleEntry>;

/**
 * oxlintのネイティブプラグイン（Rust実装）
 */
export type OxlintNativePlugin =
  | "eslint"
  | "typescript"
  | "react"
  | "unicorn"
  | "import"
  | "jest"
  | "vitest"
  | "jsx-a11y"
  | "jsdoc"
  | "promise"
  | "node";

/**
 * overrides内のファイルパターン設定
 */
export type OxlintOverride = {
  files?: string[];
  rules?: RulesRecord;
  plugins?: OxlintNativePlugin[];
  jsPlugins?: string[];
};

/**
 * oxlintの設定ファイル構造
 */
export type OxlintConfig = {
  $schema?: string;
  plugins?: OxlintNativePlugin[];
  jsPlugins?: string[];
  rules?: RulesRecord;
  overrides?: OxlintOverride[];
};

/**
 * berlysiaOxlint関数のオプション
 */
export type OxlintOptions = {
  typescript?: boolean | { tsConfigPath?: string | string[] };
  react?: boolean;
  testLibrary?: "jest" | "vitest" | false;
  // 将来的な拡張用
  overrides?: {
    core?: RulesRecord;
    typescript?: RulesRecord;
    unicorn?: RulesRecord;
    test?: RulesRecord;
    import?: RulesRecord;
    comments?: RulesRecord;
    react?: RulesRecord;
    node?: RulesRecord;
    jsdoc?: RulesRecord;
    promise?: RulesRecord;
  };
};
