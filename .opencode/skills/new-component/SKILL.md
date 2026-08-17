---
name: new-component
description: Suru UI モノレポ (`packages/react`) に新しい React コンポーネントを追加するときに使用します。新しいコンポーネントの作成、コンポーネントの追加、`*.parts.tsx` の Base UI ラッパーとパーツ実装、Root と公開本体の型分離、ジェネリック型、`slotProps`、グループコンテキスト、CSS クラス設計、Storybook stories、テスト（`*.client.test.tsx`）、`package.json` のサブパスエクスポートを扱います。既存の Button、Field、Form、Checkbox と同じ方式で実装し、`@base-ui/react`（Base UI）を基盤としたヘッドレスコンポーネントをスタイル付きで公開するときに使います。
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
  <名前>.parts.tsx  // Base UI のラッパーとパーツ（Root、Content、Indicator など）
  <名前>.css        // スタイル
```

`*.parts.tsx` は子パーツがない場合も作ります。
Base UI の型を Suru UI の型として公開し、`cn()` によるクラス名の合成と CSS の import を一箇所にまとめる層です。
そのため、`Form` のように Root だけを持つコンポーネントでも、Root のラッパーは `*.parts.tsx` に置きます。

カテゴリーの実例として、`buttons/button/` は `index.ts`、`button.tsx`、`button.parts.tsx`、`button.css` で構成されています（`packages/react/src/buttons/button/`）。

Storybook の stories は `packages/react/stories/<カテゴリー>/<名前>.stories.tsx` に置きます。
テストは `packages/react/tests/` に置きます。ブラウザーで実行するテストは `<名前>.client.test.tsx`、ブラウザーを必要としないロジックのテストは `<名前>.test.ts` です。

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
| Form           | Root                                                                                                                |
| ButtonGroup    | Root                                                                                                                |

### パターン A（Base UI コンポーネントのラップ）

Base UI のコンポーネントをそのまま使い、クラス名と共通プロパティーを追加します。
参考実装は `packages/react/src/forms/field/field.parts.tsx`、`packages/react/src/forms/form/form.parts.tsx`、`packages/react/src/forms/checkbox-group/checkbox-group.parts.tsx` です。

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

### パターン A の Root 層と公開本体

`Field` と `Form` のように Base UI の Root を利用するコンポーネントは、パーツ層と公開本体を分けます。
パーツ層の `XxxRoot` は Base UI の Root をラップし、公開本体の `Xxx` は `XxxRoot` に委譲します。

`<名前>.parts.tsx` では、次の順で Root を定義します。

1. Base UI の状態、プロパティー、アクション、イベント関連の型を `XxxRoot*` として再公開します。
2. `React.ComponentProps<typeof BaseRoot>` を `XxxRootProps` の基礎にします。
3. `className` を分割代入し、`cn(className, "sui_<名前>", ...)` で利用者の値と既定のクラスを合成します。
4. `export namespace Root` に `State` と `Props` を置き、`export const Root` から Root パーツを公開します。
5. CSS はこのパーツファイルだけで import します。

```tsx
export type XxxRootState = BaseRoot.State;

export type XxxRootProps = React.ComponentProps<typeof BaseRoot>;

export const XxxRoot: Component<XxxRootProps> = function SuiXxxRoot(props) {
  const { className, ...otherProps } = props;

  return <BaseRoot {...otherProps} className={cn(className, "sui_xxx")} />;
};

export namespace Root {
  export type State = XxxRootState;
  export type Props = XxxRootProps;
}

export const Root: Component<Root.Props> = XxxRoot;
```

`Form` のように入力値やイベントの型パラメーターを持つ場合は、Root の型パラメーターを公開本体まで保持します。
`FormRootProps<TValues>` は `React.ComponentProps<typeof Form<TValues>>` を基礎にし、`FormRootComponentType` は `Component<FormRootProps>` を拡張したジェネリックな呼び出しシグネチャーを持ちます。
この場合、`Root` も `Component<Root.Props>` に狭めず、`FormRootComponentType` をそのまま使います。

```tsx
interface XxxRootComponentType extends Component<XxxRootProps> {
  <TValues extends XxxRootValues>(props: XxxRootProps<TValues>): React.ReactElement | null;
}

export const XxxRoot: XxxRootComponentType = function SuiXxxRoot(props: XxxRootProps) {
  const { className, ...otherProps } = props;

  return <BaseRoot {...otherProps} className={cn(className, "sui_xxx")} />;
};

export const Root: XxxRootComponentType = XxxRoot;
```

`<名前>.tsx` では、Root の型を別名として公開し、追加の API がなければ Root にそのまま委譲します。
`Form` のように公開 API でもジェネリックを受け取る場合は、公開本体にも同じ呼び出しシグネチャーを定義します。

```tsx
export type XxxValues<TValues extends XxxRootValues = XxxRootValues> = XxxRootValues<TValues>;

export type XxxState = XxxRootState;

export type XxxProps<TValues extends XxxValues = XxxValues> = XxxRootProps<TValues>;

interface XxxComponentType extends Component<XxxProps> {
  <TValues extends XxxValues>(props: XxxProps<TValues>): React.ReactElement | null;
}

export const Xxx: XxxComponentType = function SuiXxx(props: XxxProps) {
  return <XxxRoot {...props} />;
};

export namespace Xxx {
  export type State = XxxState;
  export type Props<TValues extends XxxValues = XxxValues> = XxxProps<TValues>;
  export type Values<TValues extends XxxValues = XxxValues> = XxxValues<TValues>;
}
```

`Form` の `Values`、`Actions`、`ValidationMode`、送信イベントのような Root 固有の型は、まず `FormRoot*` としてパーツ層に置き、公開本体で `Form*` として別名を付けます。
型名前空間の別名も同じ規則でそろえます。
ジェネリック型の既定値と制約を Root 層、本体層、型名前空間で一致させ、型パラメーターを失わないようにします。

`Form` では `FormRootValues`、`FormRootActions`、`FormRootValidationMode`、`FormRootSubmitEventReason`、`FormRootSubmitEventDetails` をパーツ層に定義し、公開本体で `FormValues`、`FormActions`、`FormValidationMode`、`FormSubmitEventReason`、`FormSubmitEventDetails` として公開します。
`Field` では `FieldRootState`、`FieldRootActions`、`FieldRootProps` を基礎に `FieldState`、`FieldActions`、`FieldProps` を定義し、`FieldErrorMatch`、`FieldErrorMatches`、`FieldSlotProps` のような公開 API 固有の型を本体層に追加します。

`Field` のように複数の子パーツを組み立てる場合は、この Root 層に加えてパターン B を使います。
Root 以外のパーツの生のプロパティーは `slotProps` にまとめ、`label`、`description`、`errorMatches`、`validity` のような公開本体固有の便利なプロパティーと区別します。
`slotProps` の値はパーツの `Props` 型を参照し、各プロパティーに `readonly` を付けます。
入力値が `undefined` でも明示的に指定されたことが意味を持つ場合は、`"label" in props` のようにプロパティーの存在を判定して条件付きパーツを描画します。

公開本体に静的なパーツを付ける場合は、公開するものだけを `Object.assign` で付けます。
`Field` は `Control` と `Item` を静的プロパティーとして公開し、その他のパーツは `*.parts.tsx` の `Root`、`Label`、`Description` などから公開します。
静的パーツに対応する状態型とプロパティー型を公開本体の namespace にも付ける場合は、`Field.Item.State`、`Field.Item.Props` のような入れ子の型 namespace にまとめます。
Root だけを公開する `Form` のようなコンポーネントに、不要な静的パーツを追加してはいけません。

### パターン B（パーツ合成コンポーネント）

公開コンポーネントが複数のパーツを組み立てます。
参考実装は `packages/react/src/buttons/button/button.tsx:76` と `packages/react/src/forms/checkbox/checkbox.tsx:43` です。

````tsx
import * as React from "react";

import type { Component } from "../../types.js";
import * as CheckboxParts from "./checkbox.parts.jsx";

/**
 * {@link Checkbox} の各パーツに渡すプロパティーです。
 */
export type CheckboxSlotProps = {
  /**
   * {@link CheckboxParts.Indicator|Indicator} に渡すプロパティーです。
   */
  readonly indicator?: CheckboxParts.Indicator.Props | undefined;
};

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
  slotProps?: CheckboxSlotProps | undefined;
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
- `Field` の `label`、`description`、`errorMatches` のような1段目のプロパティーは、パーツの生のプロパティーではなく公開本体の便利な API です。これらは `slotProps` の規則と区別します。
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
- `erasableSyntaxOnly` が有効です（`packages/react/.config/tsconfig.build.json`）。`enum` と、値を持つ `namespace` は使えません。パーツと公開本体の `namespace` には型だけを入れ、パーツ固有の `Actions`、イベント型、ジェネリック型なども型エイリアスとして定義します。

### パーツファイルのセクション構成

パーツファイルは、コンテキストとパーツを次の順で並べます。

1. `// Context` セクション（必要なら）。グループコンテキストのように複数パーツから参照するものはファイル先頭に置き、単一のパーツに属するもの（Button の CircularProgressContext）はそのパーツの直前に置きます。
2. パーツツリー順に、パーツごとに `// Root`、`// Content` のようなセクション見出し（英語）と `// ----` の区切り線を置きます。
3. パーツ内は次の順です。
   - `State` 型（`/** {@link Root} の状態です。 */` の JSDoc を付ける）
   - `Props` 型（`/** {@link Root} に渡すプロパティーです。 */` の JSDoc を付ける）
   - コンポーネント本体（説明と `@example` の JSDoc を付ける）
   - `export namespace Root { ... }` と `export const Root: Component<Root.Props> = ButtonRoot;`（ジェネリックな Root は専用のコンポーネント型をそのまま使う）

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

### 型名前空間と再エクスポート

パーツは `XxxRootState`、`XxxRootProps` のような個別名を先に定義し、`Root.State`、`Root.Props` から参照できるようにします。
`Actions`、値の型、検証モード、イベントの理由や詳細など、利用者が参照する型も同じ namespace にまとめます。
公開本体では `XxxState`、`XxxProps` のような API 用の別名を定義し、`Xxx.State`、`Xxx.Props` から参照できるようにします。
namespace に値を入れず、すべて `export type` で定義してください。

`index.ts` は最初に `*.parts.jsx` を `export *` し、その後で本体ファイルから公開本体と、その本体に属する型を明示的に export します。
パーツの型を隠すために `export *` を本体ファイルへ適用してはいけません。
`Field` のように公開本体の型が多い場合は、`FieldState`、`FieldActions`、`FieldSlotProps`、エラー関連の型を個別に export します。
`Form` のようにジェネリックな型がある場合は、`FormValues` とイベント関連の型も個別に export します。

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

## テスト

コンポーネントのテストは `packages/react/tests/` に置きます。書き方は `../vitest/SKILL.md` に従います。

- ブラウザーで実行するテストは `<名前>.client.test.tsx` にします（例: `tests/button.client.test.tsx`）。Vitest の Browser Mode で Playwright の 3 ブラウザー（chromium、firefox、webkit）すべてに実行されます。
- ブラウザーを必要としないロジック（`cn`、`splitRenderProps` など）のテストは `<名前>.test.ts` にします（例: `tests/cn.test.ts`）。サーバー専用のテストは `*.server.test.ts` です。
- パーツ単体のテストは、同じ `*.client.test.tsx` に `describe("<名前>Parts.Root")` として並べます（`tests/accordion.client.test.tsx:211`）。
- コンポーネントは `../src/<カテゴリー>/<名前>/index.js` から import します。
- レンダリングには `vitest-browser-react` の `render` を使います。検証は `screen.getByRole()` などのロケーターと `await expect.element(...)` を使います（`tests/button.client.test.tsx:8`）。
- クリックには `vitest/browser` の `userEvent.click` か、`./_click.js` の `clickElement`（DOM の `click()` を直接呼ぶ）を使います。
- カバーする内容は次のとおりです（`tests/checkbox.client.test.tsx` 参照）。
  1. レンダリング: ロール、テキスト、既定のスタイルクラス（`sui_<名前>-size_md` など）
  2. スタイル系プロパティーの上書き: variant、color、size、radius などでクラスが変わる
  3. インタラクション: クリックで状態が切り替わる、`onXxxChange` が通知する
  4. disabled などの無効状態
  5. `slotProps` が各パーツに適用される
  6. パーツ単体の振る舞い

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

パーツの `export *` と本体の明示的な export を分ける点が重要です。
本体の型が複数ある場合は、`Field` や `Form` の `index.ts` のように、本体に属する公開型をすべて列挙します。

完了条件: ディレクトリーと、パーツと本体を再エクスポートする `index.ts` が存在する。

### Step 3 パーツファイル

`<名前>.parts.tsx` を作り、パーツツリー順に全パーツを実装します。

1. 必要な import を書きます（Base UI、`cn`、`errors`、`types`、`_split-render-props`、テーマ、CSS）。
2. 各パーツについて、`XxxPartState` 型 → `XxxPartProps` 型 → コンポーネント本体 → `namespace` → 別名を書きます。
3. Root だけのコンポーネントでも、Base UI の Root ラッパー、`Root` namespace、`Root` 別名を定義します。
4. Root にジェネリックやイベント関連の型がある場合は、Root の個別型、namespace の型エイリアス、ジェネリックなコンポーネント型をそろえます。
5. グループの場合はコンテキストのセットを書きます。
6. パーツが状態を子に伝える必要がある場合は、その状態のコンテキストを追加し、`useRenderElement` か Base UI のコンポーネントで包みます。

完了条件: `index.ts` からパーツが import でき、参照コンポーネントと同じ形で全パーツが定義されている。

### Step 4 本体

`<名前>.tsx` を作り、公開コンポーネントを実装します。

1. Root 以外のパーツを組み合わせる場合は、各パーツの生のプロパティーを `slotProps` で公開します。
2. `Field` のように利用者向けの便利なプロパティーを追加する場合は、Root のプロパティーと `slotProps`、便利なプロパティーを別の型として定義します。
3. 単純な包み込みなら `XxxParts.Root` にそのまま渡します（Form の例、`packages/react/src/forms/form/form.tsx:63`）。
4. Root や本体がジェネリックな場合は、公開コンポーネントの型にジェネリックな呼び出しシグネチャーを持たせます。
5. コンポーネント関数名は `Sui<名前>` にします。

完了条件: 公開 API の型とコンポーネントが定義され、JSDoc と `@example` が書かれている。

### Step 5 CSS

`<名前>.css` を作ります。
`../css/SKILL.md` を読み、`sui_<名前>-*` のクラスとカスタムプロパティーを定義します。
必要な状態（pending、disabled など）を先に洗い出し、`@layer sui.important` の状態セクションを計画します。
Suru UI 固有の規則がまだない Root は、`form.css` のようにセクション見出しだけを置いて空にできます。
空の `@layer` や不要なカスタムプロパティーを追加せず、CSS の import はパーツファイルに残します。

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
- `controls` の第 2 引数は、各プロパティーの設定を必ず複数行のオブジェクトで記述します。プロパティー設定を 1 行に詰め込んではいけません。

  ```tsx
  const ctrl = controls(Component, {
    color: {
      options: COLORS,
      control: "select",
    },
    size: {
      options: SIZES,
      control: "select",
    },
  });
  ```

- コンポーネントが `color`、`radius`、`size` のいずれかを公開する場合は、それぞれに対応する `Colors`、`Radius`、`Sizes` story を必ず作ります。該当しないプロパティーの story は作りません。
- `Colors` は `COLORS`、`Sizes` は `SIZES`、`Radius` は `"none"`、`"rounded"`、`"full"` の全候補を列挙し、各候補の値が分かるラベルも表示します。配列の `map` で実装して構いません。
- 「使い方」の story を最初に置き、その後に `Image` などの構造例、`Colors`、`Radius`、`Sizes` などのバリエーション story を置きます。

完了条件: 「使い方」の story、公開している各スタイル系プロパティーのバリエーション story、複数行で書かれた `controls` があり、`controls` で主要プロパティーを操作できる。

### Step 8 テスト

`packages/react/tests/<名前>.client.test.tsx` を作り、`../vitest/SKILL.md` と、このスキルの「テスト」章を読んでから、既存の `tests/checkbox.client.test.tsx` を参考に次のテストを書きます。

1. レンダリングと既定のスタイルクラス
2. スタイル系プロパティーの上書き
3. インタラクション（クリック、入力、開閉など）
4. disabled などの無効状態
5. `slotProps` が各パーツに適用される
6. パーツ単体の振る舞い（`describe("<名前>Parts.Root")`）

ブラウザーを必要としない純粋なロジック（`cn` など）を書いた場合は、`<名前>.test.ts` に分けます。

完了条件: 公開 API の主要な振る舞いを検証するテストが `packages/react/tests/` に存在する。

### Step 9 検証

モノレポルートで次のコマンドを順に実行し、すべて通ることを確認します。

```sh
mise run test
```

個別のステップを確認する場合は次のコマンドを使います。

```sh
mise run test:server      # npx vitest --config ./.config/vitest.server.ts
mise run test:client      # npx vitest --config ./.config/vitest.client.ts
mise run test:format      # npx oxfmt --config ./.config/.oxfmtrc.json --check
mise run test:lint        # npx oxlint --config ./.config/.oxlintrc.json
mise run test:typecheck   # npx tsc --noEmit
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
 * {@link Xxx} の各パーツに渡すプロパティーです。
 */
export type XxxSlotProps = {
  /**
   * {@link XxxParts.Content|Content} に渡すプロパティーです。
   */
  readonly content?: XxxParts.Content.Props | undefined;
};

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
  slotProps?: XxxSlotProps | undefined;
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
- テストを書かずに完了としない。
- ブラウザーで実行するテストを `*.client.test.tsx` 以外のファイル名にしない。ブラウザーを必要としないロジックのテストは `*.test.ts` に分ける。
- 検証コマンド（test、format、lint、typecheck）を通さずに完了としない。

## 既存コンポーネントへの対応

既存コンポーネントの修正や拡張のときも、このスキルの「コードの共通規則」「禁則リスト」を守って進めてください。
新規パーツを追加する場合は、パターン A〜E から該当するものを選び、既存のパーツファイル内のパーツツリー順どおりに挿入します。
