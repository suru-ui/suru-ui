# Suru UI モノレポの指針

Suru UI は [Base UI](https://github.com/mui/base-ui) というヘッドレスコンポーネントを基盤としたスタイル付きのコンポーネントライブラリーです。

## プロジェクトの構成

- 全パッケージが共有して使うパッケージは `packages/core` にあります。
- テーマを提供するパッケージは `packages/theme` にあります。
- React コンポーネントを提供するパッケージは `packages/react` にあります。
- モノレポルートの設定ファイル (oxfmt, mise) は `.config/` にあります。
- 各パッケージのほとんどの設定ファイル (tsconfig, vitest, oxlint, oxfmt, mise) は、パッケージディレクトリーから見て `.config/` にあります。

## コマンド

```sh
# 完全なテスト (順番: server vitest → client vitest → format → lint → typecheck)
mise run test

# 個々のステップ
mise run test:server      # npx vitest --config ./.config/vitest.server.ts
mise run test:client      # npx vitest --config ./.config/vitest.client.ts
mise run test:format      # npx oxfmt --check
mise run test:lint        # npx oxlint
mise run test:typecheck   # npx tsc --noEmit

# フォーマット
mise run format

# ビルド
npm run build

# 依存関係の更新 (npm-check-upates → pnpm install → playwright install)
mise run update
```

## リンティング、型チェック、フォーマット

- 型エラーがない場合は、ランダムにキャストしないでください（たとえば、`as any`)。 型を検証するには `mise run test:typecheck` を実行します。
- 変更内容がリンティングに合格していることを確認します。検証するには `mise run lint` を実行します。

## テスト

- テストフレームワークに Vitest を使用します。
- テストファイルのパターンは、`*.test.ts` (ブラウザー/サーバー共通)、`*.client.test.ts` (ブラウザー専用)、`*.server.test.ts` (サーバー専用) のいずれか 1 つです。
- クライアントテストは、Vitest の Browser Mode を利用して実際の Playwright ブラウザー上で実行します。
- CI がデバッグモードであれば コンパイル時定数 `__DEBUG__` は true になります。手動でデバッグモードにするには環境変数 `DEBUG` を `1` に設定します。
- コンパイル時定数 `__CLIENT__` と `__SERVER__` はそれぞれ真偽値でテストのランタイムを示します。

## ビルドおよび型チェックに関する注意点

- すべての tsconfig で `erasableSyntaxOnly: true` を有効化 (`enum` や 型定義以外の宣言を含む `namespace` の使用、パラメータープロパティーなどの、実行時にコードが生成される構文は使用不可) されています。

## State 型の定義流儀（packages/react）

パーツの State 型は次の流儀で定義します。同一コンポーネント内で両系統を混在させないでください。

- Base UI の薄いラッパー (Base UI コンポーネントをそのままレンダリングするパーツ) は、`BaseXxx.Root.State` などの Base UI 側の State 型を再利用します。
- 自前実装 (useRender を使用するパーツ) は状態を自前で明示定義します。状態を持たない場合は空オブジェクト型 (`{}`) とし、その意図を JSDoc に明記します。

## エラー

これらの指針は、公開パッケージによってスローされるエラーにのみ適用されます。

すべてのエラーメッセージは次のものでなければなりません:

1. **何が起こったのかを話す** - 問題を明確に説明します。
2. **なぜそれが問題なのかを述べてください** - 結果を説明してください。
3. **解決方法を示す** - 実用的なガイダンスを提供します。
