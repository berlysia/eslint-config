# 新規追加ルール一覧 (v7.2.0)

依存関係の更新により、各プラグインで新しいルールが追加されました。
これらのルールは現在すべて `"off"` に設定されています。

## 目次

- [eslint-plugin-unicorn](#eslint-plugin-unicorn)
- [eslint-plugin-jest](#eslint-plugin-jest)
- [eslint-plugin-jsdoc](#eslint-plugin-jsdoc)
- [@eslint/markdown](#eslintmarkdown)
- [eslint-plugin-n](#eslint-plugin-n)
- [eslint-plugin-react-hooks](#eslint-plugin-react-hooks)
- [eslint-plugin-import-x](#eslint-plugin-import-x)

---

## eslint-plugin-unicorn

**バージョン**: 61.0.2

### 新規追加ルール

| ルール名                                       | 説明                                         | ドキュメント                                                                                                                  |
| ---------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `unicorn/consistent-assert`                    | アサーションの一貫性を強制                   | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/consistent-assert.md)                    |
| `unicorn/consistent-date-clone`                | 日付のクローン方法の一貫性を強制             | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/consistent-date-clone.md)                |
| `unicorn/no-accessor-recursion`                | アクセサの再帰を禁止                         | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-accessor-recursion.md)                |
| `unicorn/no-array-reverse`                     | `Array#reverse()` の使用を禁止               | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-array-reverse.md)                     |
| `unicorn/no-array-sort`                        | `Array#sort()` の使用を禁止                  | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-array-sort.md)                        |
| `unicorn/no-instanceof-builtins`               | ビルトイン型での `instanceof` を禁止         | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-instanceof-builtins.md)               |
| `unicorn/no-named-default`                     | 名前付きデフォルトエクスポートを禁止         | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-named-default.md)                     |
| `unicorn/no-unnecessary-array-flat-depth`      | 不要な `Array#flat()` の深さ指定を禁止       | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-unnecessary-array-flat-depth.md)      |
| `unicorn/no-unnecessary-array-splice-count`    | 不要な `Array#splice()` のカウント引数を禁止 | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-unnecessary-array-splice-count.md)    |
| `unicorn/no-unnecessary-slice-end`             | 不要な `slice()` の終了インデックスを禁止    | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-unnecessary-slice-end.md)             |
| `unicorn/no-useless-error-capture-stack-trace` | 無意味な `Error.captureStackTrace()` を禁止  | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/no-useless-error-capture-stack-trace.md) |
| `unicorn/prefer-bigint-literals`               | BigInt リテラルの使用を推奨                  | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/prefer-bigint-literals.md)               |
| `unicorn/prefer-class-fields`                  | クラスフィールドの使用を推奨                 | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/prefer-class-fields.md)                  |
| `unicorn/prefer-classlist-toggle`              | `classList.toggle()` の使用を推奨            | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/prefer-classlist-toggle.md)              |
| `unicorn/prefer-import-meta-properties`        | `import.meta` プロパティの使用を推奨         | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/prefer-import-meta-properties.md)        |
| `unicorn/prefer-single-call`                   | 単一呼び出しを推奨                           | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/prefer-single-call.md)                   |
| `unicorn/require-module-attributes`            | モジュール属性を要求                         | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/require-module-attributes.md)            |
| `unicorn/require-module-specifiers`            | モジュール指定子を要求                       | [docs](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.2/docs/rules/require-module-specifiers.md)            |

### 削除された非推奨ルール

以下のルールは非推奨となり、設定から削除されました:

- `unicorn/no-array-push-push` - 非推奨
- `unicorn/no-instanceof-array` - 非推奨
- `unicorn/no-length-as-slice-end` - 非推奨

---

## eslint-plugin-jest

**バージョン**: 29.0.1

### 新規追加ルール (Jest専用)

| ルール名                            | 説明                                 | ドキュメント                                                                                                         |
| ----------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `test/prefer-ending-with-an-expect` | テストが `expect` で終わることを推奨 | [docs](https://github.com/jest-community/eslint-plugin-jest/blob/v29.0.1/docs/rules/prefer-ending-with-an-expect.md) |

**注**: このルールはJestを使用する場合にのみ適用されます（`testLibrary: "jest"` の場合）。

---

## eslint-plugin-jsdoc

**バージョン**: 60.8.0

### 新規追加ルール

| ルール名                             | 説明                             | ドキュメント                                                                                              |
| ------------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `jsdoc/escape-inline-tags`           | インラインタグのエスケープを強制 | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/escape-inline-tags.md)           |
| `jsdoc/prefer-import-tag`            | `@import` タグの使用を推奨       | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/prefer-import-tag.md)            |
| `jsdoc/reject-any-type`              | `any` 型の使用を拒否             | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/reject-any-type.md)              |
| `jsdoc/reject-function-type`         | `Function` 型の使用を拒否        | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/reject-function-type.md)         |
| `jsdoc/require-next-description`     | 次の要素の説明を要求             | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-next-description.md)     |
| `jsdoc/require-next-type`            | 次の要素の型を要求               | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-next-type.md)            |
| `jsdoc/require-tags`                 | 特定のタグを要求                 | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-tags.md)                 |
| `jsdoc/require-template-description` | テンプレートの説明を要求         | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-template-description.md) |
| `jsdoc/require-throws-description`   | `@throws` の説明を要求           | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws-description.md)   |
| `jsdoc/require-throws-type`          | `@throws` の型を要求             | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws-type.md)          |
| `jsdoc/require-yields-description`   | `@yields` の説明を要求           | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-description.md)   |
| `jsdoc/require-yields-type`          | `@yields` の型を要求             | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-type.md)          |
| `jsdoc/type-formatting`              | 型のフォーマットを強制           | [docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/type-formatting.md)              |

---

## @eslint/markdown

**バージョン**: 7.3.0

**注**: `eslint-plugin-markdown` (5.1.0) から `@eslint/markdown` (7.3.0) に移行しました。

### 新規追加ルール

| ルール名                                | 説明                                   | ドキュメント                                                                                    |
| --------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `markdown/fenced-code-language`         | フェンスコードブロックに言語指定を要求 | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/fenced-code-language.md)         |
| `markdown/heading-increment`            | 見出しレベルの段階的な増加を強制       | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/heading-increment.md)            |
| `markdown/no-bare-urls`                 | 生のURLを禁止                          | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-bare-urls.md)                 |
| `markdown/no-duplicate-definitions`     | 重複した定義を禁止                     | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-definitions.md)     |
| `markdown/no-duplicate-headings`        | 重複した見出しを禁止                   | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-headings.md)        |
| `markdown/no-empty-definitions`         | 空の定義を禁止                         | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-definitions.md)         |
| `markdown/no-empty-images`              | 空の画像を禁止                         | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-images.md)              |
| `markdown/no-empty-links`               | 空のリンクを禁止                       | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-links.md)               |
| `markdown/no-html`                      | HTML の使用を禁止                      | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-html.md)                      |
| `markdown/no-invalid-label-refs`        | 無効なラベル参照を禁止                 | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-invalid-label-refs.md)        |
| `markdown/no-missing-atx-heading-space` | ATX見出しのスペース欠落を禁止          | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-atx-heading-space.md) |
| `markdown/no-missing-label-refs`        | 欠落したラベル参照を禁止               | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-label-refs.md)        |
| `markdown/no-missing-link-fragments`    | 欠落したリンクフラグメントを禁止       | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-missing-link-fragments.md)    |
| `markdown/no-multiple-h1`               | 複数のH1見出しを禁止                   | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-multiple-h1.md)               |
| `markdown/no-reference-like-urls`       | 参照形式に見えるURLを禁止              | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-reference-like-urls.md)       |
| `markdown/no-reversed-media-syntax`     | 逆順のメディア構文を禁止               | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-reversed-media-syntax.md)     |
| `markdown/no-space-in-emphasis`         | 強調内のスペースを禁止                 | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-space-in-emphasis.md)         |
| `markdown/no-unused-definitions`        | 未使用の定義を禁止                     | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md)        |
| `markdown/require-alt-text`             | 画像に代替テキストを要求               | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/require-alt-text.md)             |
| `markdown/table-column-count`           | テーブルの列数の一貫性を強制           | [docs](https://github.com/eslint/markdown/blob/main/docs/rules/table-column-count.md)           |

---

## eslint-plugin-n

**バージョン**: 17.23.1

### 新規追加ルール

| ルール名                  | 説明                    | ドキュメント                                                                                           |
| ------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `node/no-top-level-await` | トップレベルawaitを禁止 | [docs](https://github.com/eslint-community/eslint-plugin-n/blob/HEAD/docs/rules/no-top-level-await.md) |

---

## eslint-plugin-react-hooks

**バージョン**: 6.1.1

### 新規追加ルール

これらのルールはReact 19のReact Compilerに関連する実験的なルールです。

| ルール名                                    | 説明                             | 備考   |
| ------------------------------------------- | -------------------------------- | ------ |
| `react-hooks/hooks`                         | Hooksの基本ルール                | 実験的 |
| `react-hooks/capitalized-calls`             | フック呼び出しの大文字化         | 実験的 |
| `react-hooks/static-components`             | 静的コンポーネントのチェック     | 実験的 |
| `react-hooks/use-memo`                      | useMemoの使用                    | 実験的 |
| `react-hooks/component-hook-factories`      | コンポーネントフックファクトリ   | 実験的 |
| `react-hooks/preserve-manual-memoization`   | 手動メモ化の保持                 | 実験的 |
| `react-hooks/incompatible-library`          | 非互換ライブラリの検出           | 実験的 |
| `react-hooks/immutability`                  | イミュータビリティのチェック     | 実験的 |
| `react-hooks/globals`                       | グローバル変数の使用             | 実験的 |
| `react-hooks/refs`                          | Refsの使用                       | 実験的 |
| `react-hooks/memoized-effect-dependencies`  | メモ化されたエフェクトの依存関係 | 実験的 |
| `react-hooks/set-state-in-effect`           | エフェクト内でのsetState         | 実験的 |
| `react-hooks/no-deriving-state-in-effects`  | エフェクト内での状態派生の禁止   | 実験的 |
| `react-hooks/error-boundaries`              | エラーバウンダリ                 | 実験的 |
| `react-hooks/purity`                        | 純粋性のチェック                 | 実験的 |
| `react-hooks/set-state-in-render`           | レンダー内でのsetState           | 実験的 |
| `react-hooks/invariant`                     | 不変条件のチェック               | 実験的 |
| `react-hooks/todo`                          | TODOマーカー                     | 実験的 |
| `react-hooks/syntax`                        | 構文チェック                     | 実験的 |
| `react-hooks/unsupported-syntax`            | 未サポート構文の検出             | 実験的 |
| `react-hooks/config`                        | 設定                             | 実験的 |
| `react-hooks/gating`                        | ゲーティング                     | 実験的 |
| `react-hooks/rule-suppression`              | ルール抑制                       | 実験的 |
| `react-hooks/automatic-effect-dependencies` | 自動エフェクト依存関係           | 実験的 |
| `react-hooks/fire`                          | Fire                             | 実験的 |
| `react-hooks/fbt`                           | FBT                              | 実験的 |

**注**: これらはReact Compilerに関連する実験的なルールであり、安定版のドキュメントはまだ提供されていません。

---

## eslint-plugin-import-x

**バージョン**: 4.16.1

### 新規追加ルール

| ルール名                         | 説明                           | ドキュメント                                                                                               |
| -------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `import/prefer-namespace-import` | 名前空間インポートの使用を推奨 | [docs](https://github.com/un-ts/eslint-plugin-import-x/blob/v4.16.1/docs/rules/prefer-namespace-import.md) |

---

## 今後の対応について

これらのルールは現在すべて `"off"` に設定されています。将来的に有効化を検討する場合は、以下の手順を推奨します:

1. **ルールの理解**: 各ルールのドキュメントを確認し、目的と影響範囲を理解する
2. **段階的な有効化**: プロジェクトへの影響が小さいルールから段階的に有効化
3. **チームでの議論**: 有効化の是非をチームで議論し、合意を得る
4. **テスト**: 有効化後、既存コードへの影響を確認

## 変更履歴

- **v7.2.0** (2025-10-04)
  - 依存関係を最新バージョンに更新
  - 新規ルールを追加（すべて "off" で設定）
  - 非推奨ルールを削除
  - パッケージの移行:
    - `eslint-plugin-markdown` → `@eslint/markdown`
    - `eslint-flat-config-viewer` → `@eslint/config-inspector`
    - `eslint-define-config` を削除
