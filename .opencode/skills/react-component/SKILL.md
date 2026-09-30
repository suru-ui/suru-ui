---
name: react-component
description: Suru UI の React コンポーネント (`packages/react/src/<名前>/` のパーツファイルとバレル) を書くときに使用します。ファイル配置・型・API・namespace を定めます。
---

# React コンポーネント

## 模範の扱い

本スキルで名指しするコンポーネント・ファイル・型名はすべて例示であり、網羅的な指定ではありません。
規範は本文の定型・規則にあり、例の追加・置換では変わりません。
模範コンポーネントが増えた場合も本スキルを書き換える必要はなく、新しい実装が同じ規範に従っているかで判断します。
参照先に迷ったときは、直近で本スキルに沿って作られた実装を優先します。

本文中の `Combobox...` のコードは、定型への当てはめ例です。
他コンポーネントへ適用するときは `<kebab>`・`<Comp>` へ機械的に読み替えます。
既定値 (`"md"`・`"grey"` など) や修飾名 (`Color`・`Size` など) も同様に当てはめ例であり、個々のコンポーネントの仕様に従います。

代表例:
- `packages/react/src/combobox/`
- `packages/react/src/autocomplete/`
- `packages/react/src/accordion/`

パターン別の代表例 (同型の実装はどれも同等に参照してよく、以下の列挙にない新設も模範になりえます):
- `combobox.root.tsx` — Root 定型の例 (DOM を持たない Root + Config + Context 提供)
- `accordion.root.tsx` — DOM を持つ Root + `items` レンダラーの例 (`data-scope` 起点・`TItem` / `TValue`・スタイル情報の state 化)
- `combobox.input-group.tsx` — スタイル起点・状態集約の例
- `combobox.item.tsx` — 継承パターン (Outer の Base UI + Inner の Suru UI) の例
- `combobox.collection.tsx` / `combobox.list.tsx` / `combobox.value.tsx` — 一覧描画・レンダラーの例
- `combobox.context.ts` / `combobox.item.context.ts` — Context・サブコンテキストの例
- `accordion.item.context.ts` / `accordion.trigger.context.ts` — パーツ状態のサブコンテキスト例 (短名は `ItemContext` / `TriggerContext`)
- `combobox.trigger.tsx` — render 関数を `children` に付け替える場合の例
- `combobox.use-filter.ts` / `combobox.use-filtered-items.ts` — フックラッパーの例
- `accordion.item.tsx` / `accordion.trigger.tsx` — Base UI ラッパーで Context を state に合成する例 (Trigger はサブ Context の提供も行う)
- `accordion.heading.tsx` / `accordion.content.tsx` — Context を state に合成する薄い Base UI ラッパーの例
- `accordion.indicator.tsx` — `useRender` 素要素 + 既定子 (`<ChevronIcon />`) + `ItemContext` 読み取りの例
- `_accordion.ts` — `ItemObject` 判定・値推論ヘルパーの例
- `combobox.tsx` — 合成 (Types + クラス API + 分岐 Component) の例
- `accordion.tsx` — 単一 Root 描画の合成 (`slotProps` + `rootProps` の 2 分割 + `Object.assign` での Context 公開) の例

CSS は `../css/SKILL.md`、JSDoc と日本語は `../jsdoc/SKILL.md` と `../japanese/SKILL.md` に従います。

## 作業手順

次の順で進めます。

1. Base UI の型確認
2. パーツファイル (`<kebab>.<パーツ>.tsx` または `<kebab>.<パーツ>.context.ts`) を書く
3. バレル (`<kebab>.parts.ts`) を書く
4. `.tsx` (合成) を書く
5. 周辺ファイル
6. 自己見直し
7. 検証

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
  _<kebab>.tsx                  # パーツ横断の内部ヘルパー (必要な場合のみ)
  <kebab>.context.ts            # ルート Context パーツ
  <kebab>.<対象>.context.ts     # サブ Context パーツ (Item / Trigger など、必要な場合のみ)
  <kebab>.root.tsx              # パーツごとのファイル
  <kebab>.<パーツ>.tsx          # 例: <kebab>.content.tsx
  <kebab>.use-<名前>.ts         # Base UI フックの薄いラッパー (必要な場合のみ)
  <kebab>.utils.ts              # 公開ヘルパー (必要な場合のみ)
  <kebab>.parts.ts              # パーツのバレル
  <kebab>.tsx                   # 合成 + API フック
  <kebab>.css                   # css スキルに従う
  index.ts                      # 再輸出のみ
```

- 1 パーツ 1 ファイルです。ファイル名は `<kebab>.<パーツ名の kebab>.tsx` にします (例: `ComboboxRoot` → `combobox.root.tsx`)。
- コンポーネント (JSX を書くか `IComponent` を使うもの) は `.tsx`、Context・型・フックのみのパーツは `.ts` にします。
- Context は `<kebab>.<対象の kebab>.context.ts` にします (例: `ButtonContext` → `button.context.ts`、`ButtonCircularProgressContext` → `button.circular-progress.context.ts`)。対象がない場合は `<kebab>.context.ts` です。項目値の伝播など、2 つ目以降の Context は `<kebab>.<対象>.context.ts` の形にします (例: `ComboboxItemContext` → `combobox.item.context.ts`、`AccordionTriggerContext` → `accordion.trigger.context.ts`)。短名は、ルート Context が `Context` / `useContext`、ルート以外が `<対象>Context` / `use<対象>Context` です (`ItemContext` / `useItemContext`、`TriggerContext` / `useTriggerContext`)。ルート以外で `Context` / `useContext` を使いません。
- Base UI フックの薄いラッパーは `<kebab>.use-<名前>.ts` にします (例: `combobox.use-filter.ts`、`combobox.use-filtered-items.ts`)。`I<名前>` + `IUse<名前>Options` (ある場合) + `IUse<名前>` interface + `useSui...` 実装 + 短名再輸出の順にします。
- `_` 始まりは非公開です。2 つ以上のパーツが共有する補助だけを置きます。バレルと公開 `index.ts` から再輸出しません。公開するパーツ横断の補助 (`decompose...` など) は `<kebab>.utils.ts` に置き、バレルから再輸出します。
- バレル `<kebab>.parts.ts` は再輸出だけを行い、先頭で `./<kebab>.css` を import します。実装を書きません。Context (`<kebab>.context.ts`・`<kebab>.<対象>.context.ts`) と公開ヘルパー (`<kebab>.utils.ts`) も再輸出します。
- `index.ts` は実装を書かず、parts → 合成の順に再輸出します。
- バレルの再輸出は Context → パーツツリー → 公開ヘルパーの順に並べます。文と指定子の最終的な順序は自動整形に任せます。
- 自ファイルの import には `.js` / `.jsx` を付けます。他コンポーネントもパーツ同士も相対で import します。

```ts
// <kebab>.parts.ts
import "./<kebab>.css";

export * from "./<kebab>.context.js";
export * from "./<kebab>.<対象>.context.js";
export * from "./<kebab>.root.jsx";
export * from "./<kebab>.content.jsx";
export * from "./<kebab>.utils.js";
```

```ts
// index.ts
export * from "./<kebab>.parts.js";
export * from "./<kebab>.js";
```

```tsx
import { XIcon } from "../_icons.jsx";
```

## パーツファイルの土台

### import と構成

- import / export の文と指定子、`src/index.ts` の順は規定しません。フォーマッターに任せます。
- CSS の import はバレルだけが行います。パーツファイルでは import しません。
- パーツをまたぐ参照は、参照する側のパーツファイルから相対で import します (例: `import { ButtonContext } from "./button.context.js";`)。ファイル内部では正式名を使い、短名を使いません。
- 型だけを import する場合は `import type { X } from "..."` にします。値と型が混ざる場合だけ `import { type X, value }` にします。
- 旧 `.parts.tsx` にあった `// <名>` のセクション見出しは不要です。ファイルそのものが 1 パーツを表します。
- `.tsx` (合成) の見出しは同様です (`// Types` / `// API` / `// Component` と同文字数の `-`)。

### Base UI の型確認

各パーツを書く前に `node_modules/@base-ui/react/<コンポーネント>/` の `.d.ts` を開きます。

1. `<パート>/*.d.ts` の namespace が公開する型を列挙します。`State`・`Props` のほか、`Actions`・`ChangeEventDetails`・`ChangeEventReason` があれば含めます。
2. 公開メンバーは漏らさず再輸出します。`State` と `Props` だけでは終えません。
3. `Handle` / `createHandle` の有無を確認します。ないものは作りません。あるものは `<kebab>.handle.ts` に置きます。
4. 他から再輸出のパーツ (例: `Separator`) は `index.parts.d.ts` と `index.d.ts` で実体と型の両方を確認します。
5. 各パーツの `State` フィールドを列挙し、状態クラス化の対象を決めます。`State` にない状態は扱いません。

### Context 定型

子に値を渡す場合のみ、独立した `<kebab>.context.ts` に置きます。`ComboboxContext` を例とします。`Stat` のように Root の修飾が Root 自身に集約し子が読まない場合は Context ファイルを作りません。

- Context の値型は `readonly` フィールドのオブジェクトにし、汎型は既定値付き (`<TItem = any>`) にします。各フィールドに JSDoc を付けます。
- 修飾値型 (`Color`・`Radius`・`Size`・`Variant`・`IItemToStringLabel` など) は Context ファイルに分離し、JSDoc を付けます。`Color`・`Size` はテーマ型をそのまま使い (`Color`、`Size`)、`Radius` は `"none" | Size | "full"` の定型にします。
- フック型は `IUseContext` 継承の interface にオーバーロードを足します。実装は `useSui...` 名で、`React.use()` + `ContextMissingError` にします。短名の再輸出も同じファイルに置きます。

```tsx
export type ComboboxContext<TItem = any> = {
  /**
   * フォーカス時に枠線へ適用する配色です。
   */
  readonly color: ComboboxContextColor;
  // ...items・itemToStringLabel・multiple・outlined・radius・size・variant
};

export const ComboboxContext: React.Context<ComboboxContext | null> =
  React.createContext<ComboboxContext | null>(null);

export interface IUseComboboxContext extends IUseContext<ComboboxContext> {
  <TItem = any>(optional?: false): ComboboxContext<TItem>;
  <TItem = any>(optional?: boolean): ComboboxContext<TItem> | null;
}

export const useComboboxContext: IUseComboboxContext = function useSuiComboboxContext(
  optional?: boolean,
): any {
  const ctx = React.use(ComboboxContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxContext",
      providerName: "ComboboxRoot",
    });
  }

  return ctx;
};

export { ComboboxContext as Context, useComboboxContext as useContext };

export namespace Context {
  export type Color = ComboboxContextColor;
  export type IItemToStringLabel<TItem = any> = IComboboxContextItemToStringLabel<TItem>;
  export type Radius = ComboboxContextRadius;
  export type Size = ComboboxContextSize;
  export type Variant = ComboboxContextVariant;
}
```

- 別名の `type` / `const` 宣言を足しません。再輸出行に JSDoc は付けません。
- ローカル変数は `ctx` に統一します。読み取りと `useMemo` で同じ名前にします。

```tsx
const ctx = React.use(XxxContext);
const ctx = React.useMemo<XxxContext>(() => ({ ... }), [...]);
```

- 一部のキーだけ上書きして子へ伝える派生コンテキストは `useMemo` + スプレッドにします。意図が分かる範囲で上書きキーを最小化し、横に意図注釈を残します (例: `InputGroup` の `size/color/radius/variant`、`Chip` の `radius`、`Popup` の `outlined`、`Group` の `items` など)。

```tsx
const ctx = useComboboxContext();
const {
  size = ctx.size,
  color = ctx.color,
  radius = ctx.radius,
  variant = ctx.variant,
  // ...
} = props;
const childCtx = React.useMemo<ComboboxContext>(
  () => ({ ...ctx, size, color, radius, variant }),
  [ctx, size, color, radius, variant],
);

return (
  <ComboboxContext value={childCtx}>
    ...
  </ComboboxContext>
);
```

- `Group` のように上位透過を遮断する場合は、未指定でも上書きする意図をコメントで残します。
- namespace には値型があれば追加します。
- 短名再輸出は束縛を作りません。ファイル内部 (JSX 含む) は正式名のままにします。
- 他パーツが内部フック (`useSuiXxxContext`) を使いたい場合は、公開済みの `useXxxContext` を相対 import します。内部フックは export しません。
- ルート以外の Context (`ComboboxItemContext`・`AccordionTriggerContext` を例とします) は値伝播やパーツ状態用の型にし、短名は対象名に合わせます (`ItemContext` / `useItemContext`、`TriggerContext` / `useTriggerContext`)。ルート以外で `Context` / `useContext` を使いません。オーバーロード関数 + `IUseContext` 別名の形も許容します。

### State の継承

スタイル情報 (`size`・`radius`・`separator` など) は Context に置き、`State` へ合成して子パーツへ伝播します。`card` と `accordion` を例とします。

- ルートの `State` は Context の値型をそのまま使います (`CardRootState = CardContext`)。Base UI のルートは `Override<Context, BaseUI.State>` で合成します (`AccordionRootState<TValue> = Override<AccordionContext, Accordion.Root.State<TValue>>`)。
- 子パーツの `State` は上位パーツの `State` と同じにするか、独自の Base UI の `State` がある場合は `Override<上位Context, BaseUI.State>` で拡張します (`CardTitleState = CardHeaderState`、`AccordionHeadingState = Override<AccordionItemContext, Accordion.Header.State>`)。
- パーツ独自の Suru UI の状態は `Override` を入れ子にして足します。交差 (`&`) で足しません (`AccordionTriggerState = Override<Override<AccordionItemContext, Accordion.Trigger.State>, { unstyled: boolean }>`)。
- 素の要素の子は Context を読み、`useRender` の `state` にそのまま渡します (`const ctx = useCardContext(); ... state: ctx`)。Base UI ラッパーの子は `proxyRenderProps` で合成します。Context が先、Base UI の `state` が後です (`(state) => ({ ...ctx, ...state })`)。
- 子が読む Context は、そのパーツが必ず置かれる範囲のものにします (`AccordionIndicator` は Trigger の中にあるとは限らないため `TriggerContext` ではなく `ItemContext` を読みます)。
- Context の値型は対応する `State` の `Readonly` 別名にします (`AccordionTriggerContext = Readonly<AccordionTriggerState>`)。

### フックラッパー定型

Base UI フックの薄いラッパーは `useSui...` 名の関数にし、短名を同ファイルで再輸出します。`combobox.use-filter.ts` / `combobox.use-filtered-items.ts` を例とします。

```ts
export type IComboboxFilter = ReturnType<typeof Combobox.useFilter>;
export type IUseComboboxFilterOptions = NonNullable<Parameters<typeof Combobox.useFilter>[0]>;

export interface IUseComboboxFilter {
  (options?: IUseComboboxFilterOptions): IComboboxFilter;
}

export const useComboboxFilter: IUseComboboxFilter = function useSuiComboboxFilter(options) {
  return Combobox.useFilter(options);
};

export { useComboboxFilter as useFilter };
```

### 型の置き方

1 パーツ内は Base UI 由来、独自の値型、`Value`・`State`、`Props` の順にします。`Props` を最後にします。`combobox.root.tsx` を例とします。

- `State` は Base UI から取ります。スタイル情報を伝播する場合は Context と合成します (`State の継承` を参照)。状態を持たない素の要素・非要素は空オブジェクト (`= {}`) にします (`ComboboxCollectionState`・`ComboboxItemLabelState` を参照)。
- 型引数名は必ず `T` 始まりにします (`TItem`・`TValue`・`TMultiple`)。複数選択の有無は `TMultiple extends boolean | undefined` にし、合成の公開面では `const` 修飾子を付けます (`<TItem = any, const TMultiple extends boolean | undefined = ...>`)。
- テーマ由来の修飾値型はテーマ型をそのまま使います (`Color = Color`、`Size = Size`)。`Radius` は `"none" | Size | "full"` の定型にします。テーマにない独自の修飾値型だけ union リテラルにし、各値を箇条書きで説明します。

```ts
/**
 * コンボボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxRootVariant = "naked" | "liquid";
```

- 別 prop に連動する既定値は `@default` を付けず参照先を示します (例: `既定値は {@link ComboboxRootProps.size|size}`)。独自 props のキー順は自動整形に任せます。
- コメント `// Base UI の型を確認して取り出すプロパティーを決めます。` の次の行は、確認した実際の型名にします (`// ComboboxRootProps:`)。コピペのまま別名 (`// AriaCombobox.Props:` など) を残しません。

## Props 分解

### 4 区分

`Props` は namespace で 4 区分に分け、`&` で結合します。

| 区分     | 内容 | 型の形 |
| -------- | ---- | ------ |
| `Render` | 状態を持つ props | `RenderProps<State>` |
| `SuruUI` | Suru UI 独自 props。JSDoc はここだけに書く | オブジェクト |
| `BaseUI` | Base UI 由来 props。Base UI ラッパーは明示列挙の `Pick`、素の要素は `{}` | `Pick<..., Exclude<...>>` / `{}` |
| `HTML`   | 同じ型からの残余 | `Omit<..., keyof Render \| keyof SuruUI \| keyof BaseUI>` |

- `Render` / `SuruUI` / `BaseUI` / `HTML` 自体に JSDoc を付けません。区分の並び順は自動整形に任せます。
- 結合した `Props` 本体には `/** {@link Xxx} に渡す props です。 */` を残します。
- 他コンポーネントの型を参照する場合は、そのコンポーネントが公開する短名 namespace を使い、型名にコンポーネント名を重ねません (`Card.CardRootProps.SuruUI` ではなく `Card.Root.Props.SuruUI`、`Card.CardRootState` ではなく `Card.Root.State`)。基点になるコンポーネントの `Props` 全体が要る場合 (例: ToggleButton が Button を包む) も `Button.ButtonRootProps` ではなく `Button.Root.Props` を参照します。
- HTML 属性と衝突する名は避け、別名にします (例: `title` と区別する `htmlTitle`)。

### テンプレート A: 素の要素

`ComboboxInput` を例とします。

```tsx
export namespace ComboboxInputProps {
  export type Render = RenderProps<ComboboxInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxInputProps:
      "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}
```

- `BaseUI` がなくても `= {}` を残します。`HTML` の `| keyof BaseUI` を省略しません。
- `HTML` は `React.ComponentProps<"xxx">` ではなく `BaseUIComponentProps<"xxx", never, never>` から取ります。要 `import type { BaseUIComponentProps } from "@base-ui/react/internals/types"` です。
- DOM を描画しない非要素 (`Collection` の `ComboboxCollectionState = {}` を参照) は `Render = {}`・`BaseUI` の強化なし・`HTML = {}` にします。`children` にレンダラー型を持たせる場合はテンプレート D にします。

### テンプレート B: Base UI ラッパー

`ComboboxPopup` を例とします。

```tsx
export namespace ComboboxPopupProps {
  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPopupProps:
      | "initialFocus"
      | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;

  export type Render = RenderProps<ComboboxPopupState>;

  export type SuruUI = {
    /**
     * ポップアップ内の入力欄の配置を指定します。
     *
     * 入力欄を内包しないポップアップでは無視されます。
     *
     * @default "start"
     */
    inputPosition?: ComboboxPopupInputPosition | undefined;

    /**
     * ポップアップに枠線を表示するかどうかを指定します。
     *
     * 省略時はコンテキストの `outlined` を使います。
     */
    outlined?: boolean | undefined;
  };
}
```

- `BaseUI` は `Omit` で残余を取るのではなく、`Pick` + `Exclude` で取り出すキーを明示列挙します。列挙前に Base UI の `.d.ts` を確認し、どのキーを取り出すか決めます。根拠コメントを残します。
- `HTML` はタグ (`React.ComponentProps<"xxx">`) ではなく、同じ Base UI コンポーネントの残余です。`keyof Render | keyof SuruUI | keyof BaseUI` で除きます。
- 取り出すキーがない場合も `Exclude<never, keyof Render | keyof SuruUI>` の `Pick` にします。`{}` や `Omit` にしません (`ComboboxInputGroup` の `never` を参照)。
- 独自 props がなくても `SuruUI = {}` を残します。`keyof SuruUI` が `never` でも `Exclude` / `Omit` から除きません。将来の追加漏れを防ぐためです。
- Context 値へフォールバックする独自 prop は「省略時は...を使います。」と JSDoc に明記します (`size = ctx.size` などの実装と対応させます)。

### テンプレート C: 汎型

`ComboboxRoot` を例とします。テンプレート B に汎型を足した形です。

```tsx
export namespace ComboboxRootProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: ComboboxRootColor | undefined;

    /**
     * リストに表示する項目の一覧です。
     *
     * グループの配列を指定するとグループごとに区切って表示します。
     */
    items?: readonly TItem[] | undefined;
    // ...outlined・radius・size・variant
  };

  export type BaseUI<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Pick<
    React.ComponentProps<typeof Combobox.Root<TItem, TMultiple>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxRootProps:
      | "children"
      | "name"
      // ...以下、取り出すキーを列挙
      | "value"
      | "onValueChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> = Omit<
    React.ComponentProps<typeof Combobox.Root<TItem, TMultiple>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}
```

### テンプレート D: `children` 型強化 (レンダラー受け)

`ComboboxCollection` / `ComboboxList` / `ComboboxValue` を例とします。Base UI の `children` をレンダラー型で強化する場合です。

```tsx
export namespace ComboboxCollectionProps {
  export type Render = {};

  export type SuruUI = {
    /**
     * グループの末尾に区切り線を表示するかどうかを指定します。
     *
     * 既定レンダラーを使うときにだけ適用されます。
     */
    separator?: boolean | undefined;
  };

  export type BaseUI<TItem = any> = Override<
    Pick<
      React.ComponentProps<typeof Combobox.Collection>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // ComboboxCollectionProps:
        "children",
        keyof Render | keyof SuruUI
      >
    >,
    // Base UI の型を強化します。
    {
      children?: IComboboxCollectionItemRenderer<TItem> | undefined;
    }
  >;

  export type HTML = {};
}
```

- `List` は `children?: React.ReactNode | IComboboxListItemRenderer<TItem>` にし、`IComboboxListItemRenderer` は `IComboboxCollectionItemRenderer` の別名にします。
- `Value` は `children?: React.ReactNode | IComboboxValueRenderer<TItem, TMultiple>` にし、DOM を描画しないため `Render = {}`・`SuruUI = {}`・`HTML = Omit<...>` にします。
- `ItemLabel` のように Base UI を持たないレンダラー専用パーツは `Render = {}`・`BaseUI = {}`・`HTML = {}` にし、`SuruUI` に `children?: IComboboxItemLabelRenderer<TItem> | undefined` だけを持たせます。

### 例外: render 関数を `children` に付け替える場合

`ComboboxTrigger` を例とします。Base UI の `render` を利用者の `children` として受けたい場合のみ使います。

```tsx
export namespace ComboboxTriggerProps {
  export type Render = Omit<RenderProps<ComboboxTriggerState>, "render">;

  export type SuruUI = {
    children: NonNullable<RenderProps<ComboboxTriggerState>["render"]>;
  };
  // ...BaseUI・HTML は通常通り
}
```

- 実装は `<Combobox.Trigger {...otherProps} render={children} ... />` にします。
- JSDoc には `children` が render 関数である旨を明記します。`SelectTrigger` のような通常 `children` との不一致を放置しません。

## 継承パターン

`Outer` の Base UI (`Combobox.Item` など) の `render` 内で `Inner` の Suru UI (`Button.Root` など) を描画する場合です。`ComboboxItem` を例とします。

### 型

- `State`: `Override<Inner.State, Outer.State>` にします (`Override<Button.Root.State, Combobox.Item.State>`)。
- `SuruUI`: 継承しない場合は `{}` のままにします。`Inner` の `SuruUI` から継承する場合は全部要るときだけ代入し、不要キーだけ `Omit` します。一部だけ要る場合は必要なキーだけ定義します。
- `BaseUI`: `Override<Inner.BaseUI, Override<Pick<Outer, ...>, 強化>>` にします。`Outer` が勝ちます。`value` のように型を強化するキーは内側の `Override` で上書きします (`{ value?: TValue }`)。
- `HTML`: 通常通り `Omit<Outer, keyof Render | keyof SuruUI | keyof BaseUI>` にします。
- `Outer` の状態から求める `Inner` の `HTML` prop が要る場合 (例: `state.disabled` → `disabled`) は、型に `Pick<Inner.HTML, "disabled">` を交差させて同じオブジェクトに入れます。

```tsx
export namespace ComboboxItemProps {
  export type Render = RenderProps<ComboboxItemState>;

  export type SuruUI = {};

  export type BaseUI<TValue = any> = Override<
    Button.Root.Props.BaseUI,
    Override<
      Pick<
        React.ComponentProps<typeof Combobox.Item>,
        Exclude<
          // Base UI の型を確認して取り出すプロパティーを決めます。
          // NonNativeButtonProps:
          | keyof NonNativeButtonProps
          // ComboboxItemProps:
          | "children"
          | "onClick"
          | "index"
          | "value"
          | "disabled",
          keyof Render | keyof SuruUI
        >
      >,
      {
        value?: TValue;
      }
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}
```

### 実装手順

1. `props` から `Inner` の `SuruUI` キー、`Render` のすべて (`style`・`render`・`className`)、共有の `BaseUI` キーを分解し、残りを `...otherProps` にします。`render` の既定値は内包先の既定要素にします (`render = <div />`)。
2. `Outer` 独自の `BaseUI` (`baseuiProps: Required<Own.BaseUI>`) を `Outer` に `{...otherProps} {...baseuiProps}` で渡します。共有キーがなければ作りません。
3. `Inner` 独自の `SuruUI + BaseUI` (`innerProps: Required<Inner.SuruUI & Inner.BaseUI>` または `buttonRootProps`) を `mergeProps` の第 2 要素にします。除外交差したキーは `undefined` を明示します。`Outer` の状態から求める値はここで埋めます (`disabled: state.disabled`)。
4. `Outer` の `render` で `Inner` を描画し、`proxyRenderProps` には `Render` をすべて渡します。`mergeProps` の順序 (`htmlProps` → `innerProps` → `proxyRenderProps` 結果) は変えません。
5. 項目値を子孫へ伝える場合は `ComboboxItemContext` のようなサブコンテキストに `value` を入れて包みます。

- どちらの props オブジェクトも `Required` を省略しません。漏れ防止のためです。
- 公開しない `Inner` の `SuruUI` キーは内包先オブジェクト側で埋めます (固定値・`ctx` 値・`undefined` のいずれか)。
- `Outer` の状態から求める `Inner` の `HTML` prop が要る場合 (例: `state.disabled` → `disabled`) は、型に `Pick<Inner.HTML, "disabled">` を交差させて同じオブジェクトに入れます。

```tsx
export const ComboboxItem: IComboboxItem = function SuiComboboxItem(props: ComboboxItemProps) {
  const ctx = useComboboxContext();
  const {
    index,
    style,
    value,
    render = <div />,
    onClick,
    children,
    disabled,
    className,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<ComboboxItemProps.BaseUI> = {
    index,
    value,
    onClick,
    children,
    disabled,
    nativeButton,
    focusableWhenDisabled,
  };
  const itemCtx = React.useMemo<ComboboxItemContext>(() => ({ value }), [value]);

  return (
    <ComboboxItemContext value={itemCtx}>
      <Combobox.Item
        {...otherProps}
        {...baseuiProps}
        render={(htmlProps: {}, state) => {
          const buttonRootProps: Required<
            Button.Root.Props.SuruUI &
              Button.Root.Props.BaseUI &
              Pick<Button.Root.Props.HTML, "disabled">
          > = {
            item: true,
            size: ctx.size,
            color: "grey",
            muted: undefined,
            radius: undefined,
            pending: undefined,
            squared: undefined,
            variant: "naked",
            disabled: state.disabled,
            outlined: undefined,
            nativeButton,
            focusableWhenDisabled,
          };

          return (
            <Button.Root
              {...mergeProps<typeof Button.Root>([
                htmlProps,
                buttonRootProps,
                proxyRenderProps(state, {
                  style,
                  render,
                  className: cn(
                    className,
                    "sui_combobox_item",
                    (state) => state.disabled && "sui_combobox_item-disabled",
                    (state) => state.selected && "sui_combobox_item-selected",
                    (state) => state.highlighted && "sui_combobox_item-highlighted",
                  ),
                }),
              ])}
            />
          );
        }}
      />
    </ComboboxItemContext>
  );
};
```

## パーツ実装

### 宣言と分割代入

```tsx
export const ComboboxInput: IComboboxInput = function SuiComboboxInput(props) {
```

- `IComponent` 以外の関数型を使いません。実装名の `Sui` 接頭辞を省略しません。フックラッパーは `useSui...` 名にします。
- 汎型パーツは `IComponent` 継承の interface に callable を足します。`const` が要る型引数 (`TMultiple`) は呼び出し側に付けます。

```tsx
export interface IComboboxRoot extends IComponent<ComboboxRootProps> {
  <TItem, const TMultiple extends boolean | undefined = false>(
    props: ComboboxRootProps<TItem, TMultiple>,
  ): IComponent.Return;
}
```

- 分割代入は独自 props (既定値付き) → HTML 既定値付き (`aria-label`・`aria-hidden`・`role`・`nativeButton` など) → `className` → `data-scope` → 残余の順にします。他 prop を既定値にできます (例: `radius = size`)。Context へフォールバックする場合は `size = ctx.size` の形にします。
- 残余は末尾に置きます。既定値が他 prop を参照するものは参照先の後に置きます。キーの並び順は自動整形に任せます。

```tsx
const {
  size = "md",
  color = "grey",
  radius = size,
  variant = "liquid",
  outlined = false,
  className,
  // @ts-expect-error
  "data-scope": dataScope = "",
  ...otherProps
} = props;
```

- `data-scope` は CSS の `@scope` 始点 (スタイル起点) だけが持ちます。`// @ts-expect-error` + 空文字既定にします。余剰プロパティーチェックを避ける必要がある場合 (合成 API の `getScrollAreaProps` を参照) は `null` 既定 + 変数経由にします。
- ボタン系の既定値は `nativeButton = false`、`aria-label` (例: `"候補リストを開閉"`、`"選択値を消去"`)、`children = <ClearIcon />` (共有 `../_icons.jsx` から import) の形にします。

### Root 定型 (DOM を持たない場合)

`ComboboxRoot` を例とします。Root 自身が HTML 要素を描画しない場合は、Config + Context 提供に徹し、スタイルは子 (例: InputGroup / Portal などスタイル起点となる子) に持たせます。

```tsx
export const ComboboxRoot: IComboboxRoot = function SuiComboboxRoot(props: ComboboxRootProps) {
  const config = React.use(Config);
  const {
    size = "md",
    color = "grey",
    items,
    radius = size,
    variant = "liquid",
    disabled = false,
    multiple = false,
    outlined = false,
    readOnly = false,
    required = false,
    itemToStringLabel = defaultItemToStringLabel,
    itemToStringValue = defaultItemToStringValue,
    ...otherProps
  } = props;
  const ctx = React.useMemo<ComboboxContext>(
    () => ({
      size,
      color,
      items,
      radius,
      variant,
      multiple,
      outlined,
      itemToStringLabel,
    }),
    [size, color, items, radius, variant, multiple, outlined, itemToStringLabel],
  );

  return (
    <config.Context
      size={size}
      color={color}
      radius={radius}
      variant={variant}
      disabled={disabled}
      outlined={outlined}
      readOnly={readOnly}
      required={required}
    >
      <ComboboxContext value={ctx}>
        <Combobox.Root
          {...otherProps}
          items={items}
          disabled={disabled}
          multiple={multiple}
          readOnly={readOnly}
          required={required}
          itemToStringLabel={itemToStringLabel}
          itemToStringValue={itemToStringValue}
        />
      </ComboboxContext>
    </config.Context>
  );
};
```

- `items`・`disabled`・`multiple` など Base UI へ渡す主要 props は明示列挙で渡し直します。残余任せにしません。

### Root 定型 (DOM を持つ場合)

`AccordionRoot` を例とします。Root 自身が HTML 要素を描画する場合は、Root が `data-scope` 起点になり、修飾 (`size`・`radius`・`separator` など) を Context として子へ伝え、状態クラスを自身に集約します。子が修飾を読まない場合は Context を作りません (`Stat`)。

```tsx
const {
  size = "md",
  items = [],
  style,
  radius = "none",
  render,
  children = defaultItemRenderer,
  className,
  separator = false,
  // @ts-expect-error
  "data-scope": dataScope = "",
  ...otherProps
} = props;
const ctx = React.useMemo<AccordionContext>(
  () => ({ size, radius, separator }),
  [radius, separator, size],
);

return (
  <AccordionContext value={ctx}>
    <Accordion.Root
      {...otherProps}
      {...proxyRenderProps<Accordion.Root.State, AccordionRootState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AccordionRootState>(
            className,
            "sui_accordion",
            (state) => `sui_accordion-size_${state.size}`,
            (state) => `sui_accordion-radius_${state.radius}`,
            (state) => state.separator && "sui_accordion-separator",
            (state) => state.disabled && "sui_accordion-disabled",
          ),
        },
      )}
      data-scope={dataScope}
    >
      {typeof children === "function" ? items.map(children) : children}
    </Accordion.Root>
  </AccordionContext>
);
```

- `render`・`style`・`className` を分解し、`className` とまとめて `proxyRenderProps` に渡します。状態に含まれる値のクラス名はクロージャー変数ではなく state 関数 (`(state) => state.size`) で作ります。
- Context の提供は Base UI のルート要素の外側に置きます。Context を `state` に合成するため、`(state) => ({ ...ctx, ...state })` を `proxyRenderProps` に渡します。
- グローバルな設定コンテキスト (`config.Context`) へも `size`・`radius` を提供する場合は、独自 Context の提供と併用します (`CardRoot`)。
- 汎型は `TItem` (表示対象) と `TValue` (項目値) の 2 軸にし、公開面は `<TItem = never, TValue = $InferItemObjectValue<TItem>>` で値型を推論します。`TMultiple` を持つ `ComboboxRoot` と混同しません。
- `children` が関数のときだけ `items.map(children)` し、それ以外はそのまま描画します。既定値は `defaultItemRenderer` にします。
- `Radius` はテーマに `full` が要らない形状では `"none" | Size` にします。`"none" | Size | "full"` の定型と混同しません。

### 描画の選び方

| 対象 | 手段 | 備考 |
| ---- | ---- | ---- |
| Base UI ラッパー | JSX で包む | `useRender` を使わない |
| 素の要素 | `useRender` | JSX 直書きしない |

- `render` 受領型は `render={children}` に渡します。
- 独自なしの素要素は引数ごと渡します。既定子ありは `children` に既定値を与えます (`accordion.indicator.tsx` の `children = <ChevronIcon />` を参照)。

### Base UI ラッパーの state 合成

Base UI のラッパーで Context のスタイル情報を `State` に合成する場合の定型です。`AccordionItem` を例とします。

```tsx
export const AccordionItem: IAccordionItem = function SuiAccordionItem(props) {
  const ctx = useAccordionContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Accordion.Item
      {...otherProps}
      {...proxyRenderProps<Accordion.Item.State, AccordionItemState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AccordionItemContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AccordionItemContext>
          ),
          className: cn<AccordionItemState>(
            className,
            "sui_accordion_item",
            (state) => state.open && "sui_accordion_item-open",
          ),
        },
      )}
    />
  );
};
```

- `render`・`style`・`className` の 3 つを分解し、`proxyRenderProps` の戻り値を Base UI へ展開します。残余へ残しません。
- 合成関数は `(state) => ({ ...ctx, ...state })` にします。Context が先、Base UI の `state` が後です。`unstyled` のような独自フラグは末尾に足します (`(state) => ({ ...ctx, ...state, unstyled })`)。
- 子孫へ Context を提供する場合は、`render` を関数にして `RenderElement` を包みます (`defaultTagName` は Base UI の既定要素)。提供しない場合は `render` をそのまま渡します (`AccordionHeading`)。
- 子パーツの `State` 型は `Override<上位Context, BaseUI.State>` にします (`State の継承` を参照)。
- クラス名はマージ後の state で作ります。クロージャー変数を使いません。

### useRender 定型

素の要素を作る場合のみ使います。`accordion.indicator.tsx` を例とします。

利用者の `className` は分解せず残余に残し、自動マージに任せます。`cn` に含めません。

修飾あり:

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

修飾なし + HTML 既定値あり:

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

`useRender` を使わない場合の `cn` は次の順にします。利用者の `className` を先頭に置き、上書きしません。`ComboboxInputGroup` を例とします。

```tsx
cn(
  className,
  "sui_combobox",
  `sui_combobox-size_${size}`,
  `sui_combobox-color_${color}`,
  `sui_combobox-radius_${radius}`,
  `sui_combobox-variant_${variant}`,
  childCtx.outlined && "sui_combobox-outlined",
  (state) => state.disabled && "sui_combobox-disabled",
  (state) => state.touched && "sui_combobox-touched",
  (state) => state.dirty && "sui_combobox-dirty",
  (state) => state.valid === false && "sui_combobox-invalid",
  (state) => state.valid === true && "sui_combobox-valid",
  (state) => state.valid === null && "sui_combobox-unverified",
  (state) => state.filled && "sui_combobox-filled",
  (state) => state.focused && "sui_combobox-focused",
  (state) => state.open && "sui_combobox-open",
  (state) => state.readOnly && "sui_combobox-readonly",
  (state) =>
    state.popupSide !== null &&
    `sui_combobox-popupside_${state.popupSide.replaceAll("-", "_")}`,
  (state) => state.listEmpty && "sui_combobox-listempty",
  (state) => state.placeholder && "sui_combobox-placeholder",
)
```

- 3 値 (`valid === false/true/null`) のように肯定・否定の両側が要る状態は等価比較でクラス化します。
- `popupSide` のようにケバブを含む状態値は `replaceAll("-", "_")` でスネーク化します。
- `proxyRenderProps` で Context を state に合成するパーツでは、修飾クラスをクロージャー変数でなく state 関数で作ります (`(state) => \`sui_accordion-size_${state.size}\`、`(state) => state.separator && "sui_accordion-separator"`)。真偽値も `(state) => state.unstyled && ...` にします。

## 状態と見た目の集約

### 4 原則

1. `data-scope=""` は CSS の `@scope` 始点 (スタイル起点) だけに付けます。付け忘れ・付け過ぎの両方を避けます。Root が DOM を持たない場合はスタイル起点となる子 (例: InputGroup / Portal / TriggerLabel) が起点になります。
2. 状態クラスはスタイル起点の要素に集約します。分散させません。Root が DOM を持たない場合の起点は対象のコンポーネントが定めます (例: 入力系の状態を持つ InputGroup とポップアップ系の修飾を持つ Portal)。
3. SuruUI 由来の値・フラグ・バリアントは原則として最上位の `SuruUI` に集約し、Context で子へ伝えます。Context の値は `State` に合成し、`render`・`className`・`style` から読めるようにします (スタイル情報の state 化。`State の継承` を参照)。ただし独立装飾を持つ子 (例: `color/radius/variant` を持つ Chip、`outlined/inputPosition` を持つ Popup、`radius` を持つ ChipRemove など) は、Context フォールバック付きの独自 `SuruUI` + 自身要素への修飾クラスを許します (`color = ctx.color` + `sui_combobox_chip-color_${color}` を例とします)。同名 prop の二重管理にならないよう、フォールバック元を JSDoc に明記します。
4. Base UI の `data-*` 属性を CSS セレクターに使いません (`[data-scope]` を除く)。状態装飾は `cn` の状態関数による自前クラスで行います。

真偽状態は `sui_<基底>-<状態>`、値付き状態は `sui_<基底>-<属性>_<値>` にします。

```tsx
cn(
  className,
  "sui_combobox_item",
  (state) => state.disabled && "sui_combobox_item-disabled",
  (state) => state.selected && "sui_combobox_item-selected",
  (state) => state.highlighted && "sui_combobox_item-highlighted",
);
```

- 対象は Base UI `State` のフィールドに限ります。`State` にない参照は型エラーになり、対応する `data-*` も発行されないため CSS が死にます。偽側が必要なら否定でクラス化します。
- 例外は次の 3 つだけです。Portal で Root が DOM 上のルートでない場合、子が独立した状態を持つ場合 (例: Item ごとの `-disabled`・`-selected`・`-highlighted`)、兄弟要素のため祖先から届かない場合 (例: TriggerLabel の `-disabled` は自身の起点で判定) は、その状態を持つ要素・起点に付けます。
- 重複状態は起点の 1 箇所のみに付けます。下位は祖先セレクターで装飾します。
- 子の見た目切替は起点自身の修飾クラスを祖先セレクターで受けます (例: `&.sui_combobox-size_sm`)。起点が Portal で修飾対象が子孫の場合は `&:has(...)` を使います (例: `&:has(.sui_combobox_popup-inputposition_top)`)。子の見た目切替のためだけに新規 `Context` を作りません (既存 Context の派生提供は除きます)。スタイル情報を `State` として子パーツへ伝える Context (`AccordionContext` など) はこれに当たりません。

## 一覧描画

`items` の所有は Root に集約し、描画側 (`Collection`・`List`・`Value`) はレンダラー (`children`) のみを受けます。`ComboboxCollection` / `ComboboxList` / `ComboboxValue` / `ComboboxItemLabel` を例とします。

- `items` を二重に持たせません。描画側は `items` を持たず、`Context` (`ctx.items`・`ctx.itemToStringLabel`) から読みます。`Group` のように透過を遮断する意図がある場合のみ、未指定でも上書きする旨をコメントで残します。
- レンダラー型は用途ごとに定義し、別名で再利用します。

```tsx
export interface IComboboxCollectionItemRenderer<TItem = any> {
  (item: TItem, index: number): React.ReactNode;
}

export type IComboboxListItemRenderer<TItem = any> = IComboboxCollectionItemRenderer<TItem>;

export type ComboboxValueType<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = Exclude<Combobox.Root.Props<TItem, TMultiple>["value"], null | undefined>;

export interface IComboboxValueRenderer<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> {
  (selectedValue: ComboboxValueType<TItem, TMultiple>, context: ComboboxContext<TItem>): React.ReactNode;
}

export interface IComboboxItemLabelRenderer<TItem = any> {
  (item: TItem): IComponent.Return;
}
```

- 既定レンダラーは `switch (true)` + 型ガードの順 (`isItemGroup` → `isLabeledItem` → `isPrimitiveItem` / `!isReactNode` → `default`) にします。キーは `getItemKey(item) ?? index` にします。グループ子孫は `<ComboboxCollection>{defaultItemRenderer}</ComboboxCollection>` の形で再帰させます。

```tsx
const defaultItemRenderer: IComboboxCollectionItemRenderer = (item, index) => {
  switch (true) {
    case isItemGroup<ComboboxRootItemGroup>(item): {
      const { label, ...otherProps } = item;

      return (
        <ComboboxGroup {...otherProps} key={getItemKey(item) ?? index}>
          {isLikelyVisibleNode(label) && <ComboboxGroupLabel>{label}</ComboboxGroupLabel>}
          <ComboboxCollection>{defaultItemRenderer}</ComboboxCollection>
          {separator && <ComboboxSeparator />}
        </ComboboxGroup>
      );
    }

    case isLabeledItem<ComboboxRootItemLabeledValue>(item): {
      const { label, ...otherProps } = item;

      return (
        <ComboboxItem {...otherProps} key={getItemKey(item) ?? index} value={item}>
          {label}
          <ComboboxItemIndicator />
        </ComboboxItem>
      );
    }

    case isPrimitiveItem(item):
    case !isReactNode(item):
      return (
        <ComboboxItem key={getItemKey(item) ?? index} value={item}>
          {ctx.itemToStringLabel(item)}
          <ComboboxItemIndicator />
        </ComboboxItem>
      );

    default:
      return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
  }
};

const { children = defaultItemRenderer, separator = false } = props;

return <Combobox.Collection>{children}</Combobox.Collection>;
```

- `Value` の関数子は第 2 引数に `ctx` を渡して橋渡しします。

```tsx
return (
  <Combobox.Value {...otherProps}>
    {typeof children === "function" ? (selectedValue) => children(selectedValue, ctx) : children}
  </Combobox.Value>
);
```

- `ItemLabel` のように `value` をサブコンテキストから読む表示専用パーツは、`children = ctx.itemToStringLabel` を既定レンダラーにし、`children(itemCtx.value)` を直接返します。
- `GroupLabel` のように可視判定が要る取得系は `isLikelyVisibleNode` で判定し、駄目なら `null` を返します。`mergeProps([baseProps, otherProps, { children: label }])` の順にします。
- 判定関数 (`isItemGroup`・`isLabeledItem`・`isPrimitiveItem`・`isReactNode`・`isLikelyVisibleNode`) は共有 `../_item.js` などから import し、再定義・公開しません。

### Root 内 `items` レンダラー

`AccordionRoot` を例とします。描画先が独立パーツを持たない単純な一覧では、`Collection`・`List` に分けず Root の `SuruUI` に `items` と関数 `children` を持たせます。

```tsx
export type AccordionRootItemObject = Omit<AccordionItemProps, "title"> & {
  readonly content: React.ReactNode;
  readonly title: React.ReactNode;
  readonly htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
};

export interface IAccordionRootItemRenderer<TItem = any> {
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}
```

- レンダラー型は `(item, index, items) => React.ReactNode` にし、`interface` で定義します。`Value` のように第 2 引数へ `ctx` 渡しはしません。
- 項目オブジェクト型は `Omit<ItemProps, "title">` を土台に `title`・`content` (`React.ReactNode`) を必須化し、HTML 属性と衝突する名は `htmlTitle` にします。
- 値型の推論は `_<kebab>.tsx` に `$InferItemObjectValue<TItem>` として置き、公開面は `<TItem = never, TValue = $InferItemObjectValue<TItem>>` にします。
- 判定は `_<kebab>.tsx` に `isItemObject` として置きます (`isObject` + `"title" in item`・`"content" in item` + `isReactNode` 判定)。バレルと公開 `index.ts` から再輸出しません。
- 既定レンダラーは `switch (true)` + `isItemObject` → `default` の順にし、キーは `getItemKey(item) ?? index` にします。`title`・`content`・`htmlTitle` を除いた残余を `Item` へ渡します。

```tsx
const defaultItemRenderer: IAccordionRootItemRenderer = (item, index) => {
  switch (true) {
    case isItemObject(item): {
      const { title, content, htmlTitle, ...otherItemProps } = item;

      return (
        <AccordionItem {...otherItemProps} key={getItemKey(item) ?? index} title={htmlTitle}>
          <AccordionHeading>
            <AccordionTrigger>
              {title}
              <AccordionIndicator />
            </AccordionTrigger>
          </AccordionHeading>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      );
    }

    default:
      return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
  }
};

const { children = defaultItemRenderer } = props;

return (
  <Accordion.Root {...otherProps}>
    {typeof children === "function" ? items.map(children) : children}
  </Accordion.Root>
);
```

## 短名定型

同じパーツファイル内のパーツの直後に置きます。`ComboboxChip` を例とします。

```tsx
export { ComboboxChip as Chip };
export namespace Chip {
  export type State = ComboboxChipState;

  export type Props<TValue = any> = Props.Render & Props.SuruUI<TValue> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipProps.Render;

    export type SuruUI<TValue = any> = ComboboxChipProps.SuruUI<TValue>;

    export type BaseUI = ComboboxChipProps.BaseUI;

    export type HTML = ComboboxChipProps.HTML;
  }

  export type Color = ComboboxChipColor;

  export type Radius = ComboboxChipRadius;

  export type Variant = ComboboxChipVariant;
}
```

- namespace には `State` と `Props` を必ず入れ、値型 (`Color`・`Radius`・`Size`・`Variant`・`InputPosition`・`IRenderer`・`IItemRenderer` など) があれば追加します。汎型は既定値付きで引き継ぎます (`<TValue = any>`・`<TItem = any, TMultiple extends boolean | undefined = boolean | undefined>`・`<TItem = any, TValue = any>`)。
- `Props` は区分の `namespace Props` と `&` 結合の `type Props` の 2 段にします。`|` で結合しません。`BaseUI` を落としません。
- 再輸出と namespace 内の型別名には JSDoc を付けません。`{@link X}` のみの JSDoc も付けません。
- フックの短名は同ファイルの末尾に置きます (例: `export { useComboboxFilter as useFilter };`、`export { useComboboxFilteredItems as useFilteredItems };`、`export { ComboboxItemContext as ItemContext, useComboboxItemContext as useItemContext };` など)。

## .tsx (合成)

`combobox.tsx` を例とします。

### Types

- Root 由来の再命名には JSDoc を付けません。名は `<Comp><型名>` にし、パーツ名を重ねません (例: `ComboboxRootItemGroup` → `ComboboxItemGroup`)。
- 型定義はすべてこのセクションに集めます。`IUse<Comp>API` も API セクションではなくここに置きます (`I<Comp>` の直前。例: `IUseAccordionAPI`)。
- `SlotProps` は `readonly` + `| undefined` にします。キーの順序は自動整形に任せます。各キーに JSDoc を付けます。子要素は原則 `Omit` で除きますが、API / Component が `children` を生成・上書きするパーツ (`empty`・`status`・`value` など) は `Omit<..., "children">` にし、生成しないパーツ (`clear`・`icon` など) はそのままにします。合成 `Props` に持ち上げたキーも除きます。

```ts
/**
 * {@link Combobox} の各パーツに渡す props です。
 */
export type ComboboxSlotProps<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = {
  /**
   * {@link ComboboxArrow} に渡す props です。
   */
  readonly arrow?: ComboboxArrowProps | undefined;

  /**
   * {@link ComboboxEmpty} に渡す props です。
   */
  readonly empty?: Omit<ComboboxEmptyProps, "children"> | undefined;
  // ...
};
```

- `State` は `RootState` の別名にします。
- 合成 `Props` は `namespace <Comp>Props` (例: `ComboboxProps`) の 3 分割 + 交差にします。重複キーは `Omit` で除きます。

```ts
namespace ComboboxProps {
  export type Combobox<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> = {
    /**
     * 矢印を表示するかどうかを指定します。
     *
     * 矢印の内容や props を変更するときは {@link ComboboxProps.slotProps|slotProps.arrow} を使います。
     */
    arrow?: boolean | undefined;

    /**
     * 各パーツに個別のpropsを渡すためのオブジェクトです。
     */
    slotProps?: ComboboxSlotProps<TItem, TMultiple> | undefined;
    // ...backdrop・chipLabelRenderer・empty・inputInPopup・itemLabelRenderer・keepFilterOnSelect・label・placeholder・separator・status
  };

  export type InputGroup = Omit<ComboboxInputGroupProps, "children" | keyof Combobox | keyof Root>;

  export type Root<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> = Omit<
    ComboboxRootProps<TItem, TMultiple>,
    "children" | keyof Combobox
  >;
}

/**
 * {@link Combobox} に渡す props です。
 *
 * @template TItem 項目の型です。
 * @template TMultiple 複数選択を有効にするかどうかです。
 */
export type ComboboxProps<
  TItem = any,
  TMultiple extends boolean | undefined = boolean | undefined,
> = ComboboxProps.Combobox<TItem, TMultiple> &
  ComboboxProps.Root<TItem, TMultiple> &
  ComboboxProps.InputGroup;
```

- 子相当やコールバックはパーツ Props から参照し、二重定義しません。トップレベルへ持ち上げる表示文言 (`empty`・`status`・`placeholder`・`label`) は合成 `Combobox` 型に置き、`slotProps` 側は `children` 除外にします。

### API

`ComboboxAPI` のようなクラス + `IUse...API` フックの 2 段にします。`IUse...API` の型定義は Types セクションに置きます (例: `IUseAccordionAPI`)。

```ts
export class ComboboxAPI<TItem = any, TMultiple extends boolean | undefined = boolean | undefined> {
  private readonly comboboxProps: Required<Omit<ComboboxProps.Combobox<TItem, TMultiple>, "slotProps">>;
  private readonly slotProps: ComboboxSlotProps<TItem, TMultiple>;
  private readonly rootProps: Required<ComboboxProps.Root<TItem, TMultiple>>;
  private readonly inputGroupProps: ComboboxProps.InputGroup;

  /**
   * @param props {@link Combobox} の props です。
   * @internal
   */
  public constructor(props: ComboboxProps<TItem, TMultiple>) {
    const {
      arrow,
      empty,
      // ...合成固有キー
      slotProps = {},
      // ...トップレベル表示キー
      ...rootAndInputGroupProps
    } = props;
    const {
      // ...Root キー (明示列挙)
      ...inputGroupProps
    } = rootAndInputGroupProps;
    this.comboboxProps = { /* 合成固有のみ */ };
    this.slotProps = slotProps;
    this.rootProps = { /* Root のみ */ };
    this.inputGroupProps = inputGroupProps;
  }

  public getXProps(): XProps | null { ... }
}

export const useComboboxAPI: IUseComboboxAPI = function useSuiComboboxAPI<
  TItem,
  TMultiple extends boolean | undefined,
>(props: ComboboxProps<TItem, TMultiple>) {
  return new ComboboxAPI(props);
};

export { ComboboxAPI as API, useComboboxAPI as useAPI };
```

getter の規則です。

- getter 名は `get<Part>Props` にします。常に描画するパーツは Props を返し、条件付きのもの (例: `arrow`・`backdrop`・`separator` など) は `| null` を付け、`if (flag || props) return props || {}; return null;` にします。
- `slotProps` を各パーツ既定 `{}` 付きで分解します。利用者指定 (`slotProps.<part>`) を前に展開し、合成側の既定を後ろに置く場合はフォールバックの順にします。`children` を上書きする getter (`empty`・`status`) は利用者指定を破棄しない順序にし、`...props` の後に無条件上書きしません。

```ts
public getInputProps(): ComboboxInputProps {
  const { placeholder: defaultPlaceholder } = this.comboboxProps;
  const { input: props = {} } = this.slotProps;
  const { placeholder = defaultPlaceholder, ...otherProps } = props;

  return {
    ...otherProps,
    placeholder,
  };
}
```

- `placeholder` のような連鎖フォールバックは例として `comboboxProps → slotProps.input → slotProps.value` の順に解決します (例: `getInputDisplayProps`)。
- `Collection`・`List` のように既定レンダラーを持つ getter は `const { children = this.defaultXRenderer, ...otherProps } = this.slotProps.x ?? {}; return { ...otherProps, children };` にします。
- `GroupLabel` のように可視判定が要る getter は `isLikelyVisibleNode` で判定し、駄目なら `null` を返します。返り値は `Omit<PartProps, "children"> & { children: LikelyVisibleNode | null }` の形にせず、素直に `PartProps | null` にします (合成所有の既定レンダラー内では直接条件描画します)。
- `Group` のようにオーバーロードが要る getter は引数なし版と項目あり版の 2 段にし、項目あり版は `label` 除外 + `mergeProps([baseProps, otherProps])` にします。
- `Item` のようにラベル付き分岐が要る getter は `isLabeledItem` で `label` を除外し、`mergeProps([baseProps, otherProps, { value: item }])` にします。
- `Chip` のように省略可能引数が要る場合は sentinel (`const NONE = {} as never` + `item: TItem = NONE` + `item === NONE` 判定) を使います。引数名は `value` ではなく `item` にし、理由を `// value だと...` のコメントで残します。
- `Root` のように Base UI コールバックを包む場合は `...otherProps` の後に `multiple`・`onOpenChange: handle...`・`itemToStringLabel` などを明示列挙で渡し直します。存在しない Base UI プロパティー (`isItemPress` など) を参照せず、`@ts-expect-error` で隠蔽しません。
- `ScrollArea` のように `data-scope` を受けない内包先へ渡す場合は `null` 既定 + 変数経由 (`propsWithScope`) で余剰チェックを避けます。
- 単なる表示ノード (`label`) は `getLabel(): React.ReactNode` のように `get<Part>Props` ではない getterにします。
- 末尾に短名を付けます (`export { ComboboxAPI as API, useComboboxAPI as useAPI };`)。

### Component

汎型 interface + `Object.assign` 実装にします。`Combobox` を例とします。

```tsx
export interface ICombobox extends IComponent<ComboboxProps> {
  <TItem = any, const TMultiple extends boolean | undefined = false>(
    props: ComboboxProps<TItem, TMultiple>,
  ): IComponent.Return;

  readonly TriggerLabel: IComboboxTriggerLabel;
  readonly useContext: IUseComboboxContext;
  readonly useFilter: IUseComboboxFilter;
  readonly useFilteredItems: IUseComboboxFilteredItems;
}

export const Combobox: ICombobox = /*#__PURE__*/ Object.assign(
  function SuiCombobox(props: ComboboxProps) {
    const api = useComboboxAPI(props);
    const arrowProps = api.getArrowProps();
    const backdropProps = api.getBackdropProps();

    return api.isInputInPopup() ? ( /* popup 内入力ツリー */ ) : ( /* popup 外入力ツリー */ );
  },
  {
    useFilter: useComboboxFilter,
    useContext: useComboboxContext,
    TriggerLabel: ComboboxTriggerLabel,
    useFilteredItems: useComboboxFilteredItems,
  },
);

export namespace Combobox {
  export type State = ComboboxState;
  export type Props<TValue = any, TMultiple extends boolean | undefined = boolean | undefined> = ComboboxProps<TValue, TMultiple>;
  export type SlotProps = ComboboxSlotProps;
  export type Context = ComboboxContext;
  // ...Actions・ChangeEventDetails・ChangeEventReason・Color・HighlightEventDetails・HighlightEventReason・IFilter・IFilteredItems・ItemGroup・ItemLabeledValue・ItemValue・Radius・Size・Variant
}
```

- 条件付きパーツ (`| null` を返す getter) は先に変数化し、有無で条件描画します (`{xProps && <Part {...xProps} />}`)。変数化の順序は JSX の描画順にします。
- 常に描画するパーツは変数化せず、実行結果をそのまま渡します (`<Part {...api.getXProps()} />`)。
- 表示ノード (`label`) は `{api.getLabel()}` の形で描画します。
- `inputInPopup` のようにツリー全体が分岐する場合は `api.isInputInPopup() ? (...) : (...)` の 2 分岐にし、両分岐で同じ getter 群を使い回します。
- 静的メンバー (`TriggerLabel`・`useContext`・`useFilter`・`useFilteredItems`) は `Object.assign` の第 2 引数に置きます。
- 末尾に namespace を置き、`State`・`Props`・`SlotProps` と再命名型を列挙します。JSDoc は付けません。

### 単純な合成 (単一 Root 描画)

`accordion.tsx` を例とします。スタイル起点が Root 自身に集約しツリー分岐が要らない場合は、`Combobox` の 3 分割・4 分割・分岐描画を簡略化します。

- 合成 `Props` は `<Comp>` 固有 + `Root` の 2 分割 + 交差にします。`InputGroup` のような第 3 の区分は作りません。

```ts
namespace AccordionProps {
  export type Accordion = {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: AccordionSlotProps | undefined;
  };

  export type Root<TItem = any, TValue = any> = Omit<
    AccordionRootProps<TItem, TValue>,
    keyof Accordion
  >;
}

export type AccordionProps<TItem = any, TValue = any> = AccordionProps.Accordion &
  AccordionProps.Root<TItem, TValue>;
```

- `SlotProps` のキーは API が `children` を生成・上書きするパーツ (`content`・`item`) は `Omit<..., "children">` にし、生成しないパーツ (`indicator`) はそのままにします。
- API は `slotProps` + `rootProps` の 2 分割にします。`comboboxProps`・`inputGroupProps` のような第 3・第 4 の保持は作りません。

```ts
export class AccordionAPI<TItem = any, TValue = any> {
  private readonly slotProps: AccordionSlotProps;
  private readonly rootProps: AccordionRootProps<TItem, TValue>;

  public constructor(props: AccordionProps<TItem, TValue>) {
    const { slotProps = {}, ...rootProps } = props;
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }
}
```

- 既定レンダラーは API の `private defaultItemRenderer` に持ち、`getRootProps` で `const { children = this.defaultItemRenderer, ...otherProps } = this.rootProps; return { ...otherProps, children };` と解決します。`Root` パーツ側の `defaultItemRenderer` と重複させず、API 所有を優先します。
- 項目あり getter (`getItemProps(item?)`・`getContentProps(item?)`) は引数なし版と項目あり版を兼ね、`item` があるときだけ項目オブジェクトから `title`・`content` を分離して `mergeProps([props, otherItemProps, { title }])` します。表示ノードは `getTitle(item): React.ReactNode` のように `get<Part>Props` ではない getter にします。
- Component は汎型 interface + 単一 Root 描画にします。Context を持つ場合は `Object.assign` で `useContext`・`useItemContext`・`useTriggerContext` を付け、namespace に `Context`・`ItemContext`・`TriggerContext` を列挙します。持たない場合のみ静的メンバーを付けません。公開面の既定値は `<TItem = never, TValue = $InferItemObjectValue<TItem>>` にします。

```tsx
export interface IAccordion extends IComponent<AccordionProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = any, TValue = $InferItemObjectValue<TItem>>(
    props: AccordionProps<TItem, TValue>,
  ): IComponent.Return;

  readonly useContext: IUseAccordionContext;

  readonly useItemContext: IUseAccordionItemContext;

  readonly useTriggerContext: IUseAccordionTriggerContext;
}

export const Accordion: IAccordion = Object.assign(
  function SuiAccordion(props: AccordionProps) {
    const api = useAccordionAPI(props);

    return <AccordionRoot {...api.getRootProps()} />;
  },
  {
    useContext: useAccordionContext,
    useItemContext: useAccordionItemContext,
    useTriggerContext: useAccordionTriggerContext,
  },
);
```

## 周辺ファイル

- `_<kebab>.tsx` はパーツファイルと合成 (`.tsx`) からのみ import します。パーツ横断の補助 (`ItemObject` 判定・値推論など) を置き、バレルと公開 `index.ts` からは再輸出しません。公開する補助は `<kebab>.utils.ts` に置き、バレルから再輸出します (例: `decomposeAccordionItemObject`)。
- バレル `<kebab>.parts.ts` は全パーツ・Context・公開ヘルパーを `export *` で再輸出し、`./<kebab>.css` を import します。短名 (`Context` や `Root`、`ItemContext`、`useFilter` など) は各パーツファイルの再輸出から伝わります。並びは Context → パーツツリー (描画順) → 公開ヘルパーにします。アルファベット順にしません。
- `src/index.ts` には合成 (`.tsx`) の公開型と値を網羅列挙します。パーツ単体の型は列挙せず、合成の再命名型を使います。`ItemGroup` だけでなく `ItemValue`・`ItemLabeledValue`・`IFilter`・`IFilteredItems` など合成 namespace が公開する型を落としません。値には `type` を付けず、型のみには `type` を付けます。

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

- 1 パーツ 1 ファイルで、ファイル名が `<kebab>.<パーツの kebab>.tsx` である。Context は `<kebab>.<対象の kebab>.context.ts`、Context・型・フックのみのパーツは `.ts` である。フックラッパーが `<kebab>.use-<名前>.ts`、公開ヘルパーが `<kebab>.utils.ts` である。
- CSS の import がバレルだけにある。バレルが `export *` だけを行い、Context → パーツツリー → 公開ヘルパーの順に並んでいる。
- パーツをまたぐ参照が相対 import で、ファイル内部では正式名を使っている。
- 型だけの import が `import type { X } from "..."` になっている。値と型が混ざる場合だけ `import { type X, value }` にしている。
- パーツ横断の補助が `_<kebab>.tsx` にあり、バレルと公開 `index.ts` から再輸出されていない。公開ヘルパーが `<kebab>.utils.ts` にあり、バレルから再輸出されている。
- `erasableSyntaxOnly` に反する構文 (`enum`・パラメータープロパティーなど) がない。
- `IComponent` 以外で宣言していない。`Sui` / `useSui` 接頭辞を省略していない。`const` 型引数 (`TMultiple`) を落としていない。
- `useRender` 対象に JSX 直書きしていない。Base UI 対象に `useRender` を使っていない。
- `useRender` 対象の `className` を分解せず、`cn` に含めていない。修飾なしで `cn` を使っていない。
- HTML 既定値を第 2 要素に直書きしていない。上書き可能にしている。該当する場合、`aria-label`・`nativeButton`・既定子 (例: `<ClearIcon />`) が定型通りである。
- `useRender` の残余に汎名を使っていない。`other<Tag>Props` / `<tag>Props` / `props` を使い分けている。
- JSX 直書きの `cn` で `className` を先頭に置いている。該当する場合、状態値の正規化 (例: `popupSide.replaceAll`) と 3 値比較 (例: `valid === ...`) が正しい。
- `Props` を 4 区分に分け、`&` で結合している。区分自体に JSDoc を付けていない。結合本体の JSDoc を残している。`Render = {}`・`HTML = {}` の場合も区分を落としていない。
- 短名 namespace の `Props` を `&` で結合している。`BaseUI` を落としていない。値型 (`Color`・`Radius`・`IRenderer` など) を追加している。
- 空の `SuruUI` / `BaseUI` でも `Exclude` / `Omit` の `| keyof SuruUI` / `| keyof BaseUI` を省略していない。
- 型引数名が `T` 始まりである。テーマ型 (`Color`・`Size`) を union 再定義していない。`Radius` が `"none" | Size | "full"` または `"none" | Size` (Accordion のように `full` が要らない形状は後者) である。
- 他コンポーネントの型参照に短名 namespace を使っている (`Card.Root.Props.SuruUI`・`Card.Root.State` など)。長名 (`Card.CardRootProps.SuruUI`・`Card.CardRootState`) を使っていない。
- Base UI の公開型に漏れがない。`Handle` の有無を確認している。根拠コメントの型名が実体と一致している。
- Context を持つ場合、`Context` 値型が `readonly` + 汎型既定値付きである。フック型が `IUseContext` 継承 + オーバーロードである。`ContextMissingError` の `contextName` / `providerName` が正しい。ローカル変数は `ctx` である。派生コンテキストが `useMemo` + スプレッドで、意図注釈がある。短名がルートは `Context` / `useContext`、ルート以外は `ItemContext` / `useItemContext` のように対象名に合っている。Context を持たない場合 (`Stat` のように修飾が Root 自身に集約し子が読まない場合) は Context ファイルがない。
- State の継承が規則通りである。ルートは `Context` または `Override<Context, BaseUI.State>`、子は上位 `State` と同じか `Override<上位Context, BaseUI.State>` で、独自の Suru UI 状態は `Override` の入れ子で足している。Base UI ラッパーの子は `(state) => ({ ...ctx, ...state })` で合成している。子が読む Context がそのパーツの必ず置かれる範囲のものである (`AccordionIndicator` は `ItemContext`)。
- 再輸出・再命名に JSDoc (`{@link X}` のみを含む) を付けていない。`State` / `Props` を省略していない。該当するフック短名 (例: `useFilter`・`useFilteredItems`・`ItemContext`・`useItemContext`・`TriggerContext`・`useTriggerContext` など) を落としていない。
- 一覧描画を持つ場合、レンダラー型 (例: `ICollectionItemRenderer`・`IListItemRenderer`・`IValueRenderer`・`IItemLabelRenderer`・`IAccordionRootItemRenderer` など) が定義されている。分離描画 (`Collection`・`List`・`Value`) では `children` 強化 (`Override` + `BaseUI の型を強化します。`) にし、Root 内描画 (Accordion) では `SuruUI` の `children: React.ReactNode | I...ItemRenderer` にする。`switch (true)` の順序と `getItemKey ?? index` が正しい。
- 反復要素に `key` を付けている。判定関数を公開・再定義していない。
- 再命名型にパーツ名を重ねていない。合成 namespace に `State`・`Props`・`SlotProps` と該当する再命名型 (例: `ItemGroup`・`ItemValue`・`IFilter` 系など) を落としていない。Context は持つ場合のみ列挙する (Accordion は `Context`・`ItemContext`・`TriggerContext` を列挙する)。
- `SlotProps` が `readonly`・`| undefined` である。各キーに JSDoc がある。持上げキーを残していない。`children` の `Omit` 有無が生成有無と一致している。
- 合成 `Props` が `<Comp>` 固有 + `Root` (+ スタイル起点が別にある場合は第 3 区分、例: Combobox では `Combobox` + `Root` + `InputGroup`、Accordion では `Accordion` + `Root`) の 2 分割または 3 分割 + 交差である。`keyof <Comp>` / `keyof Root` の除外が正しい。
- API がクラス + `IUse...API` + `new` 返却である。保持は `slotProps` + `rootProps` の 2 分割 (Accordion) または `<comp>Props` / `slotProps` / `rootProps` / スタイル起点Props (例: Combobox では `comboboxProps` / `slotProps` / `rootProps` / `inputGroupProps`) の 4 分割のいずれかで正しい。getter 名・`| null` が正しい。常に描画するパーツを変数化していない。可視判定なしに描画していない。`slotProps` 側を前に展開し、利用者指定の `children` を無条件上書きしていない。存在しない Base UI プロパティーを参照せず、`@ts-expect-error` で隠蔽していない。`data-scope: null` + 変数経由が必要な箇所で守られている。
- Component が汎型 interface + 単一 Root 描画 (Accordion) または `Object.assign` + 静的メンバー (Combobox) である。単一 Root 描画でも Context を持つ場合は `Object.assign` で `useContext`・`useItemContext`・`useTriggerContext` を付ける (Accordion)。ツリー全体が分岐する場合 (例: `inputInPopup`) は両ツリーで同じ getter 群を使い回している。`getLabel()` / `getTitle()` のような表示ノード getter を `{api.getX()}` で描画している。
- `data-scope` が起点のみである。Root が DOM を持つ場合 (Accordion) は Root 自身が起点であり、持たない場合の起点 (例: InputGroup / Portal / TriggerLabel など) が正しい。状態・見た目が起点に集約されている。独立装飾の子 (例: `Chip`・`Popup` など) 以外に同名 props や修飾クラスがない。レイアウト以外の `&:has(.子修飾)` がない。子の見た目切替のためだけの新規 `Context` がない (スタイル情報を `State` として伝える Context は除く)。Base UI の `data-*` を CSS に使っていない。`State` 外のクラスや CSS がない。該当する場合、ケバブを含む状態値 (例: `popupSide`) の正規化がある。
- Context を state に合成するパーツの `className` / `style` / `render` がマージ後の state で作られている (クロージャー変数を使っていない)。合成 `.tsx` の型定義 (`IUse...API` を含む) が Types セクションに集まっている。
- 一覧描画を持つ場合、`items` を二重定義していない (分離描画では描画側が `Context` から読み、Root 内描画では Root の `SuruUI` に集約する)。`Group` の透過遮断に意図注釈がある。
- 継承パターンに該当する場合、継承の `BaseUI` が `Override<Inner, Override<Pick<Outer>, 強化>>` の順である。`Required` を省略していない。除外交差キーの `undefined` 明示がある。`render = <div />` の既定がある。`proxyRenderProps` に `Render` をすべて渡し、`mergeProps` の順序が正しい。該当する場合、サブコンテキスト (例: `ItemContext`・`TriggerContext`) の提供がある。
- `index.ts` に再輸出以外がない。公開型の列挙漏れがない。アイコンが共有ファイルにある。放置 TODO・コピペコメント (`AriaCombobox` など) がない。
