---
name: git
description: Instructions and guidelines for Git commands, version control, commit message formatting, branching strategies, and pull requests.
---

# 変更の破棄禁止ルール

既存の作業ツリーやインデックスにある未コミットの変更は、ユーザーの貴重な作業内容です。作業完了までに変更を消去・破棄することは **厳格に禁止** されます。

## 1. 禁止コマンド一覧

以下のコマンドおよび同等の操作を行うフラグやオプションの実行を禁止します。

- **作業ツリー・インデックスの変更破棄**
  - `git reset --hard` / `git reset --merge` / `git reset --keep`（変更やインデックスを強制リセットして消去する）
  - `git checkout .` / `git checkout -- <file>`（作業ツリー上の編集内容を取り消す）
  - `git checkout -f` / `git switch -f`（未コミット変更を無視・上書きしてブランチを切り替える）
  - `git restore .` / `git restore <file>`（作業ツリーやステージ上の変更を破棄して元に戻す）
  - `git clean`（追跡されていない新規ファイルや無視ファイルを物理削除する）

- **ファイル・退避データ（Stash）の消去**
  - `git stash`（退避失敗や誤操作によるデータ紛失のリスクがある）
  - `git rm -f`（追跡ファイルを作業ツリーごと物理削除する）
  - `git worktree remove --force`（未コミット変更が残る作業領域を丸ごと削除する）


- **コンフリクト（競合）調整中の破棄**
  - `git checkout --ours` / `git checkout --theirs`（競合時に片方の変更を完全に上書きして捨てる）
  - `git merge --abort` / `git rebase --abort`（マージ・リベース作業を中断し調整中の内容を破棄する）
  - `git rebase --skip`（適用中の変更内容をスキップして捨てる）

- **ブランチ・リモート履歴の強制削除**
  - `git branch -D`（未マージの作業中・退避用ブランチを強制削除する）
  - `git push --force` / `git push -f`（リモートの履歴を強制書き換えして作業ログを消去する）

## 2. 破壊的変更の検出と回避

命令やスクリプトを実行する前に、現在の作業ツリーの状態を確認してください。

1. 状態確認: タスクを開始する前に必ず `git status` を実行し、未コミットの変更（Modified / Untracked）の有無をチェックする。
2. 競合のチェック: 変更予定のファイルがすでに編集されている場合は、既存のコードを消去せずに変更箇所を統合するか、ユーザーに編集の可否を確認する。
3. 新規ファイルの扱い: 未追跡ファイル（Untracked files）が存在する場合でも、削除・クリーンアップを行わないこと。

## 3. 安全な代替手順

変更を保持したまま作業を安全に進めるために、状況に応じて以下の手順を選択してください。

- **作業途中の変更を一時的に確定したい場合**:
  一時的なコミットを作成して退避します。
  ```bash
  git add .
  git commit -m "wip: save uncommitted changes before task"
  ```

- **新規ブランチで作業したい場合**:
  既存の変更を保持したまま新しいブランチへ切り替えます。
  ```bash
  git checkout -b feature/your-task-name
  ```
