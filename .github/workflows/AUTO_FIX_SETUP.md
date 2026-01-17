# Auto-Fix CI Failures Setup

このドキュメントでは、RenovateやDependabotのPRがCI失敗時に自動修正する仕組みの設定方法を説明します。

## 概要

`.github/workflows/auto-fix-ci.yml` ワークフローは、以下の処理を自動的に実行します：

1. CI（`Node CI`）が失敗したことを検知
2. 失敗したPRがRenovateまたはDependabotによるものかを確認
3. Claude Code CLIを使用してエラーを自動修正
4. 修正をコミット・プッシュ
5. PRにコメントを追加

## セットアップ手順

### 1. Anthropic APIキーの設定

このワークフローを動作させるには、Anthropic APIキーが必要です。

1. [Anthropic Console](https://console.anthropic.com/)にアクセス
2. APIキーを作成
3. GitHubリポジトリの設定に移動:
   - Settings > Secrets and variables > Actions
   - "New repository secret"をクリック
   - Name: `ANTHROPIC_API_KEY`
   - Secret: 作成したAPIキーを貼り付け
   - "Add secret"をクリック

### 2. ワークフロー権限の確認

リポジトリの設定で、GitHub Actionsに適切な権限が付与されていることを確認してください：

1. Settings > Actions > General
2. "Workflow permissions"セクションで以下を確認:
   - "Read and write permissions"が選択されている
   - "Allow GitHub Actions to create and approve pull requests"にチェックが入っている

### 3. テスト

設定が完了したら、以下の方法でテストできます：

1. Renovateが依存関係更新のPRを作成するのを待つ
2. またはテスト用のブランチを手動で作成し、意図的にCIを失敗させる
3. ワークフローが自動的に実行され、修正を試みることを確認

## ワークフローの動作

### トリガー条件

- `Node CI` ワークフローが完了したとき
- ワークフローの結果が失敗（`failure`）のとき
- イベントタイプがプルリクエスト（`pull_request`）のとき

### 実行条件

以下の条件を満たすPRのみが自動修正の対象となります：

- PRの作成者が `renovate[bot]` または `dependabot[bot]`
- または、ユーザー名に `renovate` または `dependabot` が含まれる

### 修正プロセス

1. **エラー収集**: CI実行結果を取得
2. **Claude Code実行**: 取得したエラー情報を基にClaude Code CLIで修正を試行
3. **検証**: 修正後、再度CIを実行して確認
4. **コミット**: 変更があればコミット・プッシュ
5. **通知**: PRにコメントで結果を通知

## トラブルシューティング

### ワークフローが実行されない

- `ANTHROPIC_API_KEY`が正しく設定されているか確認
- ワークフロー権限が適切に設定されているか確認
- PRの作成者がRenovateまたはDependabotであるか確認

### 修正に失敗する

- Claude Code CLIのバージョンが最新であるか確認
- エラーメッセージを確認し、手動での修正が必要な場合もあります
- APIキーのクォータが残っているか確認

### コミットがプッシュされない

- GitHub Actionsの権限設定を確認
- ブランチ保護ルールがbotによるプッシュを許可しているか確認

## カスタマイズ

### 対象ワークフローの変更

別のワークフローを監視したい場合は、`workflow_run`の`workflows`配列を編集してください：

```yaml
on:
  workflow_run:
    workflows: ["別のワークフロー名"]
    types:
      - completed
```

### 対象ボットの追加

他のボットを対象に含めたい場合は、`pr-info`ステップの`isBot`判定を編集してください：

```javascript
const isBot = author === 'renovate[bot]' ||
             author === 'dependabot[bot]' ||
             author === 'your-bot[bot]' ||
             author.includes('renovate') ||
             author.includes('dependabot');
```

### 修正コマンドの変更

プロジェクトに合わせて修正コマンドをカスタマイズできます：

```bash
# 例: 特定のfixコマンドを実行
pnpm run fix

# 例: 型チェックのみ
pnpm run lint:type
```

## セキュリティに関する注意

- APIキーは必ずGitHub Secretsとして保存してください
- ワークフローは信頼できるボット（Renovate、Dependabot）からのPRのみを対象としてください
- 自動コミットの内容は必ずレビューしてください

## 参考リンク

- [Claude Code CLI Documentation](https://github.com/anthropics/claude-code)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Anthropic API Documentation](https://docs.anthropic.com/)
