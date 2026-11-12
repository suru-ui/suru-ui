# Suru UI

[Document](https://suru-ui.github.io/suru-ui/)

## セットアップ

[mise](https://mise.jdx.dev/) をインストールし、リポジトリーのルートで次を実行します。

```sh
mise install
pnpm install
```

`mise` は Node.js と pnpm のバージョンを固定します。Node.js 22.18 以降または 24.11 以降が必要です（Node.js 24 を推奨）。

## 開発

| コマンド                                  | 内容                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| `mise run test:check`                     | ルートのフォーマット・lint・型チェック・workspace 定義の検証 |
| `mise test`                               | 全パッケージのテスト                                         |
| `mise check`                              | フォーマット・lint の自動修正と workspace の並べ替え         |
| `pnpm --filter './packages/**' run build` | 公開パッケージのビルド                                       |
| `mise update`                             | 依存関係・ツール・スキルの更新                               |

カバレッジを取得する場合は、対象パッケージで `mise run test:coverage` を実行します。

## パッケージの追加

`scripts/templates/` に保持したテンプレートからパッケージを追加できます。

```sh
mise create
```

引数については `mise create --help` を確認してください。

## リリース

GitHub Actions の「リリース」ワークフローを手動で実行します。初回公開のみ npm の trusted publishing の設定が必要です。
