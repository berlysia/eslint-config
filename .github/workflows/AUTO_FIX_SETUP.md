# Auto-Fix CI Failures Setup

このドキュメントでは、RenovateやDependabotのPRがCI失敗時に自動修正する仕組みの設定方法を説明します。

## 概要

`.github/workflows/auto-fix-ci.yml` ワークフローは、以下の処理を自動的に実行します：

1. **CI失敗の検知**: `Node CI`ワークフローが失敗したことを検知
2. **ボット判定**: PRの作成者がRenovateまたはDependabotであることを確認
3. **自動修正**: Claude Code GitHub Appを使ってエラーを分析・修正
4. **検証**: 修正後に再度CIを実行して確認
5. **コミット**: 変更をコミット・プッシュ
6. **通知**: PRに修正結果をコメント

## セットアップ手順

### 1. Claude Code GitHub Appのインストール

Claude Code GitHub Appをリポジトリにインストールする必要があります：

**方法A: Claude Code CLIから自動インストール（推奨）**

```bash
claude
/install-github-app
```

**方法B: 手動インストール**

1. [Claude GitHub App](https://github.com/apps/claude) にアクセス
2. "Install" または "Configure" をクリック
3. インストール先のリポジトリを選択
4. 必要な権限を確認して承認

**注意**: リポジトリの管理者権限が必要です

### 2. Anthropic APIキーの設定

このワークフローを動作させるには、Anthropic APIキーが必要です。

1. [Anthropic Console](https://console.anthropic.com/)にアクセス
2. APIキーを作成
3. GitHubリポジトリの設定に移動:
   - Settings > Secrets and variables > Actions
   - "New repository secret"をクリック
   - Name: `ANTHROPIC_API_KEY`
   - Secret: 作成したAPIキーを貼り付け
   - "Add secret"をクリック

### 3. ワークフロー権限の確認

リポジトリの設定で、GitHub Actionsに適切な権限が付与されていることを確認してください：

1. Settings > Actions > General
2. "Workflow permissions"セクションで以下を確認:
   - "Read and write permissions"が選択されている
   - "Allow GitHub Actions to create and approve pull requests"にチェックが入っている

### 4. テスト

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

1. **PR情報取得**: 失敗したCIに関連するPR情報を取得
2. **ブランチチェックアウト**: PRのブランチをチェックアウト
3. **Claude Code実行**: `anthropics/claude-code-action@v1`を使用して自動修正
   - 依存関係のインストール
   - CIの実行とエラー分析
   - 自動修正の適用
   - 修正の検証
   - 変更のコミット
4. **通知**: PRにコメントで結果を通知

## Claude Code GitHub Appの特徴

Claude Code GitHub Appを使用する利点：

- **シンプルな設定**: CLIのインストールが不要
- **統合された環境**: GitHub Actions内でシームレスに動作
- **自動コミット**: Claude Codeが直接変更をコミット・プッシュ
- **詳細なログ**: 修正プロセスの詳細なログが確認可能

## トラブルシューティング

### ワークフローが実行されない

- Claude Code GitHub Appが正しくインストールされているか確認
- `ANTHROPIC_API_KEY`が正しく設定されているか確認
- ワークフロー権限が適切に設定されているか確認
- PRの作成者がRenovateまたはDependabotであるか確認

### 修正に失敗する

- エラーメッセージを確認し、手動での修正が必要な場合もあります
- APIキーのクォータが残っているか確認
- Claude Code GitHub Appの権限が適切に設定されているか確認

### コミットがプッシュされない

- GitHub Actionsの権限設定を確認
- Claude Code GitHub Appの権限を確認
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

### Claude Codeへのプロンプトカスタマイズ

プロジェクトに合わせてClaude Codeへの指示をカスタマイズできます：

```yaml
- name: Run Claude Code auto-fix
  uses: anthropics/claude-code-action@v1
  with:
    prompt: |
      カスタマイズされた指示をここに記述

      1. プロジェクト固有のコマンド実行
      2. 特定のチェックの実施
      3. 修正後の検証
```

## 手動でのClaude Code実行

自動化に加えて、PRに直接コメントしてClaude Codeを実行することもできます：

```
@claude このPRのCI失敗を修正してください
```

これにより、Claude Codeがインタラクティブモードで起動し、修正を試みます。

## セキュリティに関する注意

- APIキーは必ずGitHub Secretsとして保存してください
- ワークフローは信頼できるボット（Renovate、Dependabot）からのPRのみを対象としてください
- 自動コミットの内容は必ずレビューしてください
- Claude Code GitHub Appに付与する権限を確認してください

## 参考リンク

- [Claude Code GitHub App](https://github.com/apps/claude)
- [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)
- [Claude Code Documentation](https://code.claude.com/docs)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Anthropic API Documentation](https://docs.anthropic.com/)
