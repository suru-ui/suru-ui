---
name: react-component
description: Suru UI の React コンポーネント (`packages/react/src/<名前>/` の .parts.tsx と .tsx) を書くときに使用します。ファイル配置・型・API・namespace を定めます。
---

# React コンポーネント

基準となる実装は次の 3 件です。

- `packages/react/src/accordion/`
- `packages/react/src/alert-dialog/`
- `packages/react/src/breadcrumb/` (項目の所有と描画を分ける場合の見本です)

CSS は `../css/SKILL.md`、JSDoc と日本語は `../jsdoc/SKILL.md` と `../japanese/SKILL.md` に従います。

## ファイル配置

```
packages/react/src/<kebab>/
  _<kebab>.tsx           # 内部ヘルパー (必要な場合のみ)
  <kebab>.parts.tsx      # Base UI ラッパーの各パーツ
  <kebab>.tsx            # 合成コンポーネント + API フック
  <kebab>.css            # css スキルに従う
  index.ts               # 再輸出のみ
```

`_` 始まりは非公開で、パーツ横断で使う補助だけを置きます。
`index.ts` は parts → 合成の順の再輸出だけにします。

```ts
export * from "./<kebab>.parts.jsx";
export * from "./<kebab>.jsx";
```

自ファイルの import には `.js` / `.jsx` 拡張子を付けます。
他コンポーネントのパーツを使うときは相対で import します。

## .parts.tsx

### import

順序はフォーマッターが自動整形するため規定しません。
`./<kebab>.css` を import します。

### セクション

パーツツリー順に置きます。見出しは `// <名>` の次の行に同文字数の `-` を置きます。

### Context

子パーツへ値を伝える場合は、先頭セクションに置きます。短名は値とフックをまとめた次の 1 行にし、別名の `type` や `const` 宣言を足しません。再輸出行に JSDoc は付けません。

```tsx
export { AutocompleteContext as Context, useAutocompleteContext as useContext };
```

namespace には値型があれば追加します。ファイル内部の参照 (JSX を含む) は正式名のままにします。

### 型の並び

1 つのパーツ内では Base UI 由来、独自の値型、`Value`・`State`、`Props` の順にします。`Props` を最後にします。
`State` は Base UI から取ります。状態を持たない素の要素では空オブジェクトにします。

独自の修飾値型は union リテラルで列挙し、各値を箇条書きで説明します。

```ts
/**
 * アコーディオンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AccordionRootVariant = "naked" | "liquid";
```

Root の独自 props はキー昇順にします。別の prop に連動する既定値は `@default` を付けず、参照先を示します (例: `既定値は {@link AccordionRootProps.size|size}`)。

Props は描画先で使い分けます。

| 描画先 | 形 |
| --- | --- |
| Base UI そのまま | `React.ComponentProps<typeof BaseUI.X>` |
| Base UI + 独自フラグ | 上記 `& { unstyled?: boolean \| undefined; }` |
| 素の要素 | `Omit<React.ComponentProps<"div">, keyof RenderProps> & RenderProps<State> & { ... }` |
| Base UI の `render` を `children` で受ける | `Omit<..., "children" \| "render"> & { children: NonNullable<...["render"]>; }` |

HTML 属性と衝突する名前は避け、別名にします (例: `title` と区別するための `htmlTitle`)。

### パーツ実装

型は `IComponent<Props>`、実装名は `Sui` 付き PascalCase にします。

```tsx
export const AccordionItem: IComponent<AccordionItemProps> = function SuiAccordionItem(props) {
```

汎型があるパーツは `IComponent` 継承の interface に callable を足します。

分割代入は独自 props (既定値付き) → `className` → 残余の順にします。他 prop を既定値にできます。
展開するプロパティーは文字数が短い順にし、同長のもの同士だけ辞書順にします。残余 (`...otherProps` など) は末尾に置きます。既定値が他の prop を参照するものは参照先の後に置きます。

```tsx
const { size = "md", radius = size, variant = "liquid", outlined = false, className, ...otherProps } = props;
```

Base UI は JSX で包み、素の要素は `useRender` にします。`render` 受領型は `render={children}` に渡します。独自なしの素要素は引数ごと渡し、独自ありは独自を分解して残りを渡します。既定子ありは `children` に既定値を与えます。

`useRender` に渡す props の命名は次の通りにします。そのまま渡す場合は `props` にします。分解する場合は残余を `other<DefaultTagName>Props` にします (例: `otherDivProps`)。ただし `defaultTagName` の HTML 属性を取り出しておらず残余がそのまま渡せる場合は `<defaultTagName>Props` にします (例: `divProps`)。

`cn` は利用者の `className` を先頭にし、基底クラス、値つき修飾、真偽修飾、状態関数の順にします。

```tsx
cn(
  className,
  "sui_accordion",
  `sui_accordion-size_${size}`,
  outlined && "sui_accordion-outlined",
  (state) => state.disabled && "sui_accordion-disabled",
)
```

`data-scope=""` は CSS の `@scope` 始点になる要素だけに付けます。

### 項目の一覧描画

項目の配列から子要素を組み立てるパーツ (例: `AccordionRoot`) は `items` とレンダラー関数を受けます。所有と描画のパーツが違う場合 (例: `BreadcrumbRoot` と `BreadcrumbList`) は、項目データを `Context` で渡し、`items` を二重に持たせません。描画側のパーツには `children` のみを足し、`items` は `Context` から読みます。

型は項目オブジェクト、レンダラー、`State`、`Props` の順にします。

```tsx
export type XxxItemObject = { ... };
export interface IXxxItemRenderer<TItem = any> {
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}
```

`Props` には次の 2 つを足します。素の要素の `children` は `ReactNode` のため、そのまま交差させると関数が代入できなくなります。要素側から `"children"` を除きます。

```tsx
export type XxxProps<TItem = any> = Omit<React.ComponentProps<"ol">, keyof RenderProps | "children"> &
  RenderProps<XxxState> & {
    /**
     * 内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link XxxProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IXxxItemRenderer<TItem>;

    /**
     * 項目です。
     *
     * `children` に関数を指定した場合、この配列の各項目が引数として渡されます。
     */
    items?: readonly TItem[] | undefined;
  };
```

描画では関数か否かで分けます。既定子に既定レンダラーを与えます。

```tsx
children: typeof children === "function" ? items.map(children) : children,
```

既定レンダラーはコンポーネントの直後に置きます。項目オブジェクト以外は `toReactNode` に逃がし、反復する要素には `key` を付けます。判定関数はそのファイル内にとどめ、公開しません。

namespace には `ItemObject` と `IItemRenderer` を足します。汎型は既定値付きで引き継ぎます。

### 短名と namespace

各パーツの直後に短名再輸出と namespace を置きます。namespace には `State` と `Props` を必ず入れ、値型があれば追加します。汎型は既定値付きで引き継ぎます。再輸出の JSDoc は `{@link X}` のみとし、「 です。」は付けません。短名再輸出 (`export { X as Y }`) はローカル束縛を作らないため、ファイル内部の参照 (JSX を含む) は正式名 `X` のままにします。

```tsx
export { AccordionItem as Item };
export namespace Item {
  /**
   * {@link AccordionItemState}
   */
  export type State = AccordionItemState;
  /**
   * {@link AccordionItemProps}
   */
  export type Props = AccordionItemProps;
}
```

## .tsx (合成)

### セクション

```
// Types
// -----
// API
// ---
// Component
// ---------
```

`//` の後の `-` は見出しと同文字数にします。

### Types

Root 由来の再命名は `{@link 元型}` のみの JSDoc にします。「 です。」は付けません。

`SlotProps` はキー昇順、`readonly` + `| undefined` にします。子要素は原則 `Omit` で除き、合成 `Props` に持ち上げたキーも除きます。

```ts
readonly content?: Omit<AlertDialogContentProps, "children" | keyof AlertDialogPropsContent> | undefined;
```

`State` は `RootState` の別名にします。

合成 `Props` は追加が `slotProps` だけなら Root との単純交差にします。要点が多い場合は分割し、重複キーは `Omit` で除きます。

```ts
export type AccordionProps<TItem = any, TValue = any> = AccordionRootProps<TItem, TValue> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: AccordionSlotProps | undefined;
};
```

子相当やコールバックはパーツ Props から参照し、二重定義しません (例: `XxxProps["children"]`、`XxxProps["onClick"]`)。レンダラーを受け取る側の `children` は `Pick` で取り込みます (例: `Pick<BreadcrumbListProps, "children">`)。

### API

getter 名は `get<Part>Props`、宣言順はパーツ名昇順にします。常に描画するパーツは Props を返し、条件付きで描画するパーツは `| null` を付けます。

フックは interface + 実装の 2 段にします。

```ts
interface IUseAccordionAPI {
  /**
   * {@link AccordionAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   * @param props {@link Accordion} の props です。
   * @returns アコーディオンの API です
   */
  <TItem = never, TValue = $InferItemValue<TItem>>(props: AccordionProps<TItem, TValue>): AccordionAPI<TItem>;
}
export const useAccordionAPI: IUseAccordionAPI = function useSuiAccordionAPI(props) { ... };
```

フック内では `slotProps` を各パーツ既定 `{}` 付きで分解します。分解の残余は行き先を 1 つにします。
`slotProps` の展開と返り値オブジェクトの getter は文字数が短い順にし、同長のもの同士だけ辞書順にします。`interface` (型) の getter 宣言順はパーツ名昇順のままにします。
任意表示の props は可否を判定し、駄目は `null` を返します。ノード系はノード化を通します。
項目を所有するパーツの getter は子要素を先に確定します。返り値は `Omit<PartProps, "children"> & { children: LikelyVisibleNode | null }` にします。

```ts
children: typeof children === "function" ? items.map(children) : toReactNode(children),
```
パーツ別 props は利用者指定 (`slotProps.<part>`) を後に spread します。
コールバック合成は `slotProps` 側を先に呼び、中止なら利用者側を呼びません。
末尾に短名を付けます (例: `export { type AlertDialogAPI as API, useAlertDialogAPI as useAPI };`)。

### Component

汎型 interface + 実装にします。条件付きで描画するパーツ (`| null` を返す getter) は先に `api.get*Props()` を変数化し、取得値の有無で条件描画します (`{xProps && <Part {...xProps} />}`)。常に描画するパーツは変数化せず、実行結果をそのまま渡します (`<Part {...api.getXProps()} />`)。
変数化の順序は長さ順ではなく React 要素の構築順 (JSX の描画順) にします。
項目の一覧は `{children ?? ((item, index) => (...))}` の形にし、フォールバック関数を所有パーツに渡して写像させます。引数の型が推論できない場合は明示型を付けます。

末尾に namespace を置き、`State`、`Props`、`SlotProps` と再命名型を列挙します。JSDoc は `{@link X}` 形式にします。「 です。」は付けません。

## _<kebab>.tsx

公開 `index.ts` から再輸出しません。`.parts.tsx` と `.tsx` からのみ import します。

## アイコン (`../_icons.tsx`)

既定アイコンはコンポーネント専用ファイルに置かず、共有ファイルに実装します。
型は `IComponent` の素関数にし、`svg` にフォーカス外しと装飾隠しを付けます。

```tsx
import { XIcon } from "../_icons.jsx";
```

## 見直し

実装が終わったら、検証の前にこのスキルを最初から読み直し、変更がすべての規則に従っているかを確認します。読み直しで見つけた違反は、フォーマッターやリンターに頼らず自分の手で直します。

## 検証

見直しが終わったら `packages/react/` で次の 3 つを実行し、自分の変更分に由来するエラーがあれば修正します。

```sh
mise run test:format
mise run test:lint
mise run test:typecheck
```

- `test:format` が失敗したら `mise run format` で直し、差分を確認します。
- `test:lint` は他コンポーネント由来の既存エラーがあっても、自分のファイルに由来するものは残しません。
- `test:typecheck` が失敗したら型を直します。型エラーがないのにキャストで逃げません。

## 禁則

- `enum`、パラメータープロパティーなど `erasableSyntaxOnly` に反する構文を書かない。
- `IComponent` 以外の関数型でコンポーネントを宣言しない。実装名の `Sui` 接頭辞を省略しない。
- `className` を `cn` の先頭以外に置かない。利用者の `className` を上書きしない。
- `useRender` 対象の素要素に JSX 直書きしない。Base UI 対象に `useRender` を使わない。
- `useRender` の残余に `otherProps` などの汎名を使わない。
- `SlotProps` のキーに子要素や持上げキーを残さない。`readonly` と `| undefined` を省略しない。キー順を崩さない。
- API の getter 名を `get*Props` 以外にしない。宣言順をパーツ順から変えない。条件付き getter から `| null` を省略しない。
- 可視判定なしにオプショナルな子要素を描画しない。
- 常に描画するパーツの props を変数化しない。実行結果をそのまま渡します。
- パーツ別指定より直 prop を優先しない。コールバック合成で中止判定を省略しない。
- `data-scope=""` を起点以外の要素に付けない。付け忘れない。
- namespace の `State` / `Props` を省略しない。短名再輸出を省略しない。
- `Context` や `useContext` の短名を別名の `type` / `const` 宣言で作らない。`export { X as Y }` の 1 行にまとめる。
- 再輸出の JSDoc に「 です。」を付けない。`{@link X}` のみにする。
- 短名をファイル内部で参照しない。内部参照 (JSX を含む) は正式名にする。
- `index.ts` に実装を書かない。再輸出以外を足さない。
- アイコンを `_<kebab>.tsx` や `.parts.tsx` に実装しない。共有ファイルに置きます。
- レンダラー付き `children` を素要素由来の `children` と交差させない。要素側から `"children"` を除きます。
- 反復描画する要素に `key` を付け忘れない。
- `items` を所有と描画の両パーツに二重定義しない。描画側は `Context` で受けます。
