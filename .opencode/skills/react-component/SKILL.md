---
name: react-component
description: Suru UI の React コンポーネント (`packages/react/src/<名前>/` の .parts.tsx と .tsx) を書くときに使用します。ファイル配置・型・API・namespace を定めます。
---

# React コンポーネント

## 模範と分担

模範は次の 4 件だけを見ます。

- `packages/react/src/accordion/` — 基本形
- `packages/react/src/alert-dialog/` — 基本形
- `packages/react/src/breadcrumb/` — 所有と描画を分ける場合
- `packages/react/src/button/` — Props 分解と結合の場合

CSS は `../css/SKILL.md`、JSDoc と日本語は `../jsdoc/SKILL.md` と `../japanese/SKILL.md` に従います。

## 作業手順

次の順で進めます。

1. Base UI の型確認 (§2)
2. `.parts.tsx` を書く (§3〜§7)
3. `.tsx` を書く (§8)
4. 周辺ファイル (§9)
5. 自己見直し (§10)
6. 検証 (§10)

## 自動整形に任せるもの

次の並び順は手で整えません。`mise run format` が直すため、規定しません。

- import / export の文と指定子の順序 (oxfmt + `sort-import-exports`)
- JSX 属性の順序 (`sort-jsx-props`)
- オブジェクト・分割代入のキー順 (`sort-object-props`)
- 型・interface メンバーの順序 (`sort-type-props`)
- namespace メンバーの順序 (`sort-namespace-exports`)

手で守るのは残余の位置・既定値の依存順・spread の順序など、意味を持つ順序だけです。

## ファイル配置

```text
packages/react/src/<kebab>/
  _<kebab>.tsx      # 内部ヘルパー (必要な場合のみ)
  <kebab>.parts.tsx # 各パーツ
  <kebab>.tsx       # 合成 + API フック
  <kebab>.css       # css スキルに従う
  index.ts          # 再輸出のみ
```

- `_` 始まりは非公開です。パーツ横断の補助だけを置きます。公開 `index.ts` から再輸出しません。
- `index.ts` は実装を書かず、parts → 合成の順に再輸出します。
- 自ファイルの import には `.js` / `.jsx` を付けます。他コンポーネントは相対で import します。

```ts
export * from "./<kebab>.parts.jsx";
export * from "./<kebab>.jsx";
```

```tsx
import { XIcon } from "../_icons.jsx";
```

## .parts.tsx の土台

### import とセクション

- import / export の文と指定子、`src/index.ts` の順は規定しません。フォーマッターに任せます。
- `./<kebab>.css` を必ず import します。
- セクションはパーツツリー順に置きます。見出しは `// <名>` の次行に同文字数の `-` を置きます。
- `.tsx` の見出しも同様です (`// Types` / `// API` / `// Component` と同文字数の `-`)。

### Base UI の型確認

各パーツを書く前に `node_modules/@base-ui/react/<コンポーネント>/` の `.d.ts` を開きます。

1. `<パート>/*.d.ts` の namespace が公開する型を列挙します。`State`・`Props` のほか、`Actions`・`ChangeEventDetails`・`ChangeEventReason` があれば含めます。
2. 公開メンバーは漏らさず再輸出します。`State` と `Props` だけでは終えません。
3. `Handle` / `createHandle` の有無を確認します。ないものは作りません。あるものは `Handle` セクションに置きます。
4. 他から再輸出のパーツ (例: `Separator`) は `index.parts.d.ts` と `index.d.ts` で実体と型の両方を確認します。
5. 各パーツの `State` フィールドを列挙し、状態クラス化の対象を決めます。`State` にない状態は扱いません。

### Context 定型

子に値を渡す場合のみ、先頭セクションに置きます。

```tsx
export { AutocompleteContext as Context, useAutocompleteContext as useContext };
```

- 別名の `type` / `const` 宣言を足しません。再輸出行に JSDoc は付けません。
- ローカル変数は `ctx` に統一します。読み取りと `useMemo` で同じ名前にします。

```tsx
const ctx = React.use(XxxContext);
const ctx = React.useMemo<XxxContext>(() => ({ ... }), [...]);
```

- namespace には値型があれば追加します。
- 短名再輸出は束縛を作りません。ファイル内部 (JSX 含む) は正式名のままにします。

### 型の置き方

1 パーツ内は Base UI 由来、独自の値型、`Value`・`State`、`Props` の順にします。`Props` を最後にします。

- `State` は Base UI から取ります。状態を持たない素の要素は空オブジェクトにします。
- 型引数名は必ず `T` 始まりにします (`TItem`・`TValue`・`TMultiple`)。
- 独自の修飾値型は union リテラルにし、各値を箇条書きで説明します。

```ts
/**
 * アコーディオンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AccordionRootVariant = "naked" | "liquid";
```

- 別 prop に連動する既定値は `@default` を付けず参照先を示します (例: `既定値は {@link AccordionRootProps.size|size}`)。独自 props のキー順は自動整形に任せます。

## Props 分解

### 4 区分

`Props` は namespace で 4 区分に分け、`&` で結合します。

| 区分     | 内容 | 型の形 |
| -------- | ---- | ------ |
| `Render` | 状態を持つ props | `RenderProps<State>` |
| `SuruUI` | Suru UI 独自 props。JSDoc はここだけに書く | オブジェクト |
| `BaseUI` | Base UI 由来 props。Base UI ラッパーのみ作る。素の要素では作らない | `Omit<...>` |
| `HTML`   | 残りの HTML props | `Omit<...>` |

- `Render` / `SuruUI` / `BaseUI` / `HTML` 自体に JSDoc を付けません。区分の並び順は自動整形に任せます。
- 結合した `Props` 本体には `/** {@link Xxx} に渡す props です。 */` を残します。
- 他コンポーネントを土台にする場合 (例: ToggleButton が Button を包む) は短名 (`Button.Root.Props`) ではなく完全な交差型 (`Button.ButtonRootProps`) を参照します。
- HTML 属性と衝突する名は避け、別名にします (例: `title` と区別する `htmlTitle`)。

### テンプレート A: 素の要素

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

### テンプレート B: Base UI ラッパー

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

- タグは描画先で決めます。Popup / Content → `"div"`、Trigger → `"button"`、不明なら `"div"` です。
- タグ除外で型競合が出たら、タグ除外を外して `Omit<..., keyof Render | keyof SuruUI>` にします。
- 独自 props がなくても `SuruUI = {}` を残します。`keyof SuruUI` が `never` でも `Omit` から除きません。将来の追加漏れを防ぐためです。

### テンプレート C: 汎型

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

`keyof` は `any` で受けます。

## 継承パターン

`Outer` の Base UI (`Toast.Close` など) の `render` 内で `Inner` の Suru UI (`Button.Root` など) を描画する場合です。`ToastClose` を模範にします。

### 型

- `SuruUI`: `Inner` の `SuruUI` から継承します。全部要る場合は代入し、不要キーだけ `Omit` します。一部だけ要る場合は必要なキーだけ定義します。
- `BaseUI`: `Omit<Override<Inner.BaseUI, Outer>, ...>` にします。`Outer` が勝ちます。逆順 (`Override<Inner.BaseUI, Omit<Outer, ...>>`) にしません。
- `HTML`: 通常通り `Omit<React.ComponentProps<"xxx">, keyof Render | keyof SuruUI>` にします。
- `State`: `Override<Inner.State, Outer.State>` にします。

```tsx
export namespace ToastCloseProps {
  export type Render = RenderProps<ToastCloseState>;

  export type SuruUI = Omit<Button.ButtonRootProps["SuruUI"], "item" | "pending">;

  export type BaseUI = Omit<
    Override<Button.ButtonRootProps["BaseUI"], React.ComponentProps<typeof Toast.Close>>,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<"button">
  >;

  export type HTML = Omit<React.ComponentProps<"button">, keyof Render | keyof SuruUI>;
}
```

### 実装手順

1. `props` から `Inner` の `SuruUI` キー、`Render` のすべて (`style`・`render`・`className`)、共有の `BaseUI` キーを分解し、残りを `...otherProps` にします。
2. `Outer` 独自の `BaseUI` (`baseuiProps: Required<Own.BaseUI>`) を `Outer` に `{...otherProps} {...baseuiProps}` で渡します。共有キーがなければ作りません。
3. `Inner` 独自の `SuruUI + BaseUI` (`innerProps: Required<Inner.SuruUI & Inner.BaseUI>`) を `mergeProps` の第 2 要素にします。除外交差したキーは `undefined` を明示します。
4. `Outer` の `render` で `Inner` を描画し、`proxyRenderProps` には `Render` をすべて渡します。`mergeProps` の順序 (`htmlProps` → `innerProps` → `proxyRenderProps` 結果) は変えません。

- どちらの props オブジェクトも `Required` を省略しません。漏れ防止のためです。
- 公開しない `Inner` の `SuruUI` キーは内包先オブジェクト側で埋めます (固定値・`ctx` 値・`undefined` のいずれか)。
- `Outer` の状態から求める `Inner` の `HTML` prop が要る場合 (例: `state.disabled` → `disabled`) は、型に `Pick<Inner.HTML, "disabled">` を交差させて同じオブジェクトに入れます。

```tsx
const baseuiProps: Required<ToastCloseProps.BaseUI> = {
  nativeButton,
  focusableWhenDisabled,
};
const buttonRootProps: Required<Button.ButtonRootProps["SuruUI"] & Button.ButtonRootProps["BaseUI"]> = {
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

## パーツ実装

### 宣言と分割代入

```tsx
export const AccordionItem: IComponent<AccordionItemProps> = function SuiAccordionItem(props) {
```

- `IComponent` 以外の関数型を使いません。実装名の `Sui` 接頭辞を省略しません。
- 汎型パーツは `IComponent` 継承の interface に callable を足します。
- 分割代入は独自 props (既定値付き) → HTML 既定値付き (`aria-hidden`・`role` など) → `className` → 残余の順にします。他 prop を既定値にできます (例: `radius = size`)。
- 残余は末尾に置きます。既定値が他 prop を参照するものは参照先の後に置きます。キーの並び順は自動整形に任せます。

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

### 描画の選び方

| 対象 | 手段 | 備考 |
| ---- | ---- | ---- |
| Base UI ラッパー | JSX で包む | `useRender` を使わない |
| 素の要素 | `useRender` | JSX 直書きしない |

- `render` 受領型は `render={children}` に渡します。
- 独自なしの素要素は引数ごと渡します。既定子ありは `children` に既定値を与えます。

### useRender 定型

利用者の `className` は分解せず残余に残し、自動マージに任せます。`cn` に含めません。

修飾あり (`StatusRoot` を模範にします):

```tsx
const {
  size = "md",
  color = "grey",
  processing = false,
  // @ts-expect-error
  "data-scope": dataScope = "",
  ...otherSpanProps
} = props;

return useRender({
  defaultTagName: "span",
  props: [
    otherSpanProps,
    {
      className: cn(
        "sui_status",
        `sui_status-size_${size}`,
        `sui_status-color_${color}`,
        processing && "sui_status-processing",
      ),
      "data-scope": dataScope,
    },
  ],
});
```

修飾なし + HTML 既定値あり (`AlertIcon` を模範にします):

```tsx
const { "aria-hidden": ariaHidden = true, ...otherDivProps } = props;

return useRender({
  defaultTagName: "div",
  props: [
    otherDivProps,
    {
      className: "sui_alert_icon",
      "aria-hidden": ariaHidden,
    },
  ],
});
```

- HTML 既定値は第 2 要素に直書きせず、props から既定値付きで分解して渡します。上書き可能にするためです。
- 修飾がなく基底クラスのみなら `cn` を使わず文字列で渡します。
- 残余の命名はそのまま渡すなら `props`、分解するなら `other<DefaultTagName>Props` (例: `otherDivProps`) にします。`defaultTagName` の HTML 属性を取り出しておらず残余がそのまま渡せる場合のみ `<defaultTagName>Props` (例: `divProps`) にします。`otherProps` などの汎名を使いません。

### JSX 直書きの className

`useRender` を使わない場合の `cn` は次の順にします。利用者の `className` を先頭に置き、上書きしません。

```tsx
cn(
  className,
  "sui_accordion",
  `sui_accordion-size_${size}`,
  outlined && "sui_accordion-outlined",
  (state) => state.disabled && "sui_accordion-disabled",
);
```

## 状態と見た目の集約

### 4 原則

1. `data-scope=""` は CSS の `@scope` 始点だけに付けます。付け忘れ・付け過ぎの両方を避けます。
2. 状態クラスは DOM ツリー上のルート (起点要素) に集約します。分散させません。
3. SuruUI 由来の値・フラグ・バリアントも最上位パーツの `SuruUI` に集約します。子に同名 props や修飾クラスを持たせません。
4. Base UI の `data-*` 属性を CSS セレクターに使いません (`[data-scope]` を除く)。状態装飾は `cn` の状態関数による自前クラスで行います。

真偽状態は `sui_<基底>-<状態>`、値付き状態は `sui_<基底>-<属性>_<値>` にします。

```tsx
cn(
  className,
  "sui_context_menu_item",
  (state) => state.highlighted && "sui_context_menu_item-highlighted",
  (state) => state.checked && "sui_context_menu_item-checked",
  (state) => state.disabled && "sui_context_menu_item-disabled",
);
```

- 対象は Base UI `State` のフィールドに限ります。`State` にない参照は型エラーになり、対応する `data-*` も発行されないため CSS が死にます。偽側が必要なら否定でクラス化します (例: `(state) => !state.checked && "sui_context_menu_item_indicator-unchecked"`)。
- 例外は 2 つだけです。Portal で Root が DOM 上のルートでない場合と、子が独立した状態を持つ場合 (例: List の Item ごとの `-disabled`、Toast の `behind` は Content のみ) は、その状態を持つ要素に付けます。
- 重複状態は最上位の 1 箇所のみに付けます (例: Toast の `expanded` は `sui_toast_viewport-expanded` のみにします)。下位は祖先セレクターで装飾します (例: `.sui_toast_viewport-expanded .sui_toast`)。
- 子の見た目切替は起点自身の修飾クラスを祖先セレクターで受けます (例: `&.sui_status-size_sm`)。`&:has(.子修飾)` は書きません。見た目の伝播のためだけに `Context` を作りません。

## 一覧描画

項目配列から子を組み立てるパーツ (例: `AccordionRoot`) は `items` とレンダラー関数を受けます。

- 所有と描画のパーツが違う場合 (例: `BreadcrumbRoot` と `BreadcrumbList`) は項目データを `Context` で渡し、`items` を二重に持たせません。描画側は `children` のみを足し、`items` は `Context` から読みます。
- 型は項目オブジェクト、レンダラー、`State`、`Props` の順にします。

```tsx
export type XxxItemObject = { ... };
export interface IXxxItemRenderer<TItem = any> {
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}
```

`children` と `items` はどちらも `SuruUI` に入れます。素の要素の `children` は `ReactNode` のため、そのまま交差させると関数が代入できません。`keyof SuruUI` で要素側から除かれます。

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

実装規則です。

- 描画は `children: typeof children === "function" ? items.map(children) : children` で分けます。既定子に既定レンダラーを与えます。
- 既定レンダラーはコンポーネント直後に置きます。項目オブジェクト以外は `toReactNode` に逃がし、反復要素には `key` を付けます。判定関数は非公開にします。

## 短名定型

各パーツの直後に置きます。

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

- namespace には `State` と `Props` を必ず入れ、値型 (`ItemObject`・`IItemRenderer` など) があれば追加します。汎型は既定値付きで引き継ぎます。
- `Props` は区分の `namespace Props` と `&` 結合の `type Props` の 2 段にします。`|` で結合しません。
- 再輸出と namespace 内の型別名には JSDoc を付けません。`{@link X}` のみの JSDoc も付けません。

## .tsx (合成)

### Types

- Root 由来の再命名には JSDoc を付けません。名は `<Comp><型名>` にし、パーツ名を重ねません (例: `BreadcrumbRootItemObject` → `BreadcrumbItemObject`)。
- `SlotProps` は `readonly` + `| undefined` にします。キーの順序は自動整形に任せます。子要素は原則 `Omit` で除き、合成 `Props` に持ち上げたキーも除きます。ただし API / Component が `children` を生成・上書きしないパーツ (既定子を持つだけの Indicator など) は `children` を残します。

```ts
readonly content?: Omit<AlertDialogContentProps, "children" | keyof AlertDialogPropsContent> | undefined;
```

- `State` は `RootState` の別名にします。
- 合成 `Props` は追加が `slotProps` だけなら Root との単純交差にします。要点が多い場合は分割し、重複キーは `Omit` で除きます。

```ts
export type AccordionProps<TItem = any, TValue = any> = AccordionRootProps<TItem, TValue> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: AccordionSlotProps | undefined;
};
```

- 子相当やコールバックはパーツ Props から参照し、二重定義しません (例: `XxxProps["children"]`・`XxxProps["onClick"]`)。レンダラーを受け取る側の `children` は `Pick` で取り込みます (例: `Pick<BreadcrumbListProps, "children">`)。

### API

getter 名は `get<Part>Props` にします。配列を返す場合のみ `get<Part>PropsList` にします。常に描画するパーツは Props を返し、条件付きのものは `| null` を付けます。

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

フック内の規則です。

- `slotProps` を各パーツ既定 `{}` 付きで分解します。残余の行き先は 1 つにします。
- 任意表示は可否を判定し、駄目なら `null` を返します。可視判定なしに描画しません。ノード系はノード化を通します。
- 項目を所有する getter は子を先に確定します。返り値は `Omit<PartProps, "children"> & { children: LikelyVisibleNode | null }` にします。

```ts
children: typeof children === "function" ? items.map(children) : toReactNode(children),
```

- パーツ別 props は利用者指定 (`slotProps.<part>`) を後に spread します。直 prop を優先しません。
- コールバック合成は `slotProps` 側を先に呼び、中止なら利用者側を呼びません。
- 末尾に短名を付けます (例: `export { type AlertDialogAPI as API, useAlertDialogAPI as useAPI };`)。

### Component

汎型 interface + 実装にします。

- 条件付きパーツ (`| null` を返す getter) は先に変数化し、有無で条件描画します (`{xProps && <Part {...xProps} />}`)。変数化の順序は JSX の描画順にします。
- 常に描画するパーツは変数化せず、実行結果をそのまま渡します (`<Part {...api.getXProps()} />`)。
- 一覧は `{children ?? ((item, index) => (...))}` の形にし、フォールバック関数を所有パーツに渡して写像させます。推論できない引数には明示型を付けます。
- 末尾に namespace を置き、`State`・`Props`・`SlotProps` と再命名型を列挙します。JSDoc は付けません。

## 周辺ファイル

- `_<kebab>.tsx` は `.parts.tsx` と `.tsx` からのみ import します。
- `src/index.ts` には合成 (`.tsx`) の公開型と値を列挙します。パーツ単体の型は列挙せず、合成の再命名型を使います。値には `type` を付けず、型のみには `type` を付けます。

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

- 既定アイコンは共有 `../_icons.tsx` に置きます。コンポーネント専用ファイルに実装しません。型は `IComponent` の素関数にし、`svg` にフォーカス外しと装飾隠しを付けます。

## 見直しと検証

実装が終わったら検証の前にこのスキルを最初から読み直し、違反を自分の手で直します。フォーマッターやリンターに頼りません。

次に `packages/react/` で次の 3 つを実行し、自分の変更分に由来するエラーを残しません。

```sh
mise run test:format
mise run test:lint
mise run test:typecheck
```

- `test:format` が失敗したら `mise run format` で直し、差分を確認します。
- `test:lint` は他由来の既存エラーがあっても、自分のファイル分は残しません。
- `test:typecheck` が失敗したら型を直します。型エラーがないのにキャストで逃げません。

## 最終チェックリスト

提出前にすべて満たすことを確認します。

- `erasableSyntaxOnly` に反する構文 (`enum`・パラメータープロパティーなど) がない。
- `IComponent` 以外で宣言していない。`Sui` 接頭辞を省略していない。
- `useRender` 対象に JSX 直書きしていない。Base UI 対象に `useRender` を使っていない。
- `useRender` 対象の `className` を分解せず、`cn` に含めていない。修飾なしで `cn` を使っていない。
- HTML 既定値を第 2 要素に直書きしていない。上書き可能にしている。
- `useRender` の残余に汎名を使っていない。`other<Tag>Props` / `<tag>Props` / `props` を使い分けている。
- JSX 直書きの `cn` で `className` を先頭に置いている。
- `Props` を 4 区分に分け、`&` で結合している。区分自体に JSDoc を付けていない。結合本体の JSDoc を残している。
- 短名 namespace の `Props` を `&` で結合している。
- 空の `SuruUI` でも `Omit` の `| keyof SuruUI` を省略していない。
- 型引数名が `T` 始まりである。
- 他コンポーネント参照に短名を使っていない。完全な交差型を使っている。
- Base UI の公開型に漏れがない。`Handle` の有無を確認している。
- `Context` 短名を 1 行の `export { X as Y }` にしている。ローカル変数は `ctx` である。内部参照は正式名である。
- 再輸出・再命名に JSDoc (`{@link X}` のみを含む) を付けていない。`State` / `Props` を省略していない。
- レンダラー付き `children` を `SuruUI` に入れている。
- 反復要素に `key` を付けている。判定関数を公開していない。
- 再命名型にパーツ名を重ねていない。
- `SlotProps` が `readonly`・`| undefined` である。持上げキーを残していない。既定子だけのパーツの `children` を消していない。
- API の getter 名・単体/リスト・`| null` が正しい。常に描画するパーツを変数化していない。可視判定なしに描画していない。`slotProps` 側を後に spread し、コールバック中止判定を省略していない。
- `data-scope` が起点のみである。状態・見た目が最上位に集約されている。子に同名 props や修飾クラスがない。`&:has(.子修飾)` がない。見た目だけの `Context` がない。Base UI の `data-*` を CSS に使っていない。`State` 外のクラスや CSS がない。
- `items` を二重定義していない。
- 継承の `BaseUI` が `Omit<Override<...>>>` の順である。`Required` を省略していない。除外交差キーの `undefined` 明示がある。`proxyRenderProps` に `Render` をすべて渡し、`mergeProps` の順序が正しい。
- `index.ts` に再輸出以外がない。アイコンが共有ファイルにある。
