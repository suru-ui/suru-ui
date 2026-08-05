---
name: new-component
description: Suru UI モノレポ (`packages/react`) に新しい React コンポーネントを追加するときに使用します。新しいコンポーネントの作成、コンポーネントの追加、`*.parts.tsx` のパーツ実装、`slotProps`、グループコンテキスト、CSS クラス設計、Storybook stories、`package.json` のサブパスエクスポートを扱います。既存の Button や Checkbox と同じ方式で実装し、`@base-ui/react`（Base UI）を基盤としたヘッドレスコンポーネントをスタイル付きで公開するときに使います。
---

# 新しい React コンポーネントの追加

## 目的

Suru UI の `packages/react` に、新しい React コンポーネントを既存コーディング規約どおりに追加します。
このスキルの目的は、書き手が変わっても同じ実装ができることです。
既存コードを参考にするのではなく、ここで定めた規則を最優先で守ります。

## 併用する規範

作業前に次のスキルを読んでください。

- `../japanese/SKILL.md` — 日本語文章の規範。JSDoc とコメントはこれに従います。
- `../jsdoc/SKILL.md` — JSDoc の形式。パーツのドキュメントはこれに従います。
- `../css/SKILL.md` — CSS のみ書くときのルールはこれに従います。このスキルは CSS の詳細を繰り返しません。
- `../vitest/SKILL.md` — テストを書く場合。テスト API とモックパターンはこれに従います。

## 全体像

Suru UI は、[Base UI](https://github.com/mui/base-ui) のヘッドレスコンポーネントを基盤とするスタイル付きコンポーネントライブラリーです。
`packages/react` のコンポーネントは、Base UI のコンポーネントを包み、テーマのトークンを使った CSS を適用し、利用しやすい API を提供します。

### パッケージ構成

- `packages/core` — 全パッケージ共有の基盤（エラー基底など）
- `packages/theme` — テーマトークンと `Size`、`Color`、`ColorTemplate` などの型
- `packages/react` — React コンポーネント

テーマの型は次のとおりです（`packages/theme/src/symbols.ts`）。

- `Size = "sm" | "md" | "lg"`
- `Color = "blue" | "green" | "grey" | "magenta" | "orange" | "purple" | "red" | "yellow"`
- `ColorTemplate = "solid" | "naked" | "liquid"`

スタイル系プロパティーは `Size`、`Color`、`ColorTemplate`（または部品ごとの限定した union）を型に使います。

### ディレクトリーとファイル

コンポーネント 1 つは、`packages/react/src/<カテゴリー>/<名前>/` の 1 ディレクトリーにまとめます。
カテゴリーは既存の `buttons` と `forms` に従います。既存のどちらにも合わない場合は、作業指示者に新しいカテゴリー名を確認します。

```
packages/react/src/<カテゴリー>/<名前>/
  index.ts          // パーツと本体を再エクスポートする
  <名前>.tsx        // 公開コンポーネント本体
  <名前>.parts.tsx  // パーツ（Root、Content、Indicator など）
  <名前>.css        // スタイル
```

カテゴリーの実例として、`buttons/button/` は `index.ts`、`button.tsx`、`button.parts.tsx`、`button.css` で構成されています（`packages/react/src/buttons/button/`）。

Storybook の stories は `packages/react/stories/<カテゴリー>/<名前>.stories.tsx` に置きます。

## 実装パターン

まず実装する前に、次の中からパターンを 1 つ選びます。
選ぶ基準は次のとおりです。

1. Base UI に同じ部品のコンポーネントがあるかどうかを、`@base-ui/react` のパッケージで調べます。
2. ある場合はパターン A（そのまま包む）かパターン B（パーツを組む）で、子パーツが複数で構造を持つ場合はパターン B を選びます。
3. 複数の子をまとめて状態やスタイルを伝えるグループの場合はパターン C を併用します。
4. Base UI にない単純な要素（`span`、`svg` など）はパターン D で `useRenderElement` を使います。
5. 既存の Suru UI コンポーネントの特殊形ならパターン E で既存のパーツへ委譲します。

パターンを決めたら、次にパーツツリーを決めます。
パーツは、実装したい部品の意味的な構造から決めます。
既存の例を示します。

| コンポーネント | パーツ（ファイル内の並び順）                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| Button         | Root, Content, Pending, CircularProgress, CircularProgressTrack, CircularProgressFill, CircularProgressFillRotation |
| Checkbox       | Root, Indicator                                                                                                     |
| Field          | Root, Label, Control, Description, Error, Item, Validity                                                            |
| ButtonGroup    | Root                                                                                                                |

### パターン A（Base UI コンポーネントのラップ）

Base UI のコンポーネントをそのまま使い、クラス名と共通プロパティーを追加します。
参考実装は `packages/react/src/forms/field/field.parts.tsx`、`packages/react/src/forms/checkbox-group/checkbox-group.parts.tsx` です。

````tsx
import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./checkbox-group.css";

/**
 * {@link Root} の状態です。
 */
export type CheckboxGroupRootState = CheckboxGroup.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type CheckboxGroupRootProps = React.ComponentProps<typeof CheckboxGroup> & {
  /**
   * チェックボックスのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * チェックボックス群の向きを指定します。
   *
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical" | undefined;
};

/**
 * チェックボックスグループのルート要素です。
 *
 * @example
 * ```tsx
 * <CheckboxGroupParts.Root defaultValue={["a"]}>
 *   <Checkbox value="a" />
 * </CheckboxGroupParts.Root>
 * ```
 */
export const CheckboxGroupRoot: Component<CheckboxGroupRootProps> = function SuiCheckboxGroupRoot(
  props,
) {
  const { size: sizeProp = "md", orientation = "vertical", className, ...otherProps } = props;

  return (
    <CheckboxGroup
      {...otherProps}
      className={cn(
        className,
        "sui_checkbox_group",
        `sui_checkbox_group-size_${sizeProp}`,
        `sui_checkbox_group-orientation_${orientation}`,
      )}
    />
  );
};

export namespace Root {
  export type State = CheckboxGroupRootState;
  export type Props = CheckboxGroupRootProps;
}

export const Root: Component<Root.Props> = CheckboxGroupRoot;
````

- 既定値を付けるプロパティーは、分割代入で `プロップ名: プロップ名Prop = "既定値"` としてから上書きできるようにします。
- クラス名は `cn(className, ...)` で利用者のクラス名と合成します。
- Base UI のコンポーネントは、利用者の付けたイベントハンドラーと `className`、Render Props をそのまま通します。

### パターン B（パーツ合成コンポーネント）

公開コンポーネントが複数のパーツを組み立てます。
参考実装は `packages/react/src/buttons/button/button.tsx:76` と `packages/react/src/forms/checkbox/checkbox.tsx:43` です。

````tsx
import * as React from "react";

import type { Component } from "../../types.js";
import * as CheckboxParts from "./checkbox.parts.jsx";

/**
 * {@link Checkbox} コンポーネントのプロパティーです。
 */
export type CheckboxProps = CheckboxParts.Root.Props & {
  /**
   * Indicator 内に表示するコンテンツ（チェックアイコンなど）です。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly indicator?: CheckboxParts.Indicator.Props | undefined;
      }
    | undefined;
};

/**
 * チェックボックスを表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Checkbox>
 *   <CheckIcon />
 * </Checkbox>
 * ```
 */
export const Checkbox: Component<CheckboxProps> = function SuiCheckbox(props) {
  const { children, slotProps: { indicator: indicatorProps } = {}, ...rootProps } = props;

  return (
    <CheckboxParts.Root {...rootProps}>
      <CheckboxParts.Indicator {...indicatorProps}>{children}</CheckboxParts.Indicator>
    </CheckboxParts.Root>
  );
};
````

- 公開コンポーネントに渡せるパーツは、必ず `slotProps` として公開します。パーツ単体のプロパティーを 1 段目に直接公開しません。
- `slotProps` の各プロパティーには `readonly` を付けます。
- 本体のプロパティー（例: Button の `percentage`）とパーツのプロパティーが同名で重なるときは、パーツ側を優先し、本体側を既定値として供給します（`packages/react/src/buttons/button/button.tsx:91` の `percentage = percentageProp` の形）。
- グループ化する部品には、公開コンポーネントは存在せずパターン A の Root だけを公開するものもあります（ButtonGroup）。
  公開コンポーネントを設けるかどうかは、パーツツリーを持たない単純な部品であれば Root だけを公開します。

### パターン C（コンテキストによるグループ）

グループの Root が状態とスタイルをコンテキストで子に伝え、子がその値を読んで表示を決めます。
参考実装は `packages/react/src/buttons/button-group/button-group.parts.tsx:19` と `packages/react/src/buttons/button/button.parts.tsx:128` です。

グループ側（値の提供）:

```tsx
import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Color, ColorTemplate as Variant, Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./button-group.css";

export type ButtonGroupRootProps = Omit<
  React.ComponentProps<"div">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonGroupRootState> & {
    size?: Size | undefined;
    color?: Color | undefined;
    orientation?: "horizontal" | "vertical" | undefined;
  };

export const ButtonGroupRoot: Component<ButtonGroupRootProps> = function SuiButtonGroupRoot(props) {
  const [renderProps, componentProps] = splitRenderProps(props);
  const {
    size = "md",
    color = "grey",
    orientation = "horizontal",
    "aria-orientation": ariaOrientation = orientation,
    ...elementProps
  } = componentProps;
  const context: ButtonGroupContext = {
    size,
    color,
    orientation,
  };
  const element = useRenderElement("div", renderProps, {
    props: {
      ...elementProps,
      role: "group",
      className: cn("sui_button_group", `sui_button_group-orientation_${orientation}`),
      "aria-orientation": ariaOrientation,
    },
  });

  return <Context value={context}>{element}</Context>;
};
```

子側（値の参照）:

```tsx
export const ButtonRoot: Component<ButtonRootProps> = function SuiButtonRoot(props) {
  const group = useButtonGroupContext(true);
  const { size: sizeProp = "md", color: colorProp = "grey", ...otherProps } = props;
  const size = group?.size ?? sizeProp;
  const color = group?.color ?? colorProp;
  // ...
};
```

- 子の読み取りは必ず `useXxxGroupContext(true)` にします。オプショナル引数により、グループの外で使ってもエラーになりません。
- グループ外での既定値（例: `size = "md"`、`color = "grey"`）を子側に持ちます。
- グループの Root は、描画する要素を `<Context value={context}>` で包みます。`useRenderElement` の返り値（`element`）を children にします。

### パターン D（Render Props パーツ）

Base UI にない小物パーツ（`span`、`svg`、`circle` など）は、`useRenderElement` で描画します。
参考実装は `packages/react/src/buttons/button/button.parts.tsx:209`（Content）です。

````tsx
import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
import type { Component } from "../../types.js";

export type ButtonContentState = {};

/**
 * {@link Content} に渡すプロパティーです。
 */
export type ButtonContentProps = Omit<
  React.ComponentProps<"span">,
  keyof UseRenderElementComponentProps<{}>
> &
  UseRenderElementComponentProps<ButtonContentState>;

/**
 * ボタンのコンテンツを表示するラッパー要素です。
 *
 * @example
 * ```tsx
 * <ButtonParts.Content>ラベル</ButtonParts.Content>
 * ```
 */
export const ButtonContent: Component<ButtonContentProps> = function SuiButtonContent(props) {
  const [renderProps, componentProps] = splitRenderProps(props);
  const { ref, ...elementProps } = componentProps;

  return useRenderElement("span", renderProps, {
    ref,
    props: [
      elementProps,
      {
        className: "sui_button_content",
      },
    ],
  });
};
````

- `splitRenderProps` は `style`、`render`、`className` を分離し、残りを要素のプロパティーとして返します。
- `useRenderElement` の第 3 引数に `ref` と `props` を渡します。`props` は利用者のプロパティーと固定プロパティーの配列、または 1 つのオブジェクトです。
- 要素を条件付きで描画したいときは `enabled` に条件を渡します（`packages/react/src/buttons/button/button.parts.tsx:279`）。
- 空状態の型（`{}`）は `ButtonContentState` のような名前で定義し、`UseRenderElementComponentProps` の型引数に渡します。

### パターン E（既存コンポーネントへの委譲）

既存の Suru UI パーツと同じ構造の部品は、既存パーツへ委譲します。
参考実装は `packages/react/src/buttons/toggle-button/toggle-button.parts.tsx` です。ToggleButton は Button の Root、Content、Pending、CircularProgress をそのまま再利用しています。

```tsx
import type { Component } from "../../types.js";
import * as Button from "../button/button.parts.jsx";

export const ToggleButtonRoot: Component<ToggleButtonRootProps> = function SuiToggleButtonRoot(
  props,
) {
  const { active: activeProp, ...otherProps } = props;

  return <Button.Root {...otherProps} aria-pressed={activeProp} />;
};

export type ToggleButtonContentState = Button.Content.State;

export type ToggleButtonContentProps = Button.Content.Props;

export const ToggleButtonContent: Component<ToggleButtonContentProps> = Button.Content;
```

- 委譲するパーツは、`export namespace Content` と `export const Content` の別名まで既存パターンどおりに定義し、内部は既存のパーツを再エクスポートします。
- 既存のパーツの型（`Button.Root.State` など）を自分の型に再利用します。

## コードの共通規則

### import

- `import` のファイル拡張子は、コンパイル後の拡張子で書きます。`.ts` ファイルは `.js`、`.tsx` ファイルは `.jsx` です。
- `@base-ui/react/*`、`@suru-ui/theme` などのパッケージは拡張子なしです。
- 外部パッケージ → 相対パス → CSS の順に並べます（`packages/react/src/forms/checkbox/checkbox.parts.tsx:1`）。
- CSS はパーツファイル（`*.parts.tsx`）でのみ `import "./<名前>.css"` します。本体ファイルでは import しません。
- テーマの型は `import type { Size, Color } from "@suru-ui/theme";` で取り込みます。

### 型と関数名

- コンポーネントの型は `types.ts` の `Component<TProps>` を使います。
- コンポーネント関数には `Sui` プレフィックスを付けます。公開名 `Button` の関数は `function SuiButton` です（`packages/react/src/buttons/button/button.tsx:76`）。
- 公開定数は `export const Button: Component<ButtonProps> = ...` の形です。
- `erasableSyntaxOnly` が有効です（`packages/react/.config/tsconfig.build.json`）。`enum` と、値を持つ `namespace` は使えません。パーツの `namespace` は `State` と `Props` の型だけを入れます。

### パーツファイルのセクション構成

パーツファイルは、コンテキストとパーツを次の順で並べます。

1. `// Context` セクション（必要なら）。グループコンテキストのように複数パーツから参照するものはファイル先頭に置き、単一のパーツに属するもの（Button の CircularProgressContext）はそのパーツの直前に置きます。
2. パーツツリー順に、パーツごとに `// Root`、`// Content` のようなセクション見出し（英語）と `// ----` の区切り線を置きます。
3. パーツ内は次の順です。
   - `State` 型（`/** {@link Root} の状態です。 */` の JSDoc を付ける）
   - `Props` 型（`/** {@link Root} に渡すプロパティーです。 */` の JSDoc を付ける）
   - コンポーネント本体（説明と `@example` の JSDoc を付ける）
   - `export namespace Root { ... }` と `export const Root: Component<Root.Props> = ButtonRoot;`

見出しの例です。

```ts
// Root
// ----

export type ButtonRootState = Button.State;
```

### コンテキスト

コンテキストは次の 4 点をセットで定義します。参考は `packages/react/src/forms/checkbox-group/checkbox-group.parts.tsx:14` です。

- コンテキストの値の型 `XxxContext`（各プロパティーは `readonly`）
- `React.createContext<XxxContext | null>(null)` のインスタンス
- オーバーロード付きの読み取りフック `useXxxContext(optional?)`
- `Context` と `useContext` のエイリアス

```tsx
export type CheckboxGroupContext = {
  readonly variant: "naked" | "liquid";
  readonly color: Color;
};

export const CheckboxGroupContext: React.Context<CheckboxGroupContext | null> =
  React.createContext<CheckboxGroupContext | null>(null);

export function useCheckboxGroupContext(optional?: false): CheckboxGroupContext;
export function useCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null;
export function useCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null {
  const context = React.use(CheckboxGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "CheckboxGroupContext",
      providerName: "CheckboxGroupRoot",
    });
  }

  return context;
}

export type Context = CheckboxGroupContext;

export const Context: React.Context<CheckboxGroupContext | null> = CheckboxGroupContext;

export function useContext(optional?: false): CheckboxGroupContext;
export function useContext(optional?: boolean): CheckboxGroupContext | null;
export function useContext(optional?: boolean): CheckboxGroupContext | null {
  return useCheckboxGroupContext(optional);
}
```

- コンテキストが見つからなかったときのエラーは `ContextMissingError`（`packages/react/src/errors.ts`）を使います。`contextName` と `providerName`（コンテキストを提供する Root の名前）を渡します。
- コンテキスト値が利用者の渡す親コンポーネントの外で生成される場合は、`React.useMemo` で値を作ってレンダリングごとの再生成を防ぎます（`packages/react/src/buttons/button/button.parts.tsx:149`）。
- コンテキストを提供するときは、その値を `<Context value={context}>` の children に要素を包んで返します。

### JSDoc

- 公開する型、プロパティー、コンポーネントには必ず複数行 JSDoc を付けます。1 行形式の `/** ... */` は禁止です。
- コンポーネントの JSDoc には説明に続けて `@example` を付けます。
- 自明でない既定値には `@default` を付けます。`undefined` の場合は付けません。
- `slotProps` の各パーツプロパティーには、パーツに型をリンクする JSDoc を付けます（`packages/react/src/buttons/button/button.tsx:12`）。

### クラス名と CSS

- クラス名と CSS の規則は `../css/SKILL.md` に従います。基準実装は `packages/react/src/buttons/button/button.css` です。
- クラス名はコンポーネント名を基準に決めます。`sui_<名前>`（Root）、`sui_<名前>_<パーツ>`（Content）、`sui_<名前>-<プロップ>_<値>`（修飾子）、`sui_<名前>-<状態>`（状態）です。
- ルートのクラス属性は `cn()` で合成し、`className` の関数（Render Props）を渡せるようにします（`packages/react/src/buttons/button/button.parts.tsx:162`）。
- CSS は必ず `@layer sui.component` と、必要なら `@layer sui.important` を使い、テーマトークン（`--sui-*`）とユーティリティー関数（`--sui-space()` など）を参照します。

### `package.json` のエクスポート

新しいコンポーネントを追加したら、`packages/react/package.json` の `exports` にサブパスを追加します。
エクスポートはアルファベット順に並びます。既存の並びの該当箇所に挿入します。

```json
"./<名前>": {
  "types": "./dist/src/<カテゴリー>/<名前>/index.d.ts",
  "default": "./dist/src/<カテゴリー>/<名前>/index.js"
},
```

## 実装手順

手順は、書き手が一度に 1 つの作業に集中できるよう、短い Step に分けています。
各 Step の完了条件を満たしてから次の Step へ進みます。

### Step 1 設計

追加する部品に合う Base UI のコンポーネントを調べ、パターン（A〜E）とパーツツリーを決めます。

1. `node_modules/@base-ui/react` のパッケージ一覧から、対応する部品を探します（例: `@base-ui/react/checkbox`）。
2. 無い場合はパターン D（`useRenderElement`）で要素を組みます。
3. 既存の Suru UI コンポーネントの特殊形ならパターン E を選びます。
4. パターンが決まったら、パーツツリー（Root とその子パーツ）を決めます。

完了条件: パターンとパーツツリー、カテゴリーが決まっている。

### Step 2 ディレクトリーと index.ts

1. `packages/react/src/<カテゴリー>/` に `<名前>/` ディレクトリーを作ります。
2. `index.ts` を作り、パーツと本体を再エクスポートします（`packages/react/src/forms/checkbox/index.ts`）。

```ts
export * from "./checkbox.parts.jsx";

export { type CheckboxProps, Checkbox } from "./checkbox.jsx";
```

完了条件: ディレクトリーと、パーツと本体を再エクスポートする `index.ts` が存在する。

### Step 3 パーツファイル

`<名前>.parts.tsx` を作り、パーツツリー順に全パーツを実装します。

1. 必要な import を書きます（Base UI、`cn`、`errors`、`types`、`_split-render-props`、テーマ、CSS）。
2. 各パーツについて、`State` 型 → `Props` 型 → コンポーネント本体 → `namespace` → 別名を書きます。
3. グループの場合はコンテキストのセットを書きます。
4. パーツが状態を子に伝える必要がある場合は、その状態のコンテキストを追加し、`useRenderElement` か Base UI のコンポーネントで包みます。

完了条件: `index.ts` からパーツが import でき、参照コンポーネントと同じ形で全パーツが定義されている。

### Step 4 本体

`<名前>.tsx` を作り、公開コンポーネントを実装します。

1. Root 以外のパーツを組み合わせる場合は、各パーツを `slotProps` で公開します。
2. 単純な包み込みなら `XxxParts.Root` にそのまま渡します（Input の例、`packages/react/src/forms/input/input.tsx:16`）。
3. コンポーネント関数名は `Sui<名前>` にします。

完了条件: 公開 API の型とコンポーネントが定義され、JSDoc と `@example` が書かれている。

### Step 5 CSS

`<名前>.css` を作ります。
`../css/SKILL.md` を読み、`sui_<名前>-*` のクラスとカスタムプロパティーを定義します。
必要な状態（pending、disabled など）を先に洗い出し、`@layer sui.important` の状態セクションを計画します。

完了条件: パーツごとのセクションが `../css/SKILL.md` の構成に従っている。

### Step 6 エクスポート

1. `packages/react/src/index.ts` の、該当カテゴリーのコメントの下に export を追加します。

```ts
// forms
export { type CheckboxProps, Checkbox } from "./forms/checkbox/index.js";
```

2. `packages/react/package.json` の `exports` にサブパスをアルファベット順で追加します。

完了条件: `packages/react/src/index.ts` と `packages/react/package.json` に追加が入っている。

### Step 7 Storybook

`packages/react/stories/<カテゴリー>/<名前>.stories.tsx` を作ります。
`packages/react/stories/buttons/button.stories.tsx` を参考に、`meta.story` と `controls` を使って「使い方」を最初に置き、その後ろにバリエーション（色、サイズ、状態など）を加えます。

- `import { preview, controls } from "../../.config/storybook/preview.js";`
- コンポーネント本体は `../../src/<カテゴリー>/<名前>/index.js` から import します。
- テーマの配列（`COLORS`、`SIZES`、`COLOR_TEMPLATES`）は `@suru-ui/theme` から import します。

完了条件: 少なくとも「使い方」の story があり、`controls` で主要プロパティーを操作できる。

### Step 8 検証

モノレポルートで次のコマンドを順に実行し、すべて通ることを確認します。

```sh
mise run test:format
mise run test:lint
mise run test:typecheck
```

CSS を書いた場合、整形は `mise run format` の stylelint で整えます。
ビルドは `npm run build` で確認します。

完了条件: 上記すべてがエラーなく終了する。

## テンプレート集

### パターン B の公開コンポーネント

````tsx
import * as React from "react";

import type { Component } from "../../types.js";
import * as XxxParts from "./xxx.parts.jsx";

/**
 * {@link Xxx} コンポーネントのプロパティーです。
 */
export type XxxProps = XxxParts.Root.Props & {
  /**
   * 表示するコンテンツです。
   */
  children?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?:
    | {
        readonly content?: XxxParts.Content.Props | undefined;
      }
    | undefined;
};

/**
 * Xxx を表示するコンポーネントです。
 *
 * @example 基本
 * ```tsx
 * <Xxx>コンテンツ</Xxx>
 * ```
 */
export const Xxx: Component<XxxProps> = function SuiXxx(props) {
  const { children, slotProps: { content: contentProps } = {}, ...rootProps } = props;

  return (
    <XxxParts.Root {...rootProps}>
      <XxxParts.Content {...contentProps}>{children}</XxxParts.Content>
    </XxxParts.Root>
  );
};
````

### パターン A の `index.ts`

```ts
export * from "./xxx.parts.jsx";

export { type XxxProps, Xxx } from "./xxx.jsx";
```

## 禁則リスト

- `.js` と `.jsx` の import 拡張子を間違えない。`.ts` は `.js`、`.tsx` は `.jsx` を使います。
- CSS をパーツファイル以外（本体ファイルや `index.ts`）で import しない。
- `as any` などの型キャストで型エラーをごまかさない。
- `enum` や値を持つ `namespace` を使わない。
- コンポーネント関数名の `Sui` プレフィックスを付け忘れない。
- パーツを `slotProps` にせず、1 段目のプロパティーで直接公開しない。
- コンテキストの読み取りに `useXxxContext(true)`（オプショナル）を使わないと、グループ外でエラーになります。グループ外での既定値を必ず持ちます。
- `cn()` を使わずに `className` を文字列で直接結合しない。
- JSDoc の 1 行形式、`@default undefined`、`@example` ラベルなしフェンスコードを書かない（`../jsdoc/SKILL.md` 参照）。
- 状態クラスの強制上書きを `@layer sui.important` の外に書かない（`../css/SKILL.md` 参照）。
- `package.json` の `exports` と `packages/react/src/index.ts` の公開を忘れない。
- 検証コマンド（format、lint、typecheck）を通さずに完了としない。

## 既存コンポーネントへの対応

既存コンポーネントの修正や拡張のときも、このスキルの「コードの共通規則」「禁則リスト」を守って進めてください。
新規パーツを追加する場合は、パターン A〜E から該当するものを選び、既存のパーツファイル内のパーツツリー順どおりに挿入します。
