# Skill: react-component

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
- `packages/react/src/tabs/`
- `packages/react/src/segments/`
- `packages/react/src/menu/`
- `packages/react/src/card/`
- `packages/react/src/button/`
- `packages/react/src/sidebar/`

パターン別の代表例 (同型の実装はどれも同等に参照してよく、以下の列挙にない新設も模範になりえます):

- `combobox/root/combobox.root.tsx` — DOM を持たない Base UI Root + Context 提供の例
- `autocomplete/root/autocomplete.root.tsx` — DOM を持たない Base UI Root + 既定値解決の例
- `accordion/root/accordion.root.tsx` — DOM を持つ Base UI Root + `items` レンダラー + `proxyRenderProps` の例
- `tabs/root/tabs.root.tsx` / `tabs/list/tabs.list.tsx` — `items` を Context に集約し、一覧パーツが描画する例
- `segments/root/segments.root.tsx` — `activeVariant` のように `ColorTemplate` を使う例
- `card/root/card.root.tsx` — 素の要素 Root + `useRender` + Context 提供の例
- `button/root/button.root.tsx` — Base UI ラッパー + `render` 内で Context を提供する例
- `sidebar/provider/sidebar.provider.tsx` — 状態と操作関数を持つ Provider Context の例
- `sidebar/root/sidebar.root.tsx` — 上位 Context を派生提供する例
- `file-upload/root/file-upload.root.tsx` — 描画用 `renderState` と操作関数を含む `ctx` を分ける例
- `menu/root/menu.root.tsx` / `menu/popup/menu.popup.tsx` — 項目オブジェクトの union・共有ヘルパー・Portal の例
- `tree/item/tree.item.tsx` — Inner を直接描画し、明示 state で `proxyRenderProps` する例
- `pagination/root/pagination.root.tsx` / `pagination/ellipsis/pagination.ellipsis.tsx` — 独自状態フックと合成の例
- `combobox/input-group/combobox.input-group.tsx` — スタイル起点・状態集約 + パーツ Context 提供の例
- `combobox/item/combobox.item.tsx` — 継承パターン (Outer の Base UI + Inner の Suru UI) の例
- `menu/item/menu.item.tsx` — Button を内包する継承パターンの例
- `combobox/collection/combobox.collection.tsx` / `combobox/list/combobox.list.tsx` / `combobox/value/combobox.value.tsx` — 一覧描画・レンダラーの例
- `combobox/root/combobox.root.context.ts` — 汎型 Context の例
- `combobox/item/combobox.item.context.ts` / `combobox/input-group/combobox.input-group.context.ts` — サブコンテキストの例
- `combobox/addon/combobox.addon.context.ts` / `combobox/portal/combobox.portal.context.ts` — Context を変更しないパーツの再輸出例
- `accordion/item/accordion.item.context.ts` / `accordion/trigger/accordion.trigger.context.ts` — パーツ状態のサブコンテキスト例
- `accordion/indicator/accordion.indicator.tsx` — `useRender` 素要素 + 既定子 + 親 `ItemContext` 読み取りの例
- `combobox/trigger/combobox.trigger.tsx` — render 関数を `children` に付け替える場合の例
- `combobox/use-filter/combobox.use-filter.ts` / `combobox/use-filtered-items/combobox.use-filtered-items.ts` — フックラッパーの例
- `menu/handle/menu.handle.ts` — 命令ハンドルの例
- `tabs/_tabs.tsx` / `segments/_segments.tsx` — 項目判定・props 抽出・レンダラー生成を共有する内部ヘルパーの例
- `tabs/utils/tabs.utils.ts` — 公開する項目分解ヘルパーの例
- `combobox.tsx` — 合成 (Types + クラス API + 分岐 Component) の例
- `accordion.tsx` — 単一 Root 描画の合成 (`slotProps` + `rootProps` + `Object.assign` での Context 公開) の例
- `sidebar.tsx` — 静的パーツを `Object.assign` で公開する合成の例
- `toast.tsx` — 複数の API と `Toast.List` / `Toast.Provider` のようなネストした namespace を持つ合成の例

CSS は `css` スキル、JSDoc は `jsdoc` スキル、日本語は `yomiyasu` スキルに従います。

## 作業手順

次の順で進めます。

1. Base UI の型確認
2. パーツファイル (`<パート>/<kebab>.<パーツ>.tsx`、Context は同階の `<kebab>.<パーツ>.context.ts`) を書く
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
- namespace メンバーの順序 (`sort-namespace-exports`。`State`・`Props`・`SlotProps`・`Context`・`*Context` が先頭)
- CSS 変数宣言の順序 (`sort-css-variables`。プロパティー順と `idle` → `hover` → `active` → `checked` の固定順)

手で守るのは残余の位置・既定値の依存順・spread の順序など、意味を持つ順序だけです。

## ファイル配置

```text
packages/react/src/<kebab>/
  _<kebab>.ts(x)                 # パーツ横断の内部ヘルパー (必要な場合のみ)
  _<kebab>.utils.tsx             # 複数の補助をまとめる内部ヘルパー (必要な場合のみ)
  <kebab>.parts.ts               # パーツのバレル
  <kebab>.tsx                    # 合成 + API フック
  <kebab>.stories.tsx            # Storybook (コンポーネント単位)
  index.ts                       # 再輸出のみ
  <パート>/                      # 1 パーツ 1 ディレクトリー (ディレクトリー名はパーツ名の kebab)
    <kebab>.<パーツ>.tsx         # 例: root/combobox.root.tsx
    <kebab>.<パーツ>.css         # 例: root/combobox.root.css (css スキルに従う)
    <kebab>.<パーツ>.context.ts  # そのパーツの Context (必要な場合のみ)
    <kebab>.<パーツ>.client.test.tsx  # そのパーツのテスト (必要な場合のみ)
  utils/                         # 公開ヘルパー (必要な場合のみ)
    <kebab>.utils.ts
  handle/                        # 命令ハンドル (必要な場合のみ)
    <kebab>.handle.ts
  use-<名前>/                    # Base UI フックの薄いラッパー (必要な場合のみ)
    <kebab>.use-<名前>.ts
  _assets/                       # ストーリー専用アセット (必要な場合のみ)
```

- 1 パーツ 1 ディレクトリーです。ディレクトリー名はパーツ名の kebab にし、中のファイル名は `<kebab>.<パーツ名の kebab>.tsx` にします (例: `ComboboxRoot` → `root/combobox.root.tsx`)。
- コンポーネント (JSX を書くか `IComponent` を使うもの) は `.tsx`、Context・型・フックのみのパーツは `.ts` にします。
- Context は原則として所有するパーツのディレクトリーに置き、`<kebab>.<パーツの kebab>.context.ts` にします (例: `ButtonContext` → `root/button.root.context.ts`、`ComboboxItemContext` → `item/combobox.item.context.ts`、`AccordionTriggerContext` → `trigger/accordion.trigger.context.ts`)。短名は、ルート Context が `Context` / `useContext`、ルート以外が `<対象>Context` / `use<対象>Context` です (`ItemContext` / `useItemContext`、`TriggerContext` / `useTriggerContext`)。ルート以外で `Context` / `useContext` を使いません。ルート Context でも `AvatarRootContext`・`CheckboxRootContext`・`RadioRootContext`・`ScrollAreaRootContext` のように `RootContext` / `useRootContext` を併用する場合があります。
- 次の場合は所有パーツと別の場所に置けます。どちらも理由をコメントで残します。
  - 複数パーツが同じ Context を提供・参照し、配置によって型の循環ができる場合 (例: `SidebarContext` は `root/sidebar.root.context.ts` にあり、`SidebarProvider` が提供します)。
  - パーツが Context を変更・拡張しない場合。そのパーツのディレクトリーに `<kebab>.<パーツ>.context.ts` を作り、親 Context を長名・短名の両方で再輸出します (例: `combobox/addon/combobox.addon.context.ts`、`combobox/portal/combobox.portal.context.ts`)。
- Base UI フックの薄いラッパーは `use-<名前>/<kebab>.use-<名前>.ts` にします (例: `use-filter/combobox.use-filter.ts`、`use-filtered-items/combobox.use-filtered-items.ts`)。`I<名前>` + `IUse<名前>Options` (ある場合) + `IUse<名前>` interface + `useSui...` 実装 + 短名再輸出の順にします。
- 命令ハンドルは `handle/<kebab>.handle.ts` にします (例: `handle/menu.handle.ts`)。`<Comp>Handle`、`ICreate<Comp>Handle`、`create<Comp>Handle` / `createSui<Comp>Handle`、短名 (`Handle` / `createHandle`) を置きます。バレルから再輸出しますが、ルート `src/index.ts` へ出すかは公開 API に含めるかで決めます (現行の Menu などはルート index に出していません)。
- `_` 始まりは非公開で、コンポーネント直下に置きます。2 つ以上のパーツが共有する補助だけを置きます。バレルと公開 `index.ts` から再輸出しません。内部ヘルパーのファイル名は `_<kebab>.ts(x)` を基本とし、複数の補助をまとめる場合は `_<kebab>.utils.tsx` のような名前にします (例: `menu/_menu.utils.tsx`、`context-menu/_context-menu.utils.tsx`)。コンポーネントをまたいで共有する場合は、片方の `_` ファイルを直接 import せず、共有側のコンポーネントへ移すか、同じ実装をそれぞれに置きます。
- 公開するパーツ横断の補助 (`decompose...` など) は `utils/<kebab>.utils.ts` に置き、`_<kebab>` から参照し、バレルから再輸出します。
- バレル `<kebab>.parts.ts` は再輸出だけを行い、先頭で各パートの CSS をパーツツリー順 (描画順) に import します。DOM を持たない Root の CSS は末尾、内部専用パーツ (例: `BreadcrumbEllipsis`) の CSS は描画位置に置きます。
- バレルの再輸出は Context → パーツツリー → 公開ヘルパーの順に並べます。`handle` は Context の後、パーツの前に置きます。文と指定子の最終的な順序は自動整形に任せます。
- `index.ts` は実装を書かず、parts → (`utils/` を持つ場合は `./utils/<kebab>.utils.js`) → 合成の順に再輸出します。
- 自ファイルの import には `.js` / `.jsx` を付けます。他コンポーネントもパーツ同士も相対で import します。共有 (`src/` 直下) へはパーツから `../../` で上がります。兄弟パーツへは `../<パート>/` を経由し、自パーツの Context へは `./` で参照します。
- 他コンポーネントのパーツを内包する場合は `import * as Card from "../../card/card.parts.js"` のように名前空間でまとめて import し、`Card.Root`・`Card.Root.Props`・`Card.Root.State` を使います。ストーリーからは各コンポーネントの `index.js` を使います。

```ts
// <kebab>.parts.ts
import "./root/<kebab>.root.css";
import "./content/<kebab>.content.css";

export * from "./root/<kebab>.root.context.js";
export * from "./content/<kebab>.content.context.js";
export * from "./root/<kebab>.root.jsx";
export * from "./content/<kebab>.content.jsx";
export * from "./utils/<kebab>.utils.js";
```

```ts
// index.ts
export * from "./<kebab>.parts.js";
export * from "./utils/<kebab>.utils.js";
export * from "./<kebab>.tsx";
```

```tsx
import { XIcon } from "../../_icons.jsx";
import { ButtonContext } from "./button.root.context.js";
import { ComboboxItem } from "../item/combobox.item.jsx";
```

## パーツファイルの土台

### import と構成

- import / export の文と指定子、`src/index.ts` の順は規定しません。フォーマッターに任せます。
- CSS の import はバレルだけが行います。パーツファイルでは import しません。
- パーツをまたぐ参照は、参照する側のパーツファイルから相対で import します (例: 自パーツの Context は `import { ButtonContext } from "./button.root.context.js";`、兄弟パーツは `import { ComboboxItem } from "../item/combobox.item.jsx";`)。ファイル内部では正式名を使い、短名を使いません。
- 型だけを import する場合は `import type { X } from "..."` にします。値と型が混ざる場合だけ `import { type X, value }` にします。
- 旧 `.parts.tsx` にあった `// <名>` のセクション見出しは不要です。ディレクトリーそのものが 1 パーツを表します。
- `.tsx` (合成) の見出しは同様です (`// Types` / `// API` / `// Component` と同文字数の `-`)。
- 合成 `.tsx` はパーツと Context を `./<kebab>.parts.js` からまとめて import します。内部専用パーツ (例: `breadcrumb/ellipsis`) だけは直接 import します。
- 公開する型・値には JSDoc を付けます。再輸出や再命名には付けません。JSDoc の書き方は `jsdoc` スキルに従います。

### Base UI の型確認

各パーツを書く前に `node_modules/@base-ui/react/<コンポーネント>/` の `.d.ts` を開きます。

1. `<パート>/*.d.ts` の namespace が公開する型を列挙します。`State`・`Props` のほか、`Actions`・`ChangeEventDetails`・`ChangeEventReason` があれば含めます。
2. 公開メンバーは漏らさず再輸出します。`State` と `Props` だけでは終えません。
3. `Handle` / `createHandle` の有無を確認します。ないものは作りません。あるものは `handle/<kebab>.handle.ts` に置きます。
4. 他から再輸出のパーツ (例: `Separator`) は `index.parts.d.ts` と `index.d.ts` で実体と型の両方を確認します。
5. 各パーツの `State` フィールドを列挙し、状態クラス化の対象を決めます。`State` にない状態は扱いません。

### Context 定型

子に値を渡す場合のみ、そのパーツのディレクトリーの `<kebab>.<パーツ>.context.ts` に置きます。`ComboboxContext` を例とします。

- Context の値型は `readonly` フィールドのオブジェクトにし、汎型は既定値付き (`<TItem = any>`) にします。各フィールドに JSDoc を付けます。
- 修飾値型 (`Color`・`Radius`・`Size`・`Variant`・`IItemToStringLabel` など) は Context ファイルに分離し、JSDoc を付けます。`Color`・`Size` はテーマ型をそのまま使い (`Color`、`Size`)、`Variant` は `ColorTemplate` (`"solid" | "naked" | "liquid"`) と一致するならテーマ型を使います。
- フック型は既定では `IUseContext` の型エイリアスにします。ルートの汎型 Context で型引数をフックに通す場合だけ `IUseContext` 継承の interface にオーバーロードを足します。`ComboboxItemContext`・`ComboboxListContext`・`ComboboxChipContext`・`ComboboxInputGroupContext` のようなパーツ Context は、汎型でも型エイリアスにします。実装は `useSui...` 名で、`React.use()` + `ContextMissingError` にします。短名の再輸出も同じファイルに置きます。

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
  /**
   * @template TItem 項目の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
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

- 汎型でない Context はオーバーロードを書きません。汎型でもパーツ Context は型エイリアスにします。

```ts
export type IUseAccordionContext = IUseContext<AccordionContext>;
```

- 別名の `type` / `const` 宣言を足しません。再輸出行に JSDoc は付けません。
- ローカル変数は `ctx` に統一します。読み取りと `useMemo` で同じ名前にします。複数の Context を同時に読む場合だけ、`listCtx` / `groupCtx`、`chipCtx` / `itemCtx` のように用途が分かる名前にします。

```tsx
const ctx = React.use(XxxContext);
const ctx = React.useMemo<XxxContext>(() => ({ ... }), [...]);
```

- 値型は次のいずれかにします。
  - オブジェクトリテラル型 (`{ readonly ... }`)
  - `Readonly<Override<親Context, BaseUI.State>>`
  - `Readonly<XxxRootState>` (State が Context と同一の場合)
  - 状態と操作関数を分ける場合は `XxxContextState` + `Readonly<Override<XxxContextState, { readonly 操作... }>>` (例: `SidebarContext`、`FileUploadContext`、`TreeContext`)
- 一部のキーだけ上書きして子へ伝える派生コンテキストは `useMemo` + スプレッドにします。意図が分かる範囲で上書きキーを最小化し、横に意図注釈を残します (例: `SidebarRoot` の `side/variant/collapsible`)。`InputGroup`・`Chip`・`Popup`・`Group` のように Base UI の state を合成するだけの場合は、`proxyRenderProps` の `(state) => ({ ...ctx, ...state })` を使い、別の `useMemo` Context を作りません。

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

- `Group` のように上位の `items` を未指定でも上書きして透過を遮断する場合は、その意図をコメントで残すことが望ましいです (`combobox/group` の実装にはコメントがないため、新設時は注意します)。
- namespace には値型があれば追加します。
- 短名再輸出は束縛を作りません。ファイル内部 (JSX 含む) は正式名のままにします。
- 他パーツが内部フック (`useSuiXxxContext`) を使いたい場合は、公開済みの `useXxxContext` を相対 import します。内部フックは export しません。
- ルート以外の Context (`ComboboxItemContext`・`AccordionTriggerContext` を例とします) は値伝播やパーツ状態用の型にし、短名は対象名に合わせます (`ItemContext` / `useItemContext`、`TriggerContext` / `useTriggerContext`)。ルート以外で `Context` / `useContext` を使いません。

### パーツ Context

合成 state を持つ Base UI ラッパーは、そのパーツの Context を所有ディレクトリーの `<kebab>.<パーツ>.context.ts` に持ちます (`input-group/combobox.input-group.context.ts` をひな形とします)。

- 値型は対応する `State` の `Readonly` 別名にします (`ComboboxInputGroupContext<TItem> = Readonly<Override<ComboboxContext<TItem>, Combobox.InputGroup.State>>`)。独自 Suru UI 状態を持つ場合 (例: Chip の `variant`) は値型にも含めます。型が所有パーツのファイルにあるときは `import type` で参照します (実行時循環を作りません)。
- React コンテキスト・`IUse...` フック (`useSui...` 実装 + `ContextMissingError`)・短名再輸出 (`<対象>Context` / `use<対象>Context`) を同じファイルに置きます。`providerName` は所有パーツにします。
- `State` が親 Context と同一で変更・拡張がない場合 (例: `ComboboxAddonState` は `ComboboxInputGroupContext` そのもの) は独自定義を作りません。その旨のコメントを残し、親をリネーム再輸出するだけにします。汎用の短名 (`Context` / `useContext`) は再輸出せず、バレルの `export *` 衝突を避けます。

```ts
import {
  InputGroupContext,
  useInputGroupContext,
} from "../input-group/combobox.input-group.context.js";

// ComboboxAddon は Context を変更・拡張しないため、親の ComboboxInputGroupContext をそのまま使う。
export {
  InputGroupContext as AddonContext,
  useInputGroupContext as useAddonContext,
  InputGroupContext as ComboboxAddonContext,
  useInputGroupContext as useComboboxAddonContext,
};
```

- Portal のように Base UI の `State` が空で、`render` の外へ `children` を出すパーツは、親 Context を再輸出し、理由をコメントで残します (`combobox/portal/combobox.portal.context.ts` を参照)。
- 提供は `render` を関数にして自パーツの Context で `RenderElement` を包みます。外側の親 Context 提供は残します (`Base UI ラッパーの state 合成` を参照)。
- 状態を持たない非要素 (`State = {}` の Collection / ItemLabel、Base UI のみを中継する Value など) も、短名を揃えるために Context ファイルを持つ場合があります。状態を拡張しないなら親の再輸出にします。
- 各パーツは原則として**最も近い親 Context** を読みます。`ComboboxInput` は `useComboboxContext` ではなく `useComboboxInputGroupContext`、`ComboboxList` は `useComboboxContext` ではなく `useComboboxPopupContext` を読みます。ただし、ルート直下に置かれる想定のパーツや、ルートの全項目に適用されるパーツはルート Context を読みます (`ComboboxCollection`・`ComboboxValue`・`ComboboxInputDisplay`・`ComboboxTriggerLabel` を参照)。

### State の継承

スタイル情報 (`size`・`radius`・`separator` など) は Context に置き、`State` へ合成して子パーツへ伝播します。`card`・`accordion`・`button` を例とします。

- ルートの `State` は Context の値型をそのまま使うか、Base UI のルートなら `Override<Context, BaseUI.State>` で合成します (`CardRootState = CardContext`、`AccordionRootState<TValue> = Override<AccordionContext, Accordion.Root.State<TValue>>`)。
- Context が操作関数を含み、描画 state に含めたくない場合は、描画用の `renderState` と Context 用の `ctx` を分けます (`FileUploadRoot`・`SidebarProvider` を参照)。`useRender` には `renderState`、Context には `ctx` を渡します。
- 子パーツの `State` は上位パーツの `State` と同じにするか、独自の Base UI の `State` がある場合は `Override<上位Context, BaseUI.State>` で拡張します (`CardTitleState = CardHeaderState`、`AccordionHeadingContext = Readonly<Override<AccordionItemContext, Accordion.Header.State>>`)。パーツ自身の Context が `Readonly` なら `State` はその Context の別名にします (`AccordionItemState = AccordionItemContext`、`AccordionHeadingState = AccordionHeadingContext`)。
- パーツ独自の Suru UI の状態は `Override` を入れ子にして足します。交差 (`&`) で足しません (`AccordionTriggerState = AccordionTriggerContext` で、Context 側が `Readonly<Override<Override<AccordionItemContext, Accordion.Trigger.State>, { unstyled: boolean }>>` です)。
- 素の要素の子は Context を読み、`useRender` の `state` にそのまま渡します (`const ctx = useCardContext(); ... state: ctx`)。Base UI ラッパーの子は `proxyRenderProps` で合成します。Context が先、Base UI の `state` が後です (`(state) => ({ ...ctx, ...state })`)。独自フラグは末尾に足します (`(state) => ({ ...ctx, ...state, unstyled })`)。
- 子が読む Context は、そのパーツが必ず置かれる範囲のものにします (`AccordionIndicator` は Trigger の中にあるとは限らないため `TriggerContext` ではなく `ItemContext` を読みます)。
- Context の値型は対応する `State` の `Readonly` 別名にします (`AccordionTriggerContext = Readonly<AccordionTriggerState>`)。
- Inner の State を手で組み立てる場合は、`proxyRenderProps` の第 1 引数に state を渡す形も使えます (`tree/item/tree.item.tsx`)。Base UI の state を捨てて、自前の state だけを `className`・`style`・`render` に渡したいときだけにします。

### フックラッパー定型

Base UI フックの薄いラッパーは `useSui...` 名の関数にし、短名を同ファイルで再輸出します。`use-filter/combobox.use-filter.ts` / `use-filtered-items/combobox.use-filtered-items.ts` を例とします。

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

- 型・interface・関数に JSDoc を付けます。`@template` は実装の型引数に合わせます。
- フックが状態を持つ場合は、コンポーネント内の `_<kebab>.ts` に `IUse<Comp>StateOptions` / `IUse<Comp>State` / `use<Comp>State` を置く場合があります (`pagination/_pagination.ts`)。公開しない内部フックです。

### 型の置き方

1 パーツ内は Base UI 由来、独自の値型、`Value`・`State`、`Props` の順にします。`Props` を最後にします。`root/combobox.root.tsx` を例とします。

- `State` は Base UI から取ります。スタイル情報を伝播する場合は Context と合成します (`State の継承` を参照)。状態を持たない素の要素・非要素は空オブジェクト (`= {}`) にします (`ComboboxCollectionState` など)。
- 型引数名は必ず `T` 始まりにします (`TItem`・`TValue`・`TMultiple`)。複数選択の有無は `TMultiple extends boolean | undefined` にし、合成の公開面では `const` 修飾子を付けます (`<TItem = any, const TMultiple extends boolean | undefined = ...>`)。
- テーマ由来の修飾値型はテーマ型をそのまま使います (`Color = Color`、`Size = Size`)。`Radius` はコンポーネントの形状に応じて次のいずれかにします。
  - `"none" | Size` — ポップアップ・カード・タブ・アコーディオンなど、丸形・円形を持たないもの
  - `"none" | Size | "full"` — メーター・スライダー・画像など、完全な丸形だけを持つもの
  - `"none" | Size | "full" | "circle"` — 入力欄・ボタン・バッジ・チップなど、丸形と完全な円形を持つもの
  - `"none" | ButtonSize | "full" | "circle"` — ボタン系で `xs` を含むもの
  - `"none" | Size | "circle"` — `full` を持たず円形だけを持つもの (例: `Textarea`)
- テーマにない独自の修飾値型だけ union リテラルにし、各値を箇条書きで説明します。

```ts
/**
 * コンボボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ComboboxRootVariant = "naked" | "liquid";
```

- `ColorTemplate` と一致する `Variant` (`"solid" | "naked" | "liquid"`) はテーマ型 `ColorTemplate` を使います (`ButtonRootVariant`・`ChipRootVariant`・`TabsContextActiveVariant` など)。
- 別 prop に連動する既定値は `@default` を付けず参照先を示します (例: `既定値は {@link ComboboxRootProps.size|size} です。`)。`size` と `radius` の対応表のように複雑な既定値は Markdown の表で示します (`ButtonRootProps.radius` を参照)。
- コメント `// [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。` の次の行は、確認した実際の型名にします (`// AccordionRootProps より:`、`// NativeButtonProps より:`)。Base UI の型名が `AriaCombobox.Props`・`AriaComboboxProps` のように実体と一致している場合は、そのまま残します。
- 独自 props のキー順は自動整形に任せます。

## Props 分解

### 4 区分

`Props` は namespace で 4 区分に分け、`&` で結合します。

| 区分     | 内容 | 型の形 |
| -------- | ---- | ------ |
| `Render` | 状態を持つ props | `RenderProps<State>` / 状態を持たない場合は `{}` |
| `SuruUI` | Suru UI 独自 props。JSDoc はここだけに書く | オブジェクト |
| `BaseUI` | Base UI 由来 props。Base UI ラッパーは明示列挙の `Pick`、素の要素は `{}` | `Omit<Pick<..., ...>, keyof Render \| keyof SuruUI>` / `{}` |
| `HTML`   | 同じ型からの残余 | `Omit<..., keyof Render \| keyof SuruUI \| keyof BaseUI>` / `{}` |

- `Render` / `SuruUI` / `BaseUI` / `HTML` 自体に JSDoc を付けません。区分の並び順は自動整形に任せます。
- 結合した `Props` 本体には `/** {@link Xxx} に渡す props です。 */` を残します。汎型は `@template` を付けます。
- 他コンポーネントの型を参照する場合は、そのコンポーネントが公開する短名 namespace を使うのが原則です (`Card.CardRootProps.SuruUI` ではなく `Card.Root.Props.SuruUI`、`Card.CardRootState` ではなく `Card.Root.State`)。基点になるコンポーネントの `Props` 全体が要る場合 (例: ToggleButton が Button を包む) も `Button.ButtonRootProps` ではなく `Button.Root.Props` を参照します。ただし、内包先が短名を公開していない場合や、型の由来を明示したい場合は長名を使うことがあります (`TreeItemProps.HTML` は `Button.ButtonRootProps.HTML`、`ToggleButtonRootProps` は `Button.ButtonRootProps.SuruUI` を参照)。
- HTML 属性と衝突する名は避け、別名にします (例: `title` と区別する `htmlTitle`)。

### テンプレート A: 素の要素

`CardTitle` / `CardHeader` を例とします。

```tsx
import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

export namespace CardTitleProps {
  export type Render = RenderProps<CardTitleState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}
```

- `BaseUI` がなくても `= {}` を残します。`HTML` の `| keyof BaseUI` を省略しません。
- `HTML` は `React.ComponentProps<"xxx">` ではなく `BaseUIComponentProps<"xxx", never, never>` から取ります。
- DOM を描画しない非要素でも、Base UI の props を中継する場合はテンプレート D や通常の Base UI ラッパーにします。何も中継しない場合だけ `Render = {}`・`BaseUI = {}`・`HTML = {}` にします (`ComboboxCollection` は `HTML = {}` ですが、`BaseUI` は `children` をレンダラー型に強化しています)。`children` にレンダラー型を持たせる場合はテンプレート D にします。
- `Value` のように Base UI の props を持つが DOM を描画しないパーツは、通常の Base UI ラッパーとして `RenderProps` と `BaseUI` / `HTML` を持てます。DOM の有無だけで機械的に `{}` にしません。

### テンプレート B: Base UI ラッパー

`ComboboxPopup` / `AccordionItem` を例とします。

```tsx
export namespace ComboboxPopupProps {
  export type Render = RenderProps<ComboboxPopupState>;

  export type SuruUI = {
    /**
     * ポップアップに枠線を表示するかどうかを指定します。
     *
     * 省略時はコンテキストの `outlined` を使います。
     */
    outlined?: boolean | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxPopupProps より:
      | "initialFocus"
      | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}
```

- `BaseUI` は `Omit` で残余を取るのではなく、`Pick` + `Omit` で取り出すキーを明示列挙します。列挙前に Base UI の `.d.ts` を確認し、どのキーを取り出すか決めます。根拠コメントを残します。
- `HTML` はタグ (`React.ComponentProps<"xxx">`) ではなく、同じ Base UI コンポーネントの残余です。`keyof Render | keyof SuruUI | keyof BaseUI` で除きます。
- 取り出すキーがない場合は `BaseUI = {}` にします。他コンポーネントの `BaseUI` を土台にしている場合は、継承関係を示すために `Omit<Pick<Inner.BaseUI, never>, keyof Render | keyof SuruUI>` を残す場合があります (`PasswordFieldAddon` を参照)。
- 独自 props がなくても `SuruUI = {}` を残します。`keyof SuruUI` が `never` でも `Omit` から除きません。将来の追加漏れを防ぐためです。
- Context 値へフォールバックする独自 prop は「省略時は...を使います。」と JSDoc に明記します (`size = ctx.size` などの実装と対応させます)。
- `SuruUI` を他コンポーネントから継承する場合は `Card.Root.Props.SuruUI & { ... }` のように交差で足します (`AlertDialogPopup` を参照)。全部要らない場合は `Omit` で除きます。

### テンプレート C: 汎型

`ComboboxRoot` を例とします。テンプレート B に汎型を足した形です。

```tsx
export namespace ComboboxRootProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * リストに表示する項目の一覧です。
     *
     * グループの配列を指定するとグループごとに区切って表示します。
     */
    items?: readonly TItem[] | undefined;
    // ...color・radius・size・variant
  };

  export type BaseUI<
    TItem = any,
    TMultiple extends boolean | undefined = boolean | undefined,
  > = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Root<TItem, TMultiple>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxRootProps より:
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

`ComboboxCollection` / `ComboboxList` / `ComboboxValue` / `MeterValue` を例とします。Base UI の `children` をレンダラー型で強化する場合です。

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
    Omit<
      Pick<
        React.ComponentProps<typeof Combobox.Collection>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // ComboboxCollectionProps より:
        "children"
      >,
      keyof Render | keyof SuruUI
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
- `Value` は `children?: React.ReactNode | IComboboxValueRenderer<TItem, TMultiple>` にします。DOM を描画しなくても Base UI の props を持つ場合は `Render`・`BaseUI`・`HTML` を通常どおり残します。
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

- 実装は `proxyRenderProps` の `render` 関数内で `RenderElement` の `render` に `children` を渡し、自パーツの Context で包みます。`<Combobox.Trigger render={children} />` のように直接渡しません (`combobox/trigger/combobox.trigger.tsx` を参照)。
- JSDoc には `children` が render 関数である旨を明記します。`SelectTrigger` のような通常 `children` との不一致を放置しません。

## 継承パターン

`Outer` の Base UI (`Combobox.Item`・`Menu.Item`・`AlertDialog.Popup` など) の `render` 内で `Inner` の Suru UI (`Button.Root`・`Card.Root` など) を描画する場合です。`ComboboxItem` / `AlertDialogPopup` を例とします。

### 型

- `State`: `Override<Inner.State, Outer.State>` にします (`Override<Button.Root.State, Combobox.Item.State>`)。Context がすでに `Readonly<Override<...>>` なら `State` はその Context の別名にします。
- `SuruUI`: 継承しない場合は `{}` のままにします。`Inner` の `SuruUI` から継承する場合は全部要るときだけ代入し、不要キーだけ `Omit` します。一部だけ要る場合は必要なキーだけ定義します。`Card.Root.Props.SuruUI & { variant }` のように交差で足す場合もあります。
- `BaseUI`: `Override<Inner.BaseUI, Omit<Pick<Outer, ...>, keyof Render | keyof SuruUI>>` にします。`Outer` が勝ちます。`value` のように型を強化するキーは内側の `Override` で上書きします (`{ value?: TValue }`)。
- `HTML`: 通常通り `Omit<Outer, keyof Render | keyof SuruUI | keyof BaseUI>` にします。`Inner` の HTML を土台にすることもあります (`TreeItemProps.HTML` は `Button.ButtonRootProps.HTML` から取ります)。
- `Outer` の状態から求める `Inner` の `HTML` prop が要る場合 (例: `state.disabled` → `disabled`) は、型に `Pick<Inner.HTML, "disabled">` を交差させて同じオブジェクトに入れます。

```tsx
export namespace ComboboxItemProps {
  export type Render = RenderProps<ComboboxItemState>;

  export type SuruUI = {};

  export type BaseUI<TValue = any> = Override<
    Button.Root.Props.BaseUI,
    Override<
      Omit<
        Pick<
          React.ComponentProps<typeof Combobox.Item>,
          // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
          // NonNativeButtonProps より:
          | keyof NonNativeButtonProps
          // ComboboxItemProps より:
          | "children"
          | "onClick"
          | "index"
          | "value"
          | "disabled",
          keyof Render | keyof SuruUI
        >,
        {
          value?: TValue;
        }
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}
```

### 実装手順

1. `props` から `Inner` の `SuruUI` キー、`Render` のすべて (`style`・`render`・`className`)、共有の `BaseUI` キーを分解し、残りを `...otherProps` にします。`render` の既定値は `RenderElement` の `defaultTagName` に任せるか、必要な場合だけ `render ?? <div />` を渡します。
2. `Outer` 独自の `BaseUI` (`baseuiProps: Required<Own.BaseUI>`) を `Outer` に `{...otherProps} {...baseuiProps}` で渡します。共有キーがなければ作りません。
3. `Inner` 独自の `SuruUI + BaseUI` (`innerProps: Required<Inner.SuruUI & Inner.BaseUI>` または `buttonRootProps`・`cardRootProps`) を `mergeProps` の第 2 要素にします。除外交差したキーは `undefined` を明示します。`Outer` の状態から求める値はここで埋めます (`disabled: state.disabled`)。
4. `Outer` の `render` で `Inner` を描画し、`proxyRenderProps` には `Render` をすべて渡します。`mergeProps` の順序 (`htmlProps` → `innerProps` → `proxyRenderProps` 結果) は変えません。
5. 項目値を子孫へ伝える場合は `ComboboxItemContext` のようなサブコンテキストに `value` を入れて包みます。`proxyRenderProps` の state 合成順は、外側の Base UI の state を後ろにするか、内側の state を後ろにするかを意図に合わせます。
   - Context のスタイル情報を先にし、Base UI の state を後ろにする: `(state) => ({ ...ctx, ...state })`
   - 外側の state を先にし、内側の state を後ろにする: `(state) => ({ ...popupState, ...cardState, variant })`
6. どちらの props オブジェクトも `Required` を省略しません。漏れ防止のためです。
7. 公開しない `Inner` の `SuruUI` キーは内包先オブジェクト側で埋めます (固定値・`ctx` 値・`undefined` のいずれか)。
8. `Outer` を介さず `Inner` を直接描画する場合は、`proxyRenderProps<Inner.State, OwnState>(state, { ... })` の第 1 引数に明示 state を渡す形も使えます (`TreeItem` を参照)。

```tsx
export const ComboboxItem: IComboboxItem = function SuiComboboxItem(props: ComboboxItemProps) {
  const listCtx = useComboboxListContext();
  const groupCtx = useComboboxGroupContext(true);
  const ctx = groupCtx || listCtx;
  const {
    index,
    style,
    value,
    render,
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

  return (
    <Combobox.Item
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, itemState) => {
        const buttonRootProps: Required<
          Button.Root.Props.SuruUI &
            Button.Root.Props.BaseUI &
            Pick<Button.Root.Props.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          thin: undefined,
          color: "grey",
          muted: undefined,
          radius: undefined,
          pending: undefined,
          squared: undefined,
          variant: "naked",
          disabled: itemState.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps<Button.Root.State, ComboboxItemState>(
                (buttonState) => ({ ...ctx, value, ...buttonState, ...itemState }),
                {
                  style,
                  render: (htmlProps, state) => (
                    <ComboboxItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render}
                        htmlProps={htmlProps}
                        defaultTagName="div"
                      />
                    </ComboboxItemContext>
                  ),
                  className: cn<ComboboxItemState>(
                    className,
                    "sui_combobox_item",
                    (state) => state.disabled && "sui_combobox_item-disabled",
                    (state) => state.selected && "sui_combobox_item-selected",
                    (state) => state.highlighted && "sui_combobox_item-highlighted",
                  ),
                },
              ),
            ])}
          />
        );
      }}
    />
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
  /**
   * @template TItem 項目の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
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
- ボタン系の既定値は `nativeButton = false`、`aria-label` (例: `"候補リストを開閉"`、`"選択値を消去"`)、`children = <ClearIcon />` (共有 `../../_icons.jsx` から import) の形にします。
- 制御・非制御の状態は `@base-ui/utils/useControlled` を使い、`{ name, state, default, controlled }` を渡します。`onValueChange` など利用者コールバックは、内部状態の更新と同じ関数でまとめます (`SidebarProvider`・`FileUploadRoot` を参照)。

### Root 定型

Root は次の 4 つに分かれます。どれも `data-scope` はスタイル起点になる場合だけ付けます。

#### DOM を持たない Base UI Root

`ComboboxRoot` を例とします。Root 自身が HTML 要素を描画しない場合は、Context 提供に徹し、スタイルは子 (例: InputGroup / Portal などスタイル起点となる子) に持たせます。

```tsx
export const ComboboxRoot: IComboboxRoot = function SuiComboboxRoot(props: ComboboxRootProps) {
  const {
    size = "md",
    color = "grey",
    items,
    radius = size,
    variant = "naked",
    disabled = false,
    multiple = false,
    readOnly = false,
    required = false,
    itemToStringLabel = defaultItemToStringLabel,
    itemToStringValue = defaultItemToStringValue,
    ...otherProps
  } = props;
  const ctx = React.useMemo<ComboboxContext>(
    () => ({ size, color, items, radius, variant, multiple, outlined: false, itemToStringLabel }),
    [size, color, items, radius, variant, multiple, itemToStringLabel],
  );

  return (
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
  );
};
```

- `items`・`disabled`・`multiple` など Base UI へ渡す主要 props は明示列挙で渡し直します。残余任せにしません。
- Root が所有しない修飾 (例: `InputGroup` が所有する `outlined`) は props に置きません。`ctx` には既定値を直書きします。
- スタイル props (`size` など) を `BaseUI` へ渡しません。Context で子へ伝えます。

#### DOM を持つ Base UI Root

`AccordionRoot` / `TabsRoot` を例とします。Root 自身が HTML 要素を描画する場合は、Root が `data-scope` 起点になり、修飾 (`size`・`radius`・`separator` など) を Context として子へ伝え、状態クラスを自身に集約します。子が修飾を読まない場合は Context を作りません (`FieldRoot`・`FormRoot`・`MenubarRoot`)。

```tsx
const {
  size = "md",
  items = [],
  style,
  radius = "none",
  render,
  children = defaultItemRenderer,
  className,
  separator = true,
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
            (state) => `sui_accordion-orientation_${state.orientation}`,
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
- 汎型は `TItem` (表示対象) と `TValue` (項目値) の 2 軸にし、公開面は `<TItem = any, TValue = $InferItemObjectValue<TItem>>` で値型を推論します。`TMultiple` を持つ `ComboboxRoot` と混同しません。
- `children` が関数のときだけ `items.map(children)` し、それ以外はそのまま描画します。既定値は `defaultItemRenderer` にします。
- `Radius` はテーマに `full` が要らない形状では `"none" | Size` にします。`"none" | Size | "full" | "circle"` の定型と混同しません。

#### DOM を持つ素の要素 Root

`CardRoot` / `ChipRoot` / `SidebarProvider` を例とします。Base UI を挟まず、`useRender` で要素を作り、Context を提供します。

```tsx
export const CardRoot: ICardRoot = function SuiCardRoot(props) {
  const {
    size = "md",
    radius = size,
    outlined = true,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const ctx = React.useMemo<CardContext>(
    () => ({ size, radius, outlined }),
    [size, radius, outlined],
  );
  const element = useRender({
    props: [
      otherDivProps,
      {
        className: cn<CardRootState>(
          "sui_card",
          (state) => `sui_card-size_${state.size}`,
          (state) => `sui_card-radius_${state.radius}`,
          (state) => state.outlined && "sui_card-outlined",
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return <CardContext value={ctx}>{element}</CardContext>;
};
```

- 素の要素は `useRender` で作り、JSX を直書きしません。
- `className` は分解せず残余に残し、`cn` に含めないのが原則です (利用者の `className` は `useRender` が自動でマージします)。独自の className マージが必要な場合だけ、`className` を分解して `cn` の先頭に置きます (`AvatarGroupRoot` を参照)。
- Context が操作関数を含む場合は、`renderState` と `ctx` を分け、`useRender` の `state` には `renderState` を渡します (`FileUploadRoot`・`SidebarProvider`)。

#### Context を持たない Root

`FieldRoot` / `FormRoot` / `MenubarRoot` を例とします。子へスタイルを伝えない Root は Context を作らず、`className` に `cn` を直接渡します。

```tsx
export const FieldRoot: IFieldRoot = function SuiFieldRoot(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Field.Root
      {...otherProps}
      className={cn(
        className,
        "sui_field",
        (state) => state.disabled && "sui_field-disabled",
        (state) => state.touched && "sui_field-touched",
        (state) => state.dirty && "sui_field-dirty",
        (state) => state.valid === false && "sui_field-invalid",
        (state) => state.valid === true && "sui_field-valid",
        (state) => state.valid === null && "sui_field-unverified",
        (state) => state.filled && "sui_field-filled",
        (state) => state.focused && "sui_field-focused",
      )}
      data-scope={dataScope}
    />
  );
};
```

- Base UI が `render`・`style`・`className` をそのまま受けられる場合、`proxyRenderProps` を作りません。Context を state に合成するときだけ `proxyRenderProps` を使います。
- `render` を利用者へ渡す必要がない場合も、Base UI の既定要素をそのまま使います。

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
            (state) => state.disabled && "sui_accordion_item-disabled",
          ),
        },
      )}
    />
  );
};
```

- `render`・`style`・`className` の 3 つを分解し、`proxyRenderProps` の戻り値を Base UI へ展開します。残余へ残しません。
- 合成関数は `(state) => ({ ...ctx, ...state })` にします。Context が先、Base UI の `state` が後です。`unstyled` のような独自フラグは末尾に足します (`(state) => ({ ...ctx, ...state, unstyled })`)。
- 合成 state を持つ Base UI ラッパーは、そのパーツの Context を子孫へ提供します。`render` を関数にして自パーツの Context で `RenderElement` を包みます (`defaultTagName` は Base UI の既定要素。`children` 付け替えの Trigger は、`render` 関数内の `RenderElement` に `children` を渡して同様に包みます)。外側の親 Context 提供は残します。
- Context を持たない薄いラッパーは `render` をそのまま渡します (`ComboboxPortal`)。`proxyRenderProps` は、自パーツの Context を提供しない場合でも、親 Context のスタイル情報を `State` に合成して `className` を作るときに使います。
- 子パーツの `State` 型は `Override<上位Context, BaseUI.State>` にします (`State の継承` を参照)。
- クラス名はマージ後の state で作ります。state に含まれる値は state 関数 (`(state) => state.size`) で作り、クロージャー変数を使いません。state に含まれない静的 prop (`inputPosition` など) や、Base UI の state に含まれないフラグ (`MenubarRoot` の `disabled` など) はクロージャー変数で作る場合があります。
- `render` の既定要素は `RenderElement` の `defaultTagName` に任せます。`render` を省略できる場合は `render = <div />` を分割代入に書きません。内包先の既定要素と異なる要素を既定にしたい場合だけ `render ?? <div />` を明示します。

### useRender 定型

素の要素を作る場合のみ使います。`AccordionIndicator` / `CardTitle` を例とします。

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

- `state` を渡す場合は、Context の値か、`useMemo` で作った描画用 state を渡します。Context に操作関数が含まれる場合は `renderState` を使います。
- HTML 既定値は第 2 要素に直書きせず、props から既定値付きで分解して渡します。上書き可能にするためです。
- 修飾がなく基底クラスのみなら `cn` を使わず文字列で渡します。
- 残余の命名はそのまま渡すなら `props`、分解するなら `other<DefaultTagName>Props` (例: `otherDivProps`) にします。`defaultTagName` の HTML 属性を取り出しておらず残余がそのまま渡せる場合のみ `<defaultTagName>Props` (例: `divProps`) にします。`otherProps` などの汎名は原則使いませんが、複数タグの共通処理や内包先へそのまま渡す場合は使うことがあります (`Resizable` を参照)。
- 独自の CSS カスタムプロパティーを要素へ渡す場合は `style` 関数で合成します (`TreeItem` の `--sui_tree_item-level` を参照)。

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
  (state) => state.outlined && "sui_combobox-outlined",
  (state) => state.multiple && "sui_combobox-multiple",
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
    `sui_combobox-popup_side_${state.popupSide.replaceAll("-", "_")}`,
  (state) => state.listEmpty && "sui_combobox-list_empty",
  (state) => state.placeholder && "sui_combobox-placeholder",
)
```

- 3 値 (`valid === false/true/null`) のように肯定・否定の両側が要る状態は等価比較でクラス化します。
- 複数語の属性名は snake_case にします (`popup_side`・`list_empty`・`transition_status`・`active_variant`・`tab_activation_direction`)。ケバブを含む状態値は `replaceAll("-", "_")` でスネーク化します。
- `proxyRenderProps` で Context を state に合成するパーツでは、修飾クラスをクロージャー変数でなく state 関数で作ります (`(state) => \`sui_accordion-size_${state.size}\``、`(state) => state.separator && "sui_accordion-separator"`)。真偽値も `(state) => state.unstyled && ...` にします。

## 状態と見た目の集約

### 4 原則

1. `data-scope=""` は CSS の `@scope` 始点 (スタイル起点) だけに付けます。付け忘れ・付け過ぎの両方を避けます。Root が DOM を持たない場合はスタイル起点となる子 (例: InputGroup / Portal) が起点になります。TriggerLabel のように `@scope` の起点だが `data-scope` を持たないパーツもあります。複数のスタイル起点を持つコンポーネント (例: Sidebar の Provider / Root / Rail / Trigger) は、それぞれの要素に付けます。
2. 状態クラスはスタイル起点の要素に集約します。分散させません。Root が DOM を持たない場合の起点は対象のコンポーネントが定めます (例: 入力系の状態を持つ InputGroup とポップアップ系の修飾を持つ Portal)。
3. SuruUI 由来の値・フラグ・バリアントは原則として最上位の `SuruUI` に集約し、Context で子へ伝えます。Context の値は `State` に合成し、`render`・`className`・`style` から読めるようにします (スタイル情報の state 化。`State の継承` を参照)。ただし独立装飾を持つ子 (例: `color/radius/variant` を持つ Chip、`outlined/inputPosition` を持つ Popup、`outlined` を持つ InputGroup、`radius` を持つ ChipRemove など) は、Context フォールバック付きの独自 `SuruUI` + 自身要素への修飾クラスを許します (`color = ctx.color` + `sui_combobox_chip-color_${color}` を例とします)。同名 prop の二重管理にならないよう、フォールバック元を JSDoc に明記します。
4. Base UI の `data-*` 属性を CSS セレクターに使いません (`[data-scope]` を除く)。状態装飾は `cn` の状態関数による自前クラスで行います。ただし、内包先の Base UI が状態を持ち、内側の要素へクラスを付けられない場合 (例: `Button` を項目として使うときの `[data-highlighted]`) や、外部ライブラリの属性 (例: react-resizable-panels の `[data-separator]`) は、理由コメント付きで例外にします。

真偽状態は `sui_<基底>-<状態>`、値付き状態は `sui_<基底>-<属性>_<値>` にします。属性名・状態名が複数語になる場合は snake_case にします。

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
- 子の見た目切替は起点自身の修飾クラスを祖先セレクターで受けます (例: `&.sui_combobox-size_sm`)。起点が Portal で修飾対象が子孫の場合は、子孫セレクターで受けます (例: `&.sui_combobox_popup-input_position_top .sui_combobox`)。子の見た目切替のためだけに新規 `Context` を作りません (既存 Context の派生提供は除きます)。スタイル情報を `State` として子パーツへ伝える Context (`AccordionContext` など) はこれに当たりません。

## 一覧描画

`items` の所有は Root に集約し、描画側 (`Collection`・`List`・`Value`) はレンダラー (`children`) のみを受けます。`ComboboxCollection` / `ComboboxList` / `ComboboxValue` / `ComboboxItemLabel` を例とします。

- `items` を二重に持たせません。描画側は `items` を持たず、`Context` (`ctx.items`・`ctx.itemToStringLabel`) から読みます。`Group` のように透過を遮断する意図がある場合のみ、未指定でも上書きする旨をコメントで残すことが望ましいです (`combobox/group` の実装にはコメントがないため、新設時は注意します)。
- レンダラー型は用途ごとに定義し、別名で再利用します。

```tsx
export interface IComboboxCollectionItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @returns レンダリングする内容です。
   */
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
  (
    selectedValue: ComboboxValueType<TItem, TMultiple>,
    context: ComboboxContext<TItem>,
  ): React.ReactNode;
}

export interface IComboboxItemLabelRenderer<TItem = any> {
  (
    item: TItem,
    context: ComboboxChipContext<TItem> | ComboboxItemContext<TItem>,
  ): IComponent.Return;
}
```

- `ItemLabel` のように複数のサブコンテキストのどちらかから値を読むパーツは、両方を `optional: true` で読み、`ctx = chipCtx || itemCtx` のように選びます。どちらも無い場合は `ContextMissingError` を投げ、`contextName` / `providerName` に候補を併記します (`combobox/item-label/combobox.item-label.tsx` を参照)。

- 既定レンダラーは `switch (true)` + 型ガードにします。キーは `getItemKey(item) ?? index` にします。グループ子孫は `<ComboboxCollection>{defaultItemRenderer}</ComboboxCollection>` の形で再帰させます。型ガードの順序は項目型の包含関係に合わせます。`Collection` の既定は `isItemGroup` → `isLabeledItem` → `isPrimitiveItem` / `!isReactNode` → `default` ですが、API の `defaultCollectionItemRenderer` は `isPrimitiveItem` を先に判定する場合があります (`combobox/combobox.tsx` を参照)。
- 項目判定・props 抽出・ラベル生成が複数パーツで要る場合は、`_<kebab>.ts(x)` に `isItemObject`・`get<Comp>ItemProps`・`get<Comp>ItemLabel`・`createItemRenderer` を置き、Root と合成の両方から使います (`tabs/_tabs.tsx`・`segments/_segments.tsx`・`accordion/_accordion.ts` を参照)。公開する分解ヘルパーは `utils/<kebab>.utils.ts` に置きます (`decompose<Comp>ItemObject`)。

```tsx
const defaultItemRenderer: IComboboxCollectionItemRenderer = (item, index) => {
  switch (true) {
    case isItemGroup<ComboboxRootItemGroupObject>(item): {
      const { label, ...otherProps } = item;

      return (
        <ComboboxGroup {...otherProps} key={getItemKey(item) ?? index}>
          {isLikelyVisibleNode(label) && <ComboboxGroupLabel>{label}</ComboboxGroupLabel>}
          <ComboboxCollection>{defaultItemRenderer}</ComboboxCollection>
          {separator && <ComboboxSeparator />}
        </ComboboxGroup>
      );
    }

    case isLabeledItem<ComboboxRootLabeledItemObject>(item): {
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

const { children = defaultItemRenderer, separator = true } = props;

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

- `ItemLabel` のように `value` をサブコンテキストから読む表示専用パーツは、`children = ctx.itemToStringLabel` を既定レンダラーにし、`children(ctx.value, ctx)` を直接返します。
- `GroupLabel` のように可視判定が要る取得系は `isLikelyVisibleNode` で判定し、駄目なら `null` を返します。`mergeProps([baseProps, otherProps, { children: label }])` の順にします。
- 判定関数 (`isItemGroup`・`isLabeledItem`・`isPrimitiveItem`・`isReactNode`・`isLikelyVisibleNode`) は共有 `../_item.js` などから import し、再定義・公開しません。

### Root 内 `items` レンダラー

`AccordionRoot` / `TabsRoot` を例とします。描画先が独立パーツを持たない単純な一覧では、`Collection`・`List` に分けず Root の `SuruUI` に `items` と関数 `children` を持たせます。独立した一覧パーツ (`TabsList`・`SegmentsList`) がある場合は Root は `items` だけを持ち、一覧パーツが Context から読みます。

```tsx
export type AccordionRootItemObject = Omit<AccordionItemProps, "title"> & {
  readonly content: React.ReactNode;
  readonly title: React.ReactNode;
  readonly htmlTitle?: React.HTMLAttributes<HTMLDivElement>["title"];
};

export interface IAccordionRootItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}
```

- レンダラー型は `(item, index, items) => React.ReactNode` にし、`interface` で定義します。`Value` のように第 2 引数へ `ctx` 渡しはしません。
- 項目オブジェクト型は `Override<ItemProps, { title; content; htmlTitle? }>` などで `title`・`content` (`React.ReactNode`) を必須化し、HTML 属性と衝突する名は `htmlTitle` にします。
- 値型の推論は `_<kebab>.ts(x)` に `$InferItemObjectValue<TItem>` として置き、公開面は `<TItem = any, TValue = $InferItemObjectValue<TItem>>` にします。`accordion/_accordion.ts` のように `.ts` の場合があります。
- 判定は `_<kebab>.ts(x)` に `isItemObject` として置きます (`isObject` + `"title" in item`・`"content" in item` + `isReactNode` 判定)。バレルと公開 `index.ts` から再輸出しません。
- 既定レンダラーは `switch (true)` + `isItemObject` → `default` の順にし、キーは `getItemKey(item) ?? index` にします。`title`・`content`・`htmlTitle` は `decomposeItemObject(item)` で分離し、残余の `itemProps` を `Item` へ渡します。
- 項目の分解結果は `AccordionItemObjectDecomposition` のように `Pick<ItemObject, "content" | "title"> & { readonly itemProps: ... }` の形にします (`utils/<kebab>.utils.ts`)。

```tsx
const defaultItemRenderer: IAccordionRootItemRenderer = (item, index) => {
  switch (true) {
    case isItemObject(item): {
      const { title, content, itemProps } = decomposeItemObject(item);

      return (
        <AccordionItem {...itemProps} key={getItemKey(item) ?? index}>
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

  export type Size = ComboboxChipSize;

  export type Variant = ComboboxChipVariant;
}
```

- namespace には `State` と `Props` を必ず入れ、値型 (`Color`・`Radius`・`Size`・`Variant`・`InputPosition`・`IRenderer`・`IItemRenderer` など) があれば追加します。汎型は既定値付きで引き継ぎます (`<TValue = any>`・`<TItem = any, TMultiple extends boolean | undefined = boolean | undefined>`・`<TItem = any, TValue = any>`)。
- `Props` は区分の `namespace Props` と `&` 結合の `type Props` の 2 段にします。`|` で結合しません。`BaseUI` を落としません。
- 再輸出と namespace 内の型別名には JSDoc を付けません。`{@link X}` のみの JSDoc も付けません。
- フックの短名は同ファイルの末尾に置きます (例: `export { useComboboxFilter as useFilter };`、`export { useComboboxFilteredItems as useFilteredItems };`、`export { ComboboxItemContext as ItemContext, useComboboxItemContext as useItemContext };` など)。

## .tsx (合成)

`combobox.tsx` / `tabs.tsx` / `sidebar.tsx` を例とします。

### Types

- 合成ファイルは `<kebab>.parts.js` からパーツ・Context・公開ヘルパーをまとめて import するのが基本です。Context 型だけを参照する場合や循環を避ける場合は `./root/<kebab>.root.context.js` から `import type` してもよいです。`_<kebab>` の内部ヘルパーは直接 import します。内部専用パーツ (`BreadcrumbEllipsis` など) も直接 import します。
- Root 由来の再命名には JSDoc を付けません。名は `<Comp><型名>` にし、パーツ名を重ねません (例: `ComboboxRootItemGroupObject` → `ComboboxItemGroupObject`)。
- 型定義はすべてこのセクションに集めます。`IUse<Comp>API` も API セクションではなくここに置きます (`I<Comp>` の直前)。複数の API を持つ場合は `IUse<Comp>ListAPI` のように並べます。
- `SlotProps` は `readonly` + `| undefined` にします。キーの順序は自動整形に任せます。各キーに JSDoc を付け、`{@link Part} に渡す props です。` の形にします。子要素は原則 `Omit` で除きますが、API / Component が `children` を生成・上書きするパーツ (`empty`・`status` など) は `Omit<..., "children">` にし、生成しないパーツ (`clear`・`icon` など) はそのままにします。`value` のように利用者の `children` を既定レンダラーとして受け取れるパーツもそのままにします。項目ごとに値が決まるキー (`value`・`page`・`start`・`end` など) は、上書きするかどうかに合わせて `Omit` します。合成 `Props` に持ち上げたキーも除きます。
- `SlotProps` に他コンポーネントのパーツ (例: `ScrollAreaRootProps`・`ScrollAreaThumbProps`) を含める場合があります。その場合も JSDoc の `{@link ...}` はそのパーツを指します。
- `State` は `RootState` の別名にします。
- 合成 `Props` は `namespace <Comp>Props` の複数区分 + 交差にします。区分は「合成固有」+「持ち上げた子パーツ props」+ `Root` で、数は固定しません。重複キーは `Omit` で除きます。

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
     * 各パーツに個別の props を渡すためのオブジェクトです。
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

- 子相当やコールバックはパーツ Props から参照し、二重定義しません。トップレベルへ持ち上げる表示文言・反復要素・フラグ (`empty`・`status`・`placeholder`・`label`・`startAddons`・`endAddons`・`indicator` など) は合成 `Props` に置き、`slotProps` 側は `children` 除外にします。
- 子パーツの props がそのまま使える場合は `Pick<PartProps, "children" | "indeterminate">` のように `Pick` で持ち上げます (`ButtonProps.Content`・`ButtonProps.CircularProgress`・`SwitchProps.Thumb` を参照)。`Root` の除外には持ち上げた区分の `keyof` をすべて入れます (`ButtonProps.Root`・`SwitchProps.Root`)。
- `Segments` のように合成固有の `children` を `SegmentsListProps["children"]` から参照する場合があります。二重定義しません。

### API

`ComboboxAPI` のようなクラス + `IUse...API` フックの 2 段にします。`IUse...API` の型定義は Types セクションに置きます (例: `IUseAccordionAPI`)。複数の API を持つコンポーネント (例: `Toast` の `ToastAPI` / `ToastListAPI`) は API ごとにクラスとフックを並べます。

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

  /**
   * {@link ComboboxArrow} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  public getArrowProps(): ComboboxArrowProps | null {
    ...
  }
}

/**
 * {@link ComboboxAPI} を作成するフックです。
 */
export const useComboboxAPI: IUseComboboxAPI = function useSuiComboboxAPI<
  TItem,
  TMultiple extends boolean | undefined,
>(props: ComboboxProps<TItem, TMultiple>) {
  return new ComboboxAPI(props);
};

export { ComboboxAPI as API, useComboboxAPI as useAPI };
```

getter の規則です。

- クラス・フック・getter に JSDoc を付けます。`@link` は返すパーツを指し、`@param` は引数を説明します。
- getter 名は `get<Part>Props` にします。常に描画するパーツは Props を返し、条件付きのもの (例: `arrow`・`backdrop`・`separator` など) は `| null` を付け、`if (flag || props) return props || {}; return null;` にします。表示ノードは `get<Part>Props` ではなく `getLabel()`・`getTitle(item)`・`getItems()` のような名前にします。反復要素の props をまとめて返す場合は `get<Part>PropsList()` にします。Iterable を変換する場合は `map<...>` にします (`ButtonAPI.mapStartAddons`・`mapEndAddons`)。
- `slotProps` を各パーツ既定 `{}` 付きで分解します。利用者指定 (`slotProps.<part>`) を前に展開し、合成側の既定を後ろに置く場合はフォールバックの順にします。`slotProps` 側で `children` を `Omit` している getter (`empty`・`status` など) は `...props` の後に `children` を上書きしてよいです。`children` を `Omit` していない getter は利用者指定を破棄しない順序にします。
- `children` を持つ子の getter は `Omit<PartProps, "children"> & { children: React.ReactNode }` のように返り値を明示する場合と、`PartProps` をそのまま返す場合があります。合成所有の既定レンダラーを返す場合は `children: this.defaultItemRenderer` を入れます (`TabsAPI.getListProps`・`BreadcrumbAPI.getListProps` を参照)。
- 既定レンダラーは API の `private defaultXRenderer` に持ち、クラスフィールドのアロー関数で定義します。`Root` 側にも同じレンダラーが必要な場合は、重複を許容するか、`_<kebab>` の `createItemRenderer` に共有化します。API と Root の両方に置く場合でも、ロジックは同じにします。
- 項目あり getter (`getItemProps(item?)`・`getContentProps(item?)` など) は引数なし版と項目あり版を兼ねます。項目があるときだけ項目オブジェクトから `title`・`content` を分離して `mergeProps([props, itemProps])` します。`decomposeItemObject` が `title` を `itemProps` に移す場合、`{ title }` を二重に足しません。引数が省略可能な場合は sentinel (`const NONE = {} as never` + `item: TItem = NONE` + `item === NONE` 判定) を使います。引数名は対象に合わせます。`Value` と紛らわしい場合は `value` ではなく `item` にし、理由を `// value だと...` のコメントで残します (`ComboboxAPI.getChipProps` を参照)。`ButtonAPI.getAddonProps` のように `addon` が自然な場合は `addon` を使います。
- `placeholder` のような連鎖フォールバックは例として `slotProps.display → slotProps.input → slotProps.value → comboboxProps` の順に解決します (`ComboboxAPI.getInputDisplayProps`・`getValueProps` を参照)。
- `GroupLabel` のように可視判定が要る getter は `isLikelyVisibleNode` で判定し、駄目なら `null` を返します。返り値は `PartProps | null` にし、合成所有の既定レンダラー内では直接条件描画します。
- `Group` のようにオーバーロードが要る getter は引数なし版と項目あり版の 2 段にし、項目あり版は `label` 除外 + `mergeProps([baseProps, otherProps])` にします。
- `Item` のようにラベル付き分岐が要る getter は `isLabeledItem` で `label` を除外し、`mergeProps([baseProps, otherProps, { value: item }])` にします。
- `Root` のように Base UI コールバックを包む場合は `...otherProps` の後に `multiple`・`onOpenChange: handle...`・`itemToStringLabel` などを明示列挙で渡し直します。存在しない Base UI プロパティーを参照せず、`@ts-expect-error` で隠蔽しません。`ChangeEventDetails` の `isItemPress` のように実在するプロパティーは `.d.ts` を確認して使います。
- `ScrollArea` のように `data-scope` を受けない内包先へ渡す場合は `null` 既定 + 変数経由 (`propsWithScope`) で余剰チェックを避けます。`get<Part>Props` の JSDoc には、そのパーツがスタイル起点でない場合はその旨を残すことが望ましいです。
- `use<Comp>API` が独自フックで状態を作る場合は、フックを呼んでから `new <Comp>API(props, state)` します (`PaginationAPI` を参照)。`useXxxState` は `_<kebab>.ts` に置き、公開しません。
- 末尾に短名を付けます (`export { ComboboxAPI as API, useComboboxAPI as useAPI };`)。

### Component

汎型 interface + 単一 Root 描画、または `Object.assign` + 静的メンバーにします。静的メンバー (Context フック・`useFilter`・別パーツ) を持たない場合は `Object.assign` を使わず、素の関数にします。`Card`・`Tabs`・`Chip` を例とします。

```tsx
export interface ICombobox extends IComponent<ComboboxProps> {
  /**
   * @template TItem 項目の型です。
   * @template TMultiple 複数選択を有効にするかどうかです。
   */
  <TItem = any, const TMultiple extends boolean | undefined = false>(
    props: ComboboxProps<TItem, TMultiple>,
  ): IComponent.Return;

  readonly TriggerLabel: IComboboxTriggerLabel;
  readonly useContext: IUseComboboxContext;
  readonly useFilter: IUseComboboxFilter;
  readonly useFilteredItems: IUseComboboxFilteredItems;
  readonly useItemContext: IUseComboboxItemContext;
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
    useItemContext: useComboboxItemContext,
    useFilteredItems: useComboboxFilteredItems,
  },
);

export namespace Combobox {
  export type State = ComboboxState;
  export type Props<TValue = any, TMultiple extends boolean | undefined = boolean | undefined> = ComboboxProps<TValue, TMultiple>;
  export type SlotProps = ComboboxSlotProps;
  export type Context = ComboboxContext;
  // ...Actions・ChangeEventDetails・ChangeEventReason・Color・HighlightEventDetails・HighlightEventReason・IFilter・IFilteredItems・ItemGroupObject・LabeledItemObject・Radius・Size・Variant
}
```

- 条件付きパーツ (`| null` を返す getter) は先に変数化し、有無で条件描画します (`{xProps && <Part {...xProps} />}`)。変数化の順序は JSX の描画順に限らず、取得の依存関係やまとまりで並べます。
- 常に描画するパーツは変数化せず、実行結果をそのまま渡します (`<Part {...api.getXProps()} />`)。
- 表示ノード (`label`) は `{api.getLabel()}` の形で描画します。
- `inputInPopup` のようにツリー全体が分岐する場合は `api.isInputInPopup() ? (...) : (...)` の 2 分岐にし、両分岐で同じ getter 群を使い回します。
- 静的メンバー (`TriggerLabel`・`useContext`・`useFilter`・`useFilteredItems`) は `Object.assign` の第 2 引数に置きます。静的なパーツを公開する場合 (`Sidebar.Root`・`Toast.List`) も同じです。
- 末尾に namespace を置き、`State`・`Props`・`SlotProps`・Context と再命名型を列挙します。静的パーツのうち、型を合成 namespace に公開するものは、そのパーツの `State`・`Props` をネストした namespace にします (`Toast.List`・`Sidebar.Content` を参照)。`Combobox.TriggerLabel` のように型を公開しない静的パーツは、ネスト namespace を作りません。JSDoc は付けません。
- `I<Comp>` interface には Context フックの型 (`IUse<Comp>Context`) を静的に列挙します。持たない場合は付けません。

### 単純な合成 (単一 Root 描画)

`accordion.tsx` / `switch.tsx` を例とします。スタイル起点が Root 自身に集約しツリー分岐が要らない場合は、`Combobox` の複数区分・分岐描画を簡略化します。

- 合成 `Props` は `<Comp>` 固有 + `Root` の 2 分割 + 交差にします。持ち上げる子パーツ props がある場合は `Pick` で第 3 の区分を足します (`SwitchProps.Thumb` を参照)。第 3 区分は必須ではありません。

```ts
namespace AccordionProps {
  export type Accordion = {
    /**
     * アコーディオンのインジケーターです。
     *
     * `true` を指定すると既定のインジケーターを表示し、`false` を指定すると表示しません。
     * 表示内容を指定するとその内容で表示します。
     * 既定で表示します。
     */
    indicator?: React.ReactNode;

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

- `SlotProps` のキーは API が `children` を生成・上書きするパーツ (`content`・`item`・`indicator` など) は `Omit<..., "children">` にし、生成しないパーツ (`heading` など) はそのままにします。`AccordionIndicator` は `indicator` から `children` を生成するため Omit します。`ComboboxValue` は利用者の `children` を既定レンダラーとして受け取れるため、`children` を Omit しません。
- API の保持は、単一 Root 描画では `slotProps` + `rootProps` を基本にし、合成固有の props (`indicator`・`children`・`items` など) は必要に応じて個別のフィールドで保持します (`AccordionAPI.indicator`・`BreadcrumbAPI.breadcrumbProps`・`SegmentsAPI.segmentsProps` を参照)。スタイル起点が別にある場合 (Combobox) は `inputGroupProps` を足します。保持の数を固定しません。
- 既定レンダラーは API の `private defaultItemRenderer` に持ち、`getRootProps` で `const { children = this.defaultItemRenderer, ...otherProps } = this.rootProps; return { ...otherProps, children };` と解決します。Root パーツ側にも既定レンダラーが必要な場合は、同じロジックを Root 側にも置くか、`_<kebab>` の `createItemRenderer` に共有化します (`MenubarRoot` と `MenubarAPI` の両方に既定レンダラーがある例を参照)。
- 項目あり getter (`getItemProps(item?)`・`getContentProps(item?)`) は引数なし版と項目あり版を兼ね、`item` があるときだけ項目オブジェクトから `title`・`content` を分離して `mergeProps([props, itemProps])` します。`decomposeItemObject` が `title` を `itemProps` に移す場合、`{ title }` を二重に足しません。表示ノードは `getTitle(item): React.ReactNode` のように `get<Part>Props` ではない getter にします。
- Component は汎型 interface + 単一 Root 描画にします。Context のフックを静的に公開する場合だけ `Object.assign` で `useContext`・`useItemContext`・`useTriggerContext` を付け、namespace に `Context`・`ItemContext`・`TriggerContext` を列挙します。`Tabs`・`Segments` のように Context 型だけを提供し、フックを `src/index.ts` から別に公開する場合は、静的な `useContext` を付けません。公開面の既定値は `<TItem = any, TValue = $InferItemObjectValue<TItem>>` にします。

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

### 静的パーツを持つ合成

`Sidebar` / `Toast` を例とします。`Sidebar.Root`・`Toast.List` のようにパーツ自体を公開する場合、`Object.assign` の第 2 引数にパーツを並べ、`I<Comp>` interface に `readonly <Part>: IComponent<...>` を列挙します。

```tsx
export interface ISidebar extends IComponent<SidebarProps> {
  /**
   * サイドバー本体の要素です。
   */
  readonly Root: IComponent<SidebarRootProps>;

  /**
   * 開閉を切り替えるボタンです。
   */
  readonly Trigger: IComponent<SidebarTriggerProps>;

  /**
   * {@link SidebarContext} を読み取るフックです。
   */
  readonly useContext: IUseSidebarContext;
}

export const Sidebar: ISidebar = /*#__PURE__*/ Object.assign(
  function SuiSidebar(props: SidebarProps) {
    const api = useSidebarAPI(props);

    return <SidebarProvider {...api.getProviderProps()} />;
  },
  {
    Root: SidebarRoot,
    Trigger: SidebarTrigger,
    useContext: useSidebarContext,
    // ...
  },
);
```

- 静的パーツの `Props` は合成 namespace のネストした namespace にまとめ、`Props` を `&` 結合で再定義します (`Sidebar.Content.Props` を参照)。
- 複数の API を持つ場合は、API ごとに interface・class・フックを並べ、合成 namespace に `API` 型を列挙します (`Toast.API`・`Toast.List.API` を参照)。

## 周辺ファイル

- `_<kebab>.ts(x)` はパーツファイルと合成 (`.tsx`) からのみ import します。パーツ横断の補助 (`ItemObject` 判定・値推論・props 抽出・レンダラー生成など) を置き、バレルと公開 `index.ts` からは再輸出しません。公開する補助は `utils/<kebab>.utils.ts` に置き、バレルから再輸出します (例: `decomposeAccordionItemObject`)。
- バレル `<kebab>.parts.ts` は全パーツ・Context・公開ヘルパーを `export *` で再輸出し、各パートの CSS をパーツツリー順 (描画順) に import します。短名 (`Context` や `Root`、`ItemContext`、`useFilter` など) は各パーツファイルの再輸出から伝わります。並びは Context → `handle` → パーツツリー (描画順) → 公開ヘルパーにします。アルファベット順にしません。内部専用パーツ (例: `BreadcrumbEllipsis`) は CSS だけを import し、`export *` しません。
- `src/index.ts` には合成 (`.tsx`) の公開型と値を網羅列挙します。`/** utilities */` と `/** components */` のセクション見出しを置き、コンポーネントはアルファベット順に並べます。パーツ単体の型は列挙せず、合成の再命名型を使います。`ItemGroupObject`・`LabeledItemObject`・`IFilter` など合成 namespace が公開する型を落としません。ただし `IFilter` / `IFilteredItems` のように namespace 内だけで公開し、ルート `src/index.ts` に出さない型もあります。公開 API に含めるかを意識して選びます。値には `type` を付けず、型のみには `type` を付けます。クラス (`ComboboxAPI` など) は値として列挙します。

```ts
export {
  type ComboboxProps,
  ...
  Combobox,
  ComboboxAPI,
  useComboboxAPI,
  ComboboxContext,
  useComboboxContext,
} from "./combobox/index.js";
```

- 既定アイコンは共有 `../../_icons.jsx` に置きます。コンポーネント専用ファイルに実装しません。型は `IComponent` の素関数にし、`svg` にフォーカス外しと装飾隠しを付けます。
- 複数のコンポーネントで同じ内部ヘルパーが必要な場合は、片方の `_<kebab>.utils.tsx` を直接 import せず、共有側のコンポーネントへ移すか、同じ実装をそれぞれに置きます。現行は `menu/_menu.utils.tsx` と `context-menu/_context-menu.utils.tsx` が同じ内容を別々に持ちます。

## テストとストーリー

テストと Storybook はコンポーネント・パートと同居させます。ファイル名は変えず、置き場所だけを移します。

- パーツのテスト (`<kebab>.<パーツ>.client.test.tsx` など) はそのパートのディレクトリーに置きます (例: `combobox.input.client.test.tsx` → `input/`)。`context` は `root/` に置きます (`item-context` のように `-context` 接尾辞があるものは接尾辞を除いたパートに置きます)。
- 全体テスト (`<kebab>.client.test.tsx`・`<kebab>.layout.client.test.tsx`・`<kebab>.api.client.test.tsx`・`<kebab>.parts.client.test.tsx`・`<kebab>.parts-context.client.test.tsx`・`<kebab>.state.client.test.tsx`・`<kebab>.keyboard.client.test.tsx` など) と Story (`<kebab>.stories.tsx`) とコンポーネント固有ヘルパー (`_supports-...`・`_probe`・`_sidebar` など) はコンポーネント直下に置きます。
- Context 伝搬のテストは `render` に Probe を返してフックで読みます (void 要素も `render` 経由なら配置できます。Base UI が条件付きで描画するパーツ (例: `Clear`・`ItemIndicator`) は既定値などで描画条件を満たします)。
- スタイル起点・修飾クラス・`data-scope` のテストは `<kebab>.<part>.client.test.tsx` に置きます (`getByClassName(...).element()` で `classList` と `data-scope` を確認します)。
- ストーリー専用アセットはそのコンポーネントの `_assets/` に置き、`./_assets/...` で参照します。
- ストーリーは `preview.meta({ title, component })` と `controls(Component, {...})` を使い、自コンポーネントの `./index.js` と他コンポーネントの `../<kebab>/index.js` から import します。
- 共有のテスト基盤 (`tests/src/_locators.ts` など) は動かしません。移動後の相対 import (`../../../tests/src/_locators.js` など) は機械的に書き換えます。
- テスト内のオブジェクトキーも整形対象 (`sort-object-props`) になるため、キー順序に依存するアサーションは避けます。順序が意味を持つ場合は配列で持ちます。
- `tsconfig.*.json` の `include` / `exclude` に `{ts,tsx}` の brace 展開は使えません (TypeScript が解釈せず無黙示に外れます)。`.ts` と `.tsx` を別々に書きます。

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

- 1 パーツ 1 ディレクトリーで、中のファイル名が `<kebab>.<パーツの kebab>.tsx` である。Context は所有パーツの `<kebab>.<パーツの kebab>.context.ts`、Context・型・フックのみのパーツは `.ts` である。フックラッパーが `use-<名前>/<kebab>.use-<名前>.ts`、公開ヘルパーが `utils/<kebab>.utils.ts`、命令ハンドルが `handle/<kebab>.handle.ts` である。Context を変更しないパーツは親 Context を長名・短名の両方で再輸出し、理由コメントがある。
- CSS の import がバレルだけにあり、各パートの CSS をパーツツリー順 (描画順) に import している。DOM を持たない Root の CSS は末尾、内部専用パーツは CSS のみ import している。バレルが `export *` だけを行い、Context → `handle` → パーツツリー → 公開ヘルパーの順に並んでいる。
- パーツをまたぐ参照が相対 import で、ファイル内部では正式名を使っている。合成 `.tsx` は原則 `./<kebab>.parts.js` からまとめて import している。Context 型だけの参照は root context から直接 import してよい。
- 型だけの import が `import type { X } from "..."` になっている。値と型が混ざる場合だけ `import { type X, value }` にしている。既存コードには `I...Renderer` を値として import している箇所があるが、新規は型だけなら `type` を付ける。
- パーツ横断の補助が `_<kebab>.ts(x)` / `_<kebab>.utils.tsx` にあり、バレルと公開 `index.ts` から再輸出されていない。公開ヘルパーが `utils/<kebab>.utils.ts` にあり、バレルから再輸出されている。
- `erasableSyntaxOnly` に反する構文 (`enum`・パラメータープロパティーなど) がない。
- `IComponent` 以外で宣言していない。`Sui` / `useSui` 接頭辞を省略していない。`const` 型引数 (`TMultiple`) を落としていない。
- `useRender` 対象に JSX 直書きしていない。Base UI 対象に `useRender` を使っていない。Context を state に合成しない Base UI ラッパーで `proxyRenderProps` を過剰に使っていない。
- `useRender` 対象の `className` を分解せず、`cn` に含めていないのが原則 (`AvatarGroupRoot` のように独自マージが必要な例外を除く)。修飾なしで `cn` を使っていない。`useRender` の `state` が Context または描画用 `renderState` と一致している。
- HTML 既定値を第 2 要素に直書きしていない。上書き可能にしている。該当する場合、`aria-label`・`nativeButton`・既定子 (例: `<ClearIcon />`) が定型通りである。
- `useRender` の残余に汎名を使っていないのが原則。`other<Tag>Props` / `<tag>Props` / `props` を使い分けている。`Resizable` のように複数タグの共通処理で `otherProps` を使う例外がある。
- JSX 直書きの `cn` で `className` を先頭に置いている。該当する場合、状態値の正規化 (例: `popupSide.replaceAll("-", "_")`) と 3 値比較 (例: `valid === ...`) が正しい。複数語の属性名が snake_case である。
- `Props` を 4 区分に分け、`&` で結合している。`BaseUI` は `Omit<Pick<...>, keyof Render | keyof SuruUI>` または `{}` である。区分自体に JSDoc を付けていない。結合本体の JSDoc を残している。`Render = {}`・`SuruUI = {}`・`BaseUI = {}`・`HTML = {}` の場合も区分を落としていない。
- 短名 namespace の `Props` を `&` で結合している。`BaseUI` を落としていない。値型 (`Color`・`Radius`・`IRenderer` など) を追加している。
- 空の `SuruUI` / `BaseUI` でも、`HTML` を `Omit` する区分では `keyof SuruUI` / `keyof BaseUI` を省略していない。`HTML = {}` のパーツ (Collection・ItemLabel など) は除く。
- 型引数名が `T` 始まりである。テーマ型 (`Color`・`Size`・`ColorTemplate`) を不必要に union 再定義していない。`Radius` がコンポーネントの形状に合った union (`"none" | Size` / `+ "full"` / `+ "circle"`) である。
- 他コンポーネントの型参照に短名 namespace を使うのが原則 (`Card.Root.Props.SuruUI`・`Card.Root.State` など)。長名 (`Card.CardRootProps.SuruUI`・`Card.CardRootState`) は、内包先が短名を公開していない場合や型の由来を明示する場合だけ使う (`TreeItemProps.HTML` の `Button.ButtonRootProps.HTML` など)。
- Base UI の公開型に漏れがない。`Handle` の有無を確認している。根拠コメントの型名が実体と一致している (`// [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。`)。
- Context を持つ場合、値型が `readonly` + 汎型既定値付きである。汎型でないフック型が `IUseContext` の型エイリアス、ルートの汎型 Context だけ `IUseContext` 継承 + オーバーロードである。`ContextMissingError` の `contextName` / `providerName` が正しい。ローカル変数は `ctx`、複数 Context を読む場合だけ `listCtx` / `groupCtx` などの用途名である。派生コンテキストが `useMemo` + スプレッドで、意図注釈がある。短名がルートは `Context` / `useContext`、ルート以外は `ItemContext` / `useItemContext` のように対象名に合っている。各パーツの Context が所有ディレクトリーにあり、親と同一の場合はリネーム再輸出 + コメントになっている。Context を持たない場合 (`FieldRoot`・`FormRoot`・`MenubarRoot` のように子へスタイルを伝えない場合) は Context ファイルがない。
- 各パーツが原則として最も近い親 Context を読んでいる (`ComboboxInput` は `useComboboxInputGroupContext`、`ComboboxList` は `useComboboxPopupContext`)。ルート直下に置かれるパーツやルート全項目に適用されるパーツはルート Context を読む (`ComboboxCollection`・`ComboboxValue`・`ComboboxInputDisplay`・`ComboboxTriggerLabel`)。
- State の継承が規則通りである。ルートは `Context` または `Override<Context, BaseUI.State>`、子は上位 `State` と同じか `Override<上位Context, BaseUI.State>` で、独自の Suru UI 状態は `Override` の入れ子で足している。Base UI ラッパーの子は `(state) => ({ ...ctx, ...state })` で合成している。子が読む Context がそのパーツの必ず置かれる範囲のものである (`AccordionIndicator` は `ItemContext`)。提供の `defaultTagName` が Base UI の既定要素と一致している。操作関数を含む Context では `renderState` を分けている。
- 再輸出・再命名に JSDoc (`{@link X}` のみを含む) を付けていない。`State` / `Props` を省略していない。該当するフック短名 (例: `useFilter`・`useFilteredItems`・`ItemContext`・`useItemContext`・`TriggerContext`・`useTriggerContext` など) を落としていない。
- 一覧描画を持つ場合、レンダラー型 (例: `ICollectionItemRenderer`・`IListItemRenderer`・`IValueRenderer`・`IItemLabelRenderer`・`IAccordionRootItemRenderer` など) が定義されている。分離描画 (`Collection`・`List`・`Value`) では `children` 強化 (`Override<Omit<Pick<...>>, { children }>`) にし、Root 内描画 (Accordion) では `SuruUI` の `children: React.ReactNode | I...ItemRenderer` にする。`switch (true)` の型ガード順が項目型の包含関係に合い、`getItemKey ?? index` が正しい。項目ヘルパーが `_<kebab>` と `utils/<kebab>.utils.ts` に適切に分かれている。
- 反復要素に `key` を付けている。判定関数を公開・再定義していない。
- 再命名型にパーツ名を重ねていない。合成 namespace に `State`・`Props`・`SlotProps` と該当する再命名型 (例: `ItemGroupObject`・`LabeledItemObject`・`IFilter` 系など) を落としていない。Context は持つ場合のみ列挙する。静的パーツのうち型を公開するものはネストした namespace を列挙する (`Sidebar.Content`・`Toast.List`)。
- `SlotProps` が `readonly`・`| undefined` である。各キーに JSDoc がある。持上げキーを残していない。`children` と項目ごとの値の `Omit` 有無が生成有無と一致している。
- 合成 `Props` が `<Comp>` 固有 + 持ち上げた子パーツ + `Root` の複数区分 + 交差である。`keyof <Comp>` / `keyof Root` / 持ち上げた区分の除外が正しい。
- API がクラス + `IUse...API` + `new` 返却である。保持は `slotProps` + `rootProps` の 2 分割、または `<comp>Props` / `slotProps` / `rootProps` / スタイル起点Props (例: Combobox では `comboboxProps` / `slotProps` / `rootProps` / `inputGroupProps`)、または持ち上げた子パーツの保持を含む構成である。getter 名・`| null` が正しい。`get<Part>PropsList`・`map<...>`・`getLabel`・`is<...>` を適切に使っている。常に描画するパーツを変数化していない。可視判定なしに描画していない。`slotProps` 側を前に展開し、利用者指定の `children` を無条件上書きしていない。存在しない Base UI プロパティーを参照せず、`@ts-expect-error` で隠蔽していない。`data-scope: null` + 変数経由が必要な箇所で守られている。クラス・フック・getter に JSDoc がある。
- Component が汎型 interface + 単一 Root 描画 (Accordion) または `Object.assign` + 静的メンバー (Combobox・Sidebar) である。静的メンバーを持たない場合は `Object.assign` を使っていない。Context のフックを静的に公開する場合だけ `Object.assign` で `useContext`・`useItemContext`・`useTriggerContext` を付ける (Accordion)。`Tabs`・`Segments` のように Context 型だけを提供する場合は静的な `useContext` を付けない。ツリー全体が分岐する場合 (例: `inputInPopup`) は両ツリーで同じ getter 群を使い回している。`getLabel()` / `getTitle()` のような表示ノード getter を `{api.getX()}` で描画している。
- `data-scope` がスタイル起点のみである。Root が DOM を持つ場合 (Accordion・Card) は Root 自身が起点であり、持たない場合の起点 (例: InputGroup / Portal) が正しい。TriggerLabel のように `@scope` の起点だが `data-scope` を持たないパーツもある。複数のスタイル起点 (Sidebar の Provider / Root / Rail / Trigger) はそれぞれに付いている。状態・見た目が起点に集約されている。独立装飾の子 (例: `Chip`・`Popup` など) 以外に同名 props や修飾クラスがない。`&:has(.子修飾)` はレイアウト・入力状態・ドラッグ状態など、祖先から届かない場合に限定し、理由コメントを残す (`text-field/root`・`slider/root` を参照)。子の見た目切替のためだけの新規 `Context` がない (スタイル情報を `State` として伝える Context は除く)。Base UI の `data-*` を CSS に使っていない (`[data-scope]` と理由付き例外を除く。`[data-highlighted]` はコメントなしの既存例外)。`State` 外のクラスや CSS がない。該当する場合、ケバブを含む状態値 (例: `popupSide`) の正規化がある。
- Context を state に合成するパーツの `className` / `style` / `render` がマージ後の state で作られている。state に含まれる値は state 関数で作り、state に含まれない静的 prop (`inputPosition` など) や Base UI の state に含まれないフラグ (`MenubarRoot` の `disabled` など) はクロージャー変数で作る場合がある。合成 `.tsx` の型定義 (`IUse...API` を含む) が Types セクションに集まっている。
- 一覧描画を持つ場合、`items` を二重定義していない (分離描画では描画側が `Context` から読み、Root 内描画では Root の `SuruUI` に集約する)。`Group` の透過遮断には、可能なら意図注釈を残す。`createItemRenderer` のような共有ヘルパーを重複定義していない。
- 継承パターンに該当する場合、継承の `BaseUI` が `Override<Inner.BaseUI, Omit<Pick<Outer>, keyof Render | keyof SuruUI>>` の順である。`Required` を省略していない。除外交差キーの `undefined` 明示がある。`render` の既定が `RenderElement` か `render ?? <div />` で揃っている。`proxyRenderProps` に `Render` をすべて渡し、`mergeProps` の順序が正しい。該当する場合、サブコンテキスト (例: `ItemContext`・`TriggerContext`) の提供がある。
- `index.ts` に再輸出以外がない。公開型の列挙漏れがない。アイコンが共有ファイルにある。意図しない TODO・コピペの残骸がない。
