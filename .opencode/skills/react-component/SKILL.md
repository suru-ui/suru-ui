---
name: react-component
description: Suru UI の React コンポーネント (`packages/react/src/<名前>/` の .parts.tsx と .tsx) を書くときに使用します。ファイル配置・型・API・namespace を定めます。
---

# React コンポーネント

基準となる実装は次の 4 件です。

- `packages/react/src/accordion/`
- `packages/react/src/alert-dialog/`
- `packages/react/src/breadcrumb/` (項目の所有と描画を分ける場合の見本です)
- `packages/react/src/button/` (Props の分解と結合の見本です)

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

### Base UI の型確認

各パーツを書く前に、対応する Base UI の `.d.ts` (`node_modules/@base-ui/react/<コンポーネント>/`) を開き、公開メンバーに漏れがないかを確認します。

- `<パート>/*.d.ts` の namespace が公開する型を列挙します (`State` と `Props` のほか、`Actions`、`ChangeEventDetails`、`ChangeEventReason` があれば含めます。例: `ContextMenuRoot` の `Actions`、`ChangeEventDetails`、`ChangeEventReason`)。
- 公開メンバーは漏らさず再輸出します。`State` と `Props` だけを輸出して終わりにしません。
- `Handle` / `createHandle` の有無も確認します。ないものは作りません (例: ContextMenu にはありません)。あるものは `Handle` セクションに置きます (例: Menu、Dialog、AlertDialog)。
- 他から再輸出されているパーツ (例: `Separator`) は `index.parts.d.ts` と `index.d.ts` で実体と型の両方を確認します。
- 各パーツの `State` のフィールドを列挙し、状態クラス化の対象を決めます。`State` にない状態は扱いません (例: `State` が `{ open }` のみのパーツに無効状態はありません)。

### セクション

パーツツリー順に置きます。見出しは `// <名>` の次の行に同文字数の `-` を置きます。

### Context

子パーツへ値を伝える場合は、先頭セクションに置きます。短名は値とフックをまとめた次の 1 行にし、別名の `type` や `const` 宣言を足しません。再輸出行に JSDoc は付けません。

```tsx
export { AutocompleteContext as Context, useAutocompleteContext as useContext };
```

ローカル変数は短縮形の `ctx` にし、`context` などの長い名前は使いません。読み取りと `useMemo` の両方で同じ名前にします。

```tsx
const ctx = React.use(XxxContext);
const ctx = React.useMemo<XxxContext>(() => ({ ... }), [ ... ]);
```

namespace には値型があれば追加します。ファイル内部の参照 (JSX を含む) は正式名のままにします。

### 型の並び

1 つのパーツ内では Base UI 由来、独自の値型、`Value`・`State`、`Props` の順にします。`Props` を最後にします。
`State` は Base UI から取ります。状態を持たない素の要素では空オブジェクトにします。
型引数の名前は必ず `T` で始めます (例: `TItem`、`TValue`、`TMultiple`)。`Value` や `Multiple` のような `T` なしの名前は使いません。

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

### Props の分解

各パーツの `Props` は `Render` / `SuruUI` / `BaseUI` / `HTML` の区分に namespace で分解し、`&` で結合します。

- `Render`: 状態を持つ props です。`RenderProps<State>` にします。
- `SuruUI`: Suru UI のために定義された props です。独自 props の JSDoc はここに書きます。
- `BaseUI`: Base UI のために定義された props です。Base UI ラッパーの場合のみ作ります。素の要素では作りません。
- `HTML`: その他 HTML 要素に渡される props です。
- `Render` / `SuruUI` / `BaseUI` / `HTML` 自体に JSDoc は付けません。
- 結合した `Props` 本体の JSDoc (`{@link Xxx} に渡す props です。`) は残します。

素の要素の場合です。

```tsx
export namespace AlertRootProps {
  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<AlertRootState>;

  export type SuruUI = {
    /**
     * アラートの色を指定します。
     *
     * @default "grey"
     */
    color?: AlertRootColor | undefined;
  };
}

/**
 * {@link AlertRoot} に渡す props です。
 */
export type AlertRootProps = AlertRootProps.Render & AlertRootProps.SuruUI & AlertRootProps.HTML;
```

タグは既存の `React.ComponentProps<"xxx">` をそのまま使います。

Base UI ラッパーの場合です。`BaseUI` が加わります。

```tsx
export namespace SwitchRootProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof Switch.Root>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"span">
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<SwitchRootState>;

  export type SuruUI = {
    // ...独自 props (キー昇順)
  };
}

/**
 * {@link SwitchRoot} に渡す props です。
 */
export type SwitchRootProps = SwitchRootProps.Render &
  SwitchRootProps.SuruUI &
  SwitchRootProps.BaseUI &
  SwitchRootProps.HTML;
```

タグは描画先の要素から決めます (例: Popup / Content → `"div"`、Trigger → `"button"`、不明なら `"div"`)。`BaseUI` 側のタグ除外で型競合が出る場合は、タグ除外を外して `BaseUI = Omit<..., keyof Render | keyof SuruUI>` にします。

独自 props がない場合は `SuruUI` を空にします。このとき `keyof SuruUI` は `never` になるため、Omit から除きます。

```tsx
export namespace TabsListProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof BaseTabs.List>,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<TabsListState>;

  export type SuruUI = {};
}
```

汎型がある場合は各区分に引き継ぎます。`keyof` は `any` で受けます。

```tsx
export namespace AccordionRootProps {
  export type BaseUI<TItem = any, TValue = any> = Omit<
    React.ComponentProps<typeof Accordion.Root<TValue>>,
    keyof Render | keyof SuruUI
  >;

  export type Render<TValue = any> = RenderProps<AccordionRootState<TValue>>;

  export type SuruUI<TItem = any> = {
    // ...独自 props (キー昇順)
  };
}

/**
 * {@link AccordionRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TValue 項目の値の型です。
 */
export type AccordionRootProps<TItem = any, TValue = any> = AccordionRootProps.Render<TValue> &
  AccordionRootProps.SuruUI<TItem> &
  AccordionRootProps.BaseUI<TItem, TValue> &
  AccordionRootProps.HTML;
```

他コンポーネントの Props を土台にする場合 (例: ToggleButton が Button を包む) は、短名 (`Button.Root.Props`) ではなく完全な交差型 (`Button.ButtonRootProps`) を参照します。

HTML 属性と衝突する名前は避け、別名にします (例: `title` と区別するための `htmlTitle`)。

### 継承 (SuruUI コンポーネントを内包する場合)

継承先の Base UI (`Outer`。例: `Toast.Close`) の `render` 内で継承元の Suru UI (`Inner`。例: `Button.Root`) を描画する場合は `ToastClose` を模範にします。

型は次の通りにします。

- `SuruUI`: `Inner` の `SuruUI` から必要なプロパティーを継承します。全部要る場合はそのまま代入し、不要なキーだけ `Omit` で除きます (例: `Omit<Button.ButtonRootProps["SuruUI"], "item" | "pending">`)。一部だけ要る場合は必要なキーだけを定義します (例: `ToastAction`)。
- `BaseUI`: `Inner` の `BaseUI` を土台に `Outer` の props で上書きします。`Outer` を勝たせるため `Override` を使います。
- `HTML`: 通常通り `Omit<React.ComponentProps<"xxx">, keyof Render | keyof SuruUI>` にします。
- `State`: `Override<Inner.State, Outer.State>` にします。

```tsx
export namespace ToastCloseProps {
  export type Render = RenderProps<ToastCloseState>;

  export type SuruUI = Omit<Button.Root.Props.SuruUI, "item" | "pending">;

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Omit<
      React.ComponentProps<typeof Toast.Close>,
      keyof Render | keyof SuruUI | keyof React.ComponentProps<"button">
    >
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;
}
```

実装は次の通りにします。

1. `props` から `Inner` の `SuruUI` キー、`Render` のすべて (`style`、`render`、`className`)、共有の `BaseUI` キー (例: `nativeButton`、`focusableWhenDisabled`) を分解し、残りを `...otherProps` にします。
2. `Outer` 独自の `BaseUI` (`baseuiProps: Required<Own.BaseUI>`) を用意し、`Outer` に `{...otherProps} {...baseuiProps}` で渡します。`Required` で漏れを防ぎます。共有キーがなければ作りません。
3. `Inner` 独自の `SuruUI + BaseUI` (`innerProps: Required<Inner.SuruUI & Inner.BaseUI>`) を用意し、`mergeProps` の第 2 要素にします。`SuruUI` で除外したキーは `undefined` を明示します。`Required` で漏れを防ぎます。
4. `Outer` の `render={(htmlProps, outerState) => (<Inner {...mergeProps([htmlProps, innerProps, proxyRenderProps(outerState, { style, render, className })])} />)}` とし、`proxyRenderProps` には `Render` をすべて渡します。`mergeProps` の順序 (`htmlProps` → `innerProps` → `proxyRenderProps` 結果) は変えません。

公開しない `Inner` の `SuruUI` キーは内包先オブジェクト側で埋めます (固定値・`ctx` 値・`undefined` のいずれか。例: `item: true`、`pending: undefined`)。`Outer` の状態から求める `Inner` の `HTML` prop が要る場合 (例: `state.disabled` → `disabled`) は、型に `Pick<Inner.HTML, "disabled">` を交差させて同じオブジェクトに入れます。

```tsx
const baseuiProps: Required<ToastCloseProps.BaseUI> = {
  nativeButton,
  focusableWhenDisabled,
};
const buttonRootProps: Required<Button.Root.Props.SuruUI & Button.Root.Props.BaseUI> = {
  item: undefined,
  size,
  color,
  muted,
  radius,
  pending: undefined,
  squared,
  variant,
  outlined,
  nativeButton,
  focusableWhenDisabled,
};

return (
  <Toast.Close
    {...otherProps}
    {...baseuiProps}
    render={(htmlProps: {}, toastState) => (
      <Button.Root
        {...mergeProps<typeof Button.Root>([
          htmlProps,
          buttonRootProps,
          proxyRenderProps(toastState, {
            style,
            render,
            className,
          }),
        ])}
      />
    )}
  />
);
```

### パーツ実装

型は `IComponent<Props>`、実装名は `Sui` 付き PascalCase にします。

```tsx
export const AccordionItem: IComponent<AccordionItemProps> = function SuiAccordionItem(props) {
```

汎型があるパーツは `IComponent` 継承の interface に callable を足します。

分割代入は独自 props (既定値付き) → `className` → 残余の順にします。他 prop を既定値にできます。
展開するプロパティーは文字数が短い順にし、同長のもの同士だけ辞書順にします。残余 (`...otherProps` など) は末尾に置きます。既定値が他の prop を参照するものは参照先の後に置きます。

```tsx
const {
  size = "md",
  radius = size,
  variant = "liquid",
  outlined = false,
  className,
  ...otherProps
} = props;
```

Base UI は JSX で包み、素の要素は `useRender` にします。`render` 受領型は `render={children}` に渡します。独自なしの素要素は引数ごと渡し、独自ありは独自を分解して残りを渡します。既定子ありは `children` に既定値を与えます。

`useRender` は `props` 配列の `className` を自動マージするため、`cn` を使いません。利用者の `className` は分解せず残余に残し、第 2 要素には基底クラスのみを渡します。

```tsx
const { children = <ChevronIcon />, ...otherSpanProps } = props;

return useRender({
  defaultTagName: "span",
  props: [
    otherSpanProps,
    {
      children,
      className: "sui_collapsible_indicator",
    },
  ],
});
```

`useRender` に渡す props の命名は次の通りにします。そのまま渡す場合は `props` にします。分解する場合は残余を `other<DefaultTagName>Props` にします (例: `otherDivProps`)。ただし `defaultTagName` の HTML 属性を取り出しておらず残余がそのまま渡せる場合は `<defaultTagName>Props` にします (例: `divProps`)。

`cn` は利用者の `className` を先頭にし、基底クラス、値つき修飾、真偽修飾、状態関数の順にします。

```tsx
cn(
  className,
  "sui_accordion",
  `sui_accordion-size_${size}`,
  outlined && "sui_accordion-outlined",
  (state) => state.disabled && "sui_accordion-disabled",
);
```

`data-scope=""` は CSS の `@scope` 始点になる要素だけに付けます。

状態クラス (`-open` / `-closed`、`-transition_status_*`、`-disabled` など) は基本的に DOM ツリー上のルート (起点要素) に付けます。Portal を持ち Root が DOM ツリー上のルートでない場合や、子が独立した状態を持つ場合 (例: List の Item ごとの `-disabled`) は、その状態を持つ要素に付けます。

Base UI が付与する `data-*` 属性 (`data-open`、`data-checked`、`data-disabled` など) を CSS セレクターに使わない (`[data-scope]` は自前の目印のため例外)。状態の装飾は `cn` の状態関数で付ける自前の状態クラスで行う。真偽状態は `sui_<基底>-<状態>`、値付き状態は `sui_<基底>-<属性>_<値>` にする。

```tsx
cn(
  className,
  "sui_context_menu_item",
  (state) => state.highlighted && "sui_context_menu_item-highlighted",
  (state) => state.checked && "sui_context_menu_item-checked",
  (state) => state.disabled && "sui_context_menu_item-disabled",
);
```

対象は各パーツの Base UI `State` 型にあるフィールドに限る。`State` にないフィールドは `cn` の状態関数で参照できない (型エラーになる)。対応する `data-*` 属性も Base UI が発行しないため、CSS 側に書いても死んだ指定になる (例: `State` が `{ open }` のみの Trigger に対する `[data-disabled]`)。装飾に偽側が必要な場合は否定でクラス化する (例: `(state) => !state.checked && "sui_context_menu_item_indicator-unchecked"`)。

### 項目の一覧描画

項目の配列から子要素を組み立てるパーツ (例: `AccordionRoot`) は `items` とレンダラー関数を受けます。所有と描画のパーツが違う場合 (例: `BreadcrumbRoot` と `BreadcrumbList`) は、項目データを `Context` で渡し、`items` を二重に持たせません。描画側のパーツには `children` のみを足し、`items` は `Context` から読みます。

型は項目オブジェクト、レンダラー、`State`、`Props` の順にします。

```tsx
export type XxxItemObject = { ... };
export interface IXxxItemRenderer<TItem = any> {
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}
```

`Props` には次の 2 つを足します。どちらも `SuruUI` に入れます。素の要素の `children` は `ReactNode` のため、そのまま交差させると関数が代入できなくなります。`keyof SuruUI` で要素側から除かれます。

```tsx
export namespace XxxProps {
  export type HTML = Omit<React.ComponentProps<"ol">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<XxxState>;

  export type SuruUI<TItem = any> = {
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
}

/**
 * {@link Xxx} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type XxxProps<TItem = any> = XxxProps.Render & XxxProps.SuruUI<TItem> & XxxProps.HTML;
```

描画では関数か否かで分けます。既定子に既定レンダラーを与えます。

```tsx
children: typeof children === "function" ? items.map(children) : children,
```

既定レンダラーはコンポーネントの直後に置きます。項目オブジェクト以外は `toReactNode` に逃がし、反復する要素には `key` を付けます。判定関数はそのファイル内にとどめ、公開しません。

namespace には `ItemObject` と `IItemRenderer` を足します。汎型は既定値付きで引き継ぎます。

### 短名と namespace

各パーツの直後に短名再輸出と namespace を置きます。namespace には `State` と `Props` を必ず入れ、値型があれば追加します。`Props` は区分の `namespace Props` と `&` 結合の `type Props` の 2 段にします。汎型は既定値付きで引き継ぎます。再輸出と namespace 内の型別名には JSDoc を付けません。`{@link X}` のみの JSDoc も付けません。短名再輸出 (`export { X as Y }`) はローカル束縛を作らないため、ファイル内部の参照 (JSX を含む) は正式名 `X` のままにします。

```tsx
export { AccordionItem as Item };
export namespace Item {
  export type State = AccordionItemState;
  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = AccordionItemProps.HTML;
    export type Render = AccordionItemProps.Render;
    export type SuruUI = AccordionItemProps.SuruUI;
  }
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

Root 由来の再命名には JSDoc を付けません。`{@link 元型}` のみの JSDoc も付けません。再命名型の名は `<Comp><型名>` にし、パーツ名を重ねません (例: `BreadcrumbRootItemObject` → `BreadcrumbItemObject`。`BreadcrumbItemsItem` のような `<Comp><パーツ名><型名>` は使いません)。

`SlotProps` はキー昇順、`readonly` + `| undefined` にします。子要素は原則 `Omit` で除き、合成 `Props` に持ち上げたキーも除きます。ただし API / Component が `children` を生成・上書きしないパーツ (既定子を持つだけの Indicator など) は `children` を残し、利用者の上書きを許します。

```ts
readonly content?: Omit<AlertDialogContentProps, "children" | keyof AlertDialogPropsContent> | undefined;
```

`State` は `RootState` の別名にします。

合成 `Props` は追加が `slotProps` だけなら Root との単純交差にします。要点が多い場合は分割し、重複キーは `Omit` で除きます。

```ts
export type AccordionProps<TItem = any, TValue = any> = AccordionRootProps<TItem, TValue> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: AccordionSlotProps | undefined;
};
```

子相当やコールバックはパーツ Props から参照し、二重定義しません (例: `XxxProps["children"]`、`XxxProps["onClick"]`)。レンダラーを受け取る側の `children` は `Pick` で取り込みます (例: `Pick<BreadcrumbListProps, "children">`)。

### API

getter 名は `get<Part>Props`、宣言順はパーツ名昇順にします。常に描画するパーツは Props を返し、条件付きで描画するパーツは `| null` を付けます。配列 (props のリスト) を返す getter は `get<Part>PropsList` にします (例: `getStartAddonsPropsList`)。

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

末尾に namespace を置き、`State`、`Props`、`SlotProps` と再命名型を列挙します。JSDoc は付けません。`{@link X}` のみの JSDoc も付けません。

## _<kebab>.tsx

公開 `index.ts` から再輸出しません。`.parts.tsx` と `.tsx` からのみ import します。

## src/index.ts (公開 API)

`src/index.ts` には合成 (`.tsx`) の公開型と値を列挙します。パーツ単体の型 (例: `ComboboxRootProps`) は列挙せず、合成の再命名型 (例: `ComboboxProps`) を使います。

値として使うもの (例: `ComboboxContext`、`useComboboxContext`) は `type` を付けずに export します。型のみのものには `type` を付けます。

```ts
export {
  type ComboboxAPI,
  type ComboboxProps,
  ...
  Combobox,
  useComboboxAPI,
  ComboboxContext,
  useComboboxContext,
} from "./combobox/index.js";
```

順序はフォーマッターが自動整形するため規定しません。

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
- `useRender` 対象で `cn` を使わない。`className` を分解せず残余に残し、マージに任せます。
- `SlotProps` や API の返り値から、既定子を持つだけのパーツの `children` を `Omit` しない。
- `useRender` 対象の素要素に JSX 直書きしない。Base UI 対象に `useRender` を使わない。
- `useRender` の残余に `otherProps` などの汎名を使わない。
- `SlotProps` のキーに子要素や持上げキーを残さない。`readonly` と `| undefined` を省略しない。キー順を崩さない。
- API の getter 名を `get*Props` / `get*PropsList` 以外にしない。単体とリストを取り違えない。宣言順をパーツ順から変えない。条件付き getter から `| null` を省略しない。
- 可視判定なしにオプショナルな子要素を描画しない。
- 常に描画するパーツの props を変数化しない。実行結果をそのまま渡します。
- パーツ別指定より直 prop を優先しない。コールバック合成で中止判定を省略しない。
- `data-scope=""` を起点以外の要素に付けない。付け忘れない。
- namespace の `State` / `Props` を省略しない。短名再輸出を省略しない。
- `Props` を `Render` / `SuruUI` / `BaseUI` / `HTML` に分解せずに書かない。
- 短名 namespace の `Props` を `|` で結合しない。`&` で結合します。
- 空の `SuruUI` (`= {}`) がある Omit に `| keyof SuruUI` を残さない。
- `Render` / `SuruUI` / `BaseUI` / `HTML` に JSDoc を付けない。結合した `Props` 本体の JSDoc は残します。
- 他コンポーネントの Props を参照するとき短名 (`Button.Root.Props`) を使わない。完全な交差型 (`Button.ButtonRootProps`) を使います。
- Base UI が公開する型 (`Actions`、`ChangeEventDetails`、`ChangeEventReason` など) を輸出し忘れない。`State` と `Props` だけを輸出して終わりにしない。
- `Context` や `useContext` の短名を別名の `type` / `const` 宣言で作らない。`export { X as Y }` の 1 行にまとめる。
- Context のローカル変数に `context` などの長い名前を使わない。`ctx` にする。
- 再輸出・再命名の型別名に JSDoc を付けない。`{@link X}` のみの JSDoc も付けない。
- 短名をファイル内部で参照しない。内部参照 (JSX を含む) は正式名にする。
- `index.ts` に実装を書かない。再輸出以外を足さない。
- アイコンを `_<kebab>.tsx` や `.parts.tsx` に実装しない。共有ファイルに置きます。
- レンダラー付き `children` を `SuruUI` の外に置かない。`SuruUI` に入れ、`keyof SuruUI` で要素側から除きます。
- 反復描画する要素に `key` を付け忘れない。
- 型引数名の先頭に `T` を付け忘れない (例: `TValue`、`TMultiple`)。
- 合成の再命名型にパーツ名を重ねない (例: `BreadcrumbItemObject`。`BreadcrumbItemsItem` は禁止)。
- 状態クラスを Content などの子に分散させない。DOM ツリー上のルートに集約します (Portal や独立状態の子は例外)。
- CSS セレクターに Base UI の `data-*` 属性を使わない (`[data-scope]` を除く)。状態の装飾は `cn` の状態関数によるクラスで行う。
- `State` 型にない状態のクラスや CSS 指定を書かない。Base UI が発行しない属性への指定は死になる。
- `items` を所有と描画の両パーツに二重定義しない。描画側は `Context` で受けます。
- 継承の `BaseUI` を `Omit` の交差で書かない。`Inner` を土台に `Outer` で上書きする `Override` にします。
- 継承の `baseuiProps` と内包先 props オブジェクトから `Required` を省略しない。除外交差したキーは `undefined` 明示を忘れない。
- 継承の `proxyRenderProps` に渡す `Render` (`style`、`render`、`className`) を省略しない。`mergeProps` の順序を変えない。
