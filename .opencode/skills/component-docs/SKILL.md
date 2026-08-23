---
name: component-docs
description: Suru UI のコンポーネントドキュメント (`website/` の MDX と examples) を作成・更新するときに使用します。
---

# コンポーネントドキュメントの作成

## 目的

Suru UI の Web サイト（`website/`）に、コンポーネントのドキュメントを既存の形式どおりに追加します。
このスキルの目的は、書き手が変わっても同じ構成のドキュメントができることです。
既存ドキュメントを参考にするだけでなく、ここで定めた規則を最優先で守ります。

## 併用する規範

作業前に次のスキルを読んでください。

- `../japanese/SKILL.md` — 日本語文章の規範。MDX の説明文と `description` はこれに従います。

## 全体像

コンポーネントのドキュメントは、次の 3 つの成果物で構成されます。

| 成果物                      | 場所                                                     | 役割                                  |
| --------------------------- | -------------------------------------------------------- | ------------------------------------- |
| 実装（情報源）              | `packages/react/src/<カテゴリー>/<名前>/`                | 型と JSDoc の一次情報                 |
| Storybook stories（情報源） | `packages/react/stories/<カテゴリー>/<名前>.stories.tsx` | 例の内容と見出しの一次情報            |
| MDX ドキュメント（成果物）  | `website/content/docs/react/<カテゴリー>/<名前>.mdx`     | 利用者向けドキュメント本体            |
| 埋め込みデモ（成果物）      | `website/examples/<カテゴリー>/<名前>/*.tsx`             | MDX に `<Component />` で埋め込むデモ |

MDX 内の `<Component path="react/button/basic" />` は、`website/examples/react/button/basic.tsx` に解決されます。
`path` 属性は `examples/` から拡張子 `.tsx` を除いた相対パスです。
`path` と実際のファイル名が 1 文字でも違うとデモが表示されないため、両者を必ず一致させます。

基準実装は Button の一式です。

- `website/content/docs/react/buttons/button.mdx`
- `website/examples/react/button/`

## ファイルの配置と命名

### MDX

```
website/content/docs/react/<カテゴリー複数形>/<名前>.mdx
```

カテゴリーのディレクトリー名は、実装側（例: `src/buttons/button/`）に合わせて複数形にします（`buttons/button.mdx`）。

### 例ファイル

```
website/examples/<カテゴリー単数形>/<名前>/<デモ名>.tsx
```

カテゴリーのディレクトリー名は、stories の import 元（例: `src/buttons/button/index.js`）に合わせます。Button の例は `examples/react/button/` です。

- デモ名は kebab-case にします。1 つの見出しに複数のデモが属するときは、ドット区切りで階層を表現します（`with-icons.horizontal.tsx`、`sizes.default.tsx`）。
- 既存の stories の story 名（`name` プロパティー）と MDX の見出しを対応させ、story ごとにデモを用意します。
- 既定の export 関数名は PascalCase のデモ名にします。`basic.tsx` の `export default function Basic()` などです。
- 複数のデモで共通するロジック（進捗のシミュレーションなど）は、親ディレクトリーに `_` から始まるファイルとして切り出し、import して再利用します（`examples/react/_use-progress.ts`）。
- 共通するスタイルの読み込みは `import "../../_fixture";` を先頭に置きます。
- コンポーネントはサブパスエクスポートから import します（`import { Button } from "@suru-ui/react/button";`）。パーツ単位で使うときは namespace として import します（`import * as ButtonParts from "@suru-ui/react/button";`）。
- アイコンは `lucide-react` から import します。
- デモは自己完結させます。Storybook の `controls` や props の注入に頼らず、表示に必要な値をすべてデモ内に書きます。

## MDX の章構成

MDX は次の順で章を置きます。

```
---
title: <コンポーネント名>
description: <コンポーネントの説明>
---

## 使い方

<import 文と最小コード例のコードブロック + basic デモ>

## 例

<stories の story ごとの見出しと <Component />>

## 構成

<パーツツリーのコードブロック>

## API リファレンス

<パーツごとの ### 見出しと TypeTable>
```

各章の規則を示します。

### フロントマター

- `title` にはコンポーネントの公開名（PascalCase）を書きます。
- `description` には、コンポーネントの JSDoc の 1 文目（実装の `/** ... */` の説明）を使います。Button の場合は「複数の主な外観と状態を持つクリック可能なボタンコンポーネントです。」です。

### 「使い方」

- import の対象として、ルートからの import（`import { Button } from "@suru-ui/react";`）とサブパスからの import（`import { Button } from "@suru-ui/react/button";`）を「または、」で併記します。
- 最小の使用例を tsx コードブロックで示し、直後に `<Component path="<カテゴリー>/<名前>/basic" />` を置きます。

### 「例」

- stories の各 story を見出しに写します。story の `name` プロパティー（日本語）を見出しのテキストにそのまま使います。
- stories にある story はすべてカバーします。省略は許されません。
- 見出しの粒度・順序・文言は stories と一致させます。見出しの順序は stories での宣言順にそのまま従います。
- ドキュメント独自の項目（補足説明や注意書きなど）を追加するときは、新しい見出しを stories の順序の間に挟まず、対応する story の見出しの下に本文として差し込みます。stories に該当する story がない独自見出しを置くときは、内容上最も近い story の直後に置きます。
- story が内部で小見出し（「水平」「垂直」など）に分かれている場合は、`####` の小見出しに分割し、それぞれに個別のデモを対応させます（`with-icons.horizontal` と `with-icons.vertical`）。
- 各見出しの直後に `<Component path="..." />` を 1 つ置きます。
- デモのレイアウト (横並び・縦並び・ラベルの有無など) は、stories 側の render のレイアウトに合わせます。render をデモ向けに書き換えるのは props のリテラル化だけで、視覚的な構成は変えません。
- stories 側の render で配列の `map` により一覧表示しているもの（主な外観、色、角丸など）も、1 つのデモとしてそのまま写します。

### 「構成」

- 公開されている全パーツのツリーを tsx コードブロックで示します。
- 構成の表示にのみ徹します。パーツツリー以外の使用例 (children の具体的なラベルや属性など) は書きません。使用例は「使い方」と「例」に任せます。
- パーツツリーは `*.parts.tsx` のセクション順、つまり公開本体（`<名前>.tsx`）の描画順に従います。
- import は `import * as Xxx from "@suru-ui/react/<名前>";` の形式で示します。
- 子を持たないパーツは自己閉じタグ（`<Button.Content />`）で書きます。
- 既存ドキュメントに誤字（閉じタグの欠落など）があっても写さず、正しい JSX を書きます。

### 「API リファレンス」

- パーツごとに `### <パーツ名>` の見出しを置き、その下に `<TypeTable>` を置きます。
- 情報源の優先順位は次のとおりです。
  1. `*.parts.tsx` と `<名前>.tsx` の Props 型のプロパティーと JSDoc
  2. `@base-ui/react` 由来で委譲しているプロパティーは列挙せず、Base UI のドキュメントへのリンクで代替する（Button Root の例: `[Base UI が受け入れるプロパティー](https://base-ui.com/react/components/button#api-reference)`）
- Suru UI 独自プロパティーのみを TypeTable に列挙します。並び順は Props 型での宣言順に従います。
- 各行は `type`、`default`、`description` の 3 キーを持ちます。
  - `type`: Props 型の型注釈を union 展開した文字列にします。
  - `default`: JSDoc の `@default` がある場合のみ書きます。`size` から導出される動的な既定値（`radius` の既定値 = `size`）はその旨を書きます。
  - `description`: JSDoc の説明文を写します。
- `RenderProps` を受け付けるパーツ（Content、Track、Fill など）は、`className`、`render`、`style` の定型 3 行を書きます。この定型は既存ドキュメントからそのままコピーして使い、パーツ名ごとに説明を変えません。

```mdx
### Content

<TypeTable
  type={{
    className: {
      type: "string | function",
      description:
        "要素に適用される CSS クラス、またはコンポーネントの状態に基づいてそれを返す関数です。",
    },
    render: {
      type: "React.ReactElement | function",
      description:
        "React 要素、またはそれを返す関数です。コンポーネントの HTML 要素を別のタグに置き換えたり、別のコンポーネントと組み合わせたりすることができます。",
    },
    style: {
      type: "React.CSSProperties | function",
      description:
        "要素に適用されるスタイルオブジェクト、またはコンポーネントの状態に基づいてそれを返す関数です。",
    },
  }}
/>
```

## 実装手順

手順は、書き手が一度に 1 つの作業に集中できるよう、短い Step に分けています。
各 Step の完了条件を満たしてから次の Step へ進みます。

### Step 1 情報収集

1. 対象コンポーネントの実装（`<名前>.tsx` と `<名前>.parts.tsx`）を読み、公開パーツの一覧、Props 型、JSDoc、`@default` を抜き出します。
2. stories（`packages/react/stories/<カテゴリー>/<名前>.stories.tsx`）を読み、story 名と render の内容を一覧化します。
3. 既存のドキュメント（Button）を構成の雛形として読みます。

完了条件: story 名 → デモ名 → 見出しの対応表ができている。

### Step 2 例ファイル

`website/examples/<カテゴリー>/<名前>/` に、対応表どおりのデモを 1 ファイルずつ作ります。

1. 各ファイルは `import "../../_fixture";` から始めます。
2. stories の render をデモ向けに書き換えます。controls の既定値（`ctrl({ ... })` の引数）は、デモ内のリテラルに置き換えます。
3. story 内で複数の小見出しに分かれるものは、デモもファイルを分けます。
4. 共通ロジックは `_<名前>.ts(x)` に切り出します。

完了条件: 対応表の全デモのファイルが存在し、`path` とファイル名が一致している。

### Step 3 MDX

`website/content/docs/react/<カテゴリー複数形>/<名前>.mdx` を書きます。

1. フロントマター、「使い方」、「例」、「構成」の順に書きます。
2. 「例」は Step 1 の対応表に従い、stories と見出しを揃えます。
3. 「API リファレンス」を Props 型から書き起こします。

完了条件: 全章が揃い、`<Component path>` がすべて実在するファイルを指している。

### Step 4 検証

1. `mise run test:typecheck` で website の TS エラーがないことを確認します（例ファイルは型チェックの対象です）。
2. `mise run test:format` と `mise run test:lint` を通します。
3. 可能なら `npm run build` で website のビルドを確認します。

完了条件: 上記すべてがエラーなく終了する。

## 禁則リスト

- `<Component path>` と例ファイル名を不一致にしない。
- stories にある story をドキュメントから省略しない。
- 見出しの順序を stories の宣言順から変えない。独自の見出しや説明を差し込むときも、stories の順序を崩さない。
- デモのレイアウトを stories 側の render と違うものにしない。
- 見出しの文言を stories の `name` から勝手に変えない。
- 「構成」のコードブロックに、パーツツリー以外の使用例 (children の具体的な値など) を書かない。
- Base UI から委譲しているだけのプロパティーを TypeTable に列挙しない。
- JSDoc に書かれていない既定値を推測して `default` に書かない。
- 「構成」のコードブロックに、実装に存在しないパーツや誤った閉じタグを書かない。
- 例ファイルに `_fixture` の import を忘れない。
- 例の説明文で `../japanese/SKILL.md` に反する文章を書かない。
- 既存ドキュメントの誤字や崩れた JSX を新しいドキュメントに写さない。
