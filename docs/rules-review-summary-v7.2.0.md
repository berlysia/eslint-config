# ESLint v7.2.0 新規ルール設定レビューサマリー

**分析日**: 2025-10-04

## エグゼクティブサマリー

- **総ルール数**: 78個
- **即座に有効化推奨**: **15個**
- **継続off推奨**: **62個**（59個は既存ポリシーに従い既設定済み）
- **判断要検討**: **1個**

## 📊 推奨設定概要

| プラグイン                | 総ルール数 | 有効化推奨 | off推奨 | 判断要 |
| ------------------------- | ---------- | ---------- | ------- | ------ |
| eslint-plugin-unicorn     | 18         | 12         | 6       | 0      |
| eslint-plugin-jest        | 1          | 0          | 1       | 0      |
| eslint-plugin-jsdoc       | 13         | 0          | 13      | 0      |
| @eslint/markdown          | 20         | 0          | 20      | 0      |
| eslint-plugin-n           | 1          | 1          | 0       | 0      |
| eslint-plugin-react-hooks | 24         | 0          | 24      | 0      |
| eslint-plugin-import-x    | 1          | 0          | 0       | 1      |

---

## ✅ 即座に有効化推奨（15個）

以下のルールは既存コードベースとの整合性が高く、実用的なため有効化を推奨します。

### eslint-plugin-unicorn (12個)

| ルール名                                       | 理由                                                                              | 自動修正 |
| ---------------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| `unicorn/consistent-date-clone`                | 日付クローンの一貫性は重要。new Date(date)とstructuredClone(date)の使い分けを統一 | ✅       |
| `unicorn/no-accessor-recursion`                | getter/setter内での同名プロパティアクセスは無限ループの原因。明確なバグパターン   | ❌       |
| `unicorn/no-instanceof-builtins`               | Array.isArray()などの専用メソッドの方が型安全                                     | ✅       |
| `unicorn/no-named-default`                     | import { default as foo }は冗長。import fooを使うべき                             | ✅       |
| `unicorn/no-unnecessary-array-flat-depth`      | flat(1)は冗長（デフォルトが1）                                                    | ✅       |
| `unicorn/no-unnecessary-array-splice-count`    | splice(index, Infinity)よりsplice(index)が簡潔                                    | ✅       |
| `unicorn/no-unnecessary-slice-end`             | slice(0, array.length)は冗長                                                      | ✅       |
| `unicorn/no-useless-error-capture-stack-trace` | V8では自動的にスタックトレースが記録される                                        | ❌       |
| `unicorn/prefer-bigint-literals`               | BigIntリテラル(123n)の方が簡潔で意図が明確                                        | ✅       |
| `unicorn/prefer-classlist-toggle`              | classList.toggle()の方が簡潔で読みやすい                                          | ✅       |
| `unicorn/prefer-import-meta-properties`        | import.meta.envやimport.meta.urlの使用を推奨（ESM環境での適切なAPI使用）          | ❌       |
| `unicorn/prefer-single-call`                   | メソッドチェーンを1回の呼び出しに統一（可読性とのトレードオフあり、warnレベル）   | ❌       |
| `unicorn/require-module-specifiers`            | ESM環境では拡張子が必須。モジュール解決の明示性を向上                             | ❌       |

### eslint-plugin-n (1個)

| ルール名                  | 理由                                                                    | 自動修正 |
| ------------------------- | ----------------------------------------------------------------------- | -------- |
| `node/no-top-level-await` | ライブラリコードではトップレベルawaitを禁止すべき（利用側の制約になる） | ❌       |

**⚠️ 設定注意**:

- スクリプトファイルでトップレベルawaitを許可する場合のオーバーライド設定例:

```javascript
{
  files: ["scripts/**/*.ts", "scripts/**/*.js"],
  rules: {
    "node/no-top-level-await": "off"
  }
}
```

- CommonJS環境で`unicorn/prefer-import-meta-properties`を無効化する場合:

```javascript
{
  files: ["**/*.cjs", "**/*.cts"],
  rules: {
    "unicorn/prefer-import-meta-properties": "off"
  }
}
```

- ブラウザ向けビルド環境やCJSで`unicorn/require-module-specifiers`を無効化する場合:

```javascript
// ブラウザ向けビルド環境（bundlerが拡張子を解決）
{
  files: ["src/browser/**/*.ts", "src/components/**/*.tsx"],
  rules: {
    "unicorn/require-module-specifiers": "off"
  }
}

// CommonJS環境
{
  files: ["**/*.cjs", "**/*.cts"],
  rules: {
    "unicorn/require-module-specifiers": "off"
  }
}
```

---

## 🚫 継続off推奨（63個）

### 既存ポリシーにより既設定済み（59個）

以下のルールは既存の設定ポリシーに従い、既に`off`設定済みです。

#### eslint-plugin-jest (1個)

- `test/prefer-ending-with-an-expect`: false positiveが多い

#### eslint-plugin-jsdoc (13個)

- **ポリシー**: TypeScript型定義優先、JSDocは最小限使用
- すべての新規ルール（13個）をoff継続

#### @eslint/markdown (20個)

- **ポリシー**: Markdownコード例の自由度を保つ
- すべての新規ルール（20個）をoff継続

#### eslint-plugin-react-hooks (24個)

- **ポリシー**: React Compiler関連の実験的ルールは安定版まで待機
- すべての新規ルール（24個）をoff継続

#### eslint-plugin-import-x (1個)

- `import/prefer-namespace-import`: 判断要検討（後述）

### 新規off推奨（4個）

#### eslint-plugin-unicorn (4個)

| ルール名                            | 理由                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| `unicorn/consistent-assert`         | アサーションスタイルの統一を強制するが、柔軟性を保つべき     |
| `unicorn/no-array-reverse`          | Array#reverse()の使用を完全に禁止するのは制限が厳しすぎる    |
| `unicorn/no-array-sort`             | Array#sort()の使用を完全に禁止するのは制限が厳しすぎる       |
| `unicorn/prefer-class-fields`       | 既存コードは伝統的なコンストラクタスタイル。移行は破壊的変更 |
| `unicorn/require-module-attributes` | import attributesはまだ実験的機能（JSON/CSS modules）        |

---

## 🤔 判断要検討（1個）

以下のルールは判断軸をユーザーに提示します。

### 1. `import/prefer-namespace-import`

**現在**: `off`
**判断軸**: 名前空間インポートを標準化したいか？tree shakingとのトレードオフを考慮

**説明**:

```javascript
import { a, b, c } from "module"; // NG
import * as module from "module"; // OK
```

**トレードオフ**:

- ✅ 名前空間インポート: 統一感、モジュール境界が明確
- ✅ 個別インポート: tree shakingに有利、明示的

**推奨アクション**:

- 一般的には`off`推奨（tree shaking優先）
- 大規模モジュールの場合は`error`を検討

---

## 🔧 設定変更の手順

### ステップ1: 有効化推奨ルールの適用

以下のファイルを更新します：

#### `src/configs/unicorn.ts`

```typescript
// 以下のルールをoffから変更
"unicorn/consistent-date-clone": "error",
"unicorn/no-accessor-recursion": "error",
"unicorn/no-instanceof-builtins": "error",
"unicorn/no-named-default": "error",
"unicorn/no-unnecessary-array-flat-depth": "error",
"unicorn/no-unnecessary-array-splice-count": "error",
"unicorn/no-unnecessary-slice-end": "error",
"unicorn/no-useless-error-capture-stack-trace": "error",
"unicorn/prefer-bigint-literals": "error",
"unicorn/prefer-classlist-toggle": "error",
"unicorn/prefer-import-meta-properties": "error",
"unicorn/prefer-single-call": "warn",  // 可読性とのトレードオフのため警告レベル
"unicorn/require-module-specifiers": "error",
```

#### `src/configs/node.ts`

```typescript
// 以下のルールをoffからerrorに変更
"node/no-top-level-await": "error",
```

**⚠️ 重要**: 必要に応じてオーバーライド設定を追加する場合は、メインのeslint.config.jsに以下を追加：

```javascript
// スクリプトファイルでトップレベルawaitを許可
{
  files: ["scripts/**/*.ts", "scripts/**/*.js"],
  rules: {
    "node/no-top-level-await": "off"
  }
}

// CommonJS環境でimport.meta関連とモジュール拡張子要求を無効化
{
  files: ["**/*.cjs", "**/*.cts"],
  rules: {
    "unicorn/prefer-import-meta-properties": "off",
    "unicorn/require-module-specifiers": "off"
  }
}

// ブラウザ向けビルド環境でモジュール拡張子要求を無効化
{
  files: ["src/browser/**/*.ts", "src/components/**/*.tsx"],
  rules: {
    "unicorn/require-module-specifiers": "off"
  }
}
```

### ステップ2: 既存コードのチェック

```bash
# 新しいルールでチェック実行
pnpm lint

# 自動修正可能なものを修正
pnpm lint:fix
```

### ステップ3: 判断要検討ルールの決定

上記「判断要検討」セクションを参照し、チームで議論して決定してください。

---

## 📝 変更影響の見積もり

### 影響度: 低〜中

- **自動修正可能**: 15個中8個（53%）
- **破壊的変更の可能性**: 低〜中（ESM拡張子要求により既存コードの修正が必要な可能性）
- **false positive**: 最小限（実用的なルールのみ選定）

### 推奨タイミング

1. **即実施可能**: 自動修正可能なルール（8個）
2. **レビュー後実施**: 自動修正不可ルール（7個）
3. **チーム議論後**: 判断要検討ルール（1個）

---

## 📚 参考資料

- [詳細レビューYAML](./rules-review-v7.2.0.yaml): 全ルールの詳細分析
- [新規追加ルール一覧](./new-rules-v7.2.0.md): ルールの説明とドキュメントリンク

---

## 🎯 次のアクション

- [ ] 有効化推奨ルール（15個）を設定ファイルに反映
- [ ] `pnpm lint`で既存コードへの影響を確認
- [ ] モジュール拡張子の追加が必要な箇所を修正
- [ ] 自動修正可能なルールは`pnpm lint:fix`で修正
- [ ] 判断要検討ルール（1個）についてチームで議論
- [ ] 必要に応じてオーバーライド設定を追加（ブラウザ向けビルド、CommonJS等）
- [ ] コミット: `chore: enable new ESLint rules v7.2.0`
