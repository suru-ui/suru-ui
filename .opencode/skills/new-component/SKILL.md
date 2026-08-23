---
name: new-component
description: Suru UI モノレポ (`packages/react`) に新しい React コンポーネントを追加するときに使用します。
---

# 新しい React コンポーネントの追加

## 目的

Suru UI の `packages/react` に、新しい React コンポーネントを既存コーディング規約どおりに追加します。
このスキルの目的は、書き手が変わっても同じ実装ができることです。
ここで定めた規則を最優先で守ります。ただし、このスキルと参照している実例が矛盾するときは、実例を優先してください。このスキルが古くなっている可能性があります。

## 併用する規範

作業前に次のスキルを読んでください。

- `../japanese/SKILL.md` — 日本語文章の規範。JSDoc とコメントはこれに従います。
- `../jsdoc/SKILL.md` — JSDoc の形式。パーツのドキュメントはこれに従います。
- `../css/SKILL.md` — CSS を書くときのルールはこれに従います。このスキルは CSS の詳細を繰り返しません。
- `../vitest/SKILL.md` — テストを書く場合。テスト API とモックパターンはこれに従います。
- `../component-docs/SKILL.md` — web サイトのドキュメントを書く場合。mdx と example の詳細はこれに従います。

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
角丸 (`radius`) の型はテーマにはなく、各部品で `"none" | Size | "full"` として定義します (例: `ButtonRootRadius`)。
既定値は多くの場合 `radius = size` です。

### カテゴリー

コンポーネントは次のカテゴリーに分かれます。

| カテゴリー | 内容 | 例 |
| ---------- | ---- | -- |
| `buttons` | ボタン系 | button, toggle-button |
| `data-display` | 情報表示 | avatar, chip, meter, progress, alert |
| `forms` | フォーム入力 | checkbox, input, select, slider, field, form |
| `layout` | レイアウト | action-group, resizable |
| `navigation` | ナビゲーション | accordion, collapsible, tabs, scroll-area |
| `overlays` | オーバーレイ | dialog, menu, tooltip, toast |

### ディレクトリーとファイル

コンポーネント 1 つは、`packages/react/src/<カテゴリー>/<名前>/` の 1 ディレクトリーにまとめます。

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

Storybook の stories は `packages/react/stories/<カテゴリー>/<名前>.stories.tsx` に置きます。
テストは `packages/react/tests/<カテゴリー>/` に置きます。ブラウザーで実行するテストは `<名前>.client.test.tsx`、ブラウザーを必要としないロジックのテストは `<名前>.test.ts`（またはサーバー専用なら `<名前>.server.test.ts`）です。

## format による自動整形

`packages/react` の `mise run format` は複数の整形器を実行します。次の項目は**手動で整える必要がありません**。意味的な正しさ (何を並べるか) だけ気にしてください。

| 整形対象 | 整形器 | 規則 |
| -------- | ------ | ---- |
| TS/TSX 全般 | oxfmt (`sortImports`) | import 宣言のグループ化と並び替え |
| import/export の `{}` 内 | `scripts/sort-import-exports.ts` | 型 → 値の順。各グループ内は名前が短い順 (同長なら辞書順) |
| JSX 属性 | `scripts/sort-jsx-props.ts` | 一般 → `aria-*` → `data-*` の順。各グループ内は短い順 (同長なら辞書順)。スプレッド属性は位置維持、コメント付き属性は対象外 |
| 型リテラル/interface のメンバー | `scripts/sort-type-props.ts` | プロパティー・メソッド署名を名前順 (呼び出し署名など名前のないメンバーは位置維持) |
| 型 namespace のメンバー | `scripts/sort-namespace-exports.ts` | `State` → `Props` → `Context` → `SlotProps` → その他の型 (名前順) → ネストした namespace |
| CSS のプロパティー順 | stylelint (`--fix`) | recess order |
| CSS 変数の宣言順 | `scripts/sort-css-variables.ts` | recess order のプロパティー順。変種の相対順序は維持 |

たとえば「import の `{}` 内は `type` 付きを先に」という規則は自動整形されるため、覚える必要はありません。
逆に、JSDoc、セクション見出し、コンポーネントの構造、命名などは自動整形されないため、このスキルの規則に従います。

## パターンの選択

まず実装する前に、次の中からパターンを 1 つ選びます。選ぶ基準は次のとおりです。

1. Base UI に同じ部品のコンポーネントがあるかどうかを、`@base-ui/react` のパッケージ一覧で調べます。
2. ある場合はパターン A（そのまま包む）かパターン B（パーツを組む）で、子パーツが複数で構造を持つ場合はパターン B を選びます。
3. 複数の子をまとめて状態やスタイルを伝えるグループの場合はパターン C を併用します。
4. Base UI にない単純な要素（`span`、`svg` など）はパターン D で `useRender` を使います。
5. 既存の Suru UI コンポーネントの特殊形ならパターン E で既存のパーツへ委譲します。

パーツは、実装したい部品の意味的な構造から決めます。既存の例:

| コンポーネント | パーツ（ファイル内の並び順） |
| -------------- | ---------------------------- |
| Button | Root, Content, Pending, CircularProgress, CircularProgressTrack, CircularProgressFill, CircularProgressFillRotation |
| Checkbox | Root, Indicator |
| Dialog | Handle(+createHandle), Root, Trigger, Popup, ... |
| Form | Root |

## パーツファイルの共通構造

`*.parts.tsx` では、パーツツリー順に、パーツごとにセクションを置きます。
セクション見出しは英語で、`//` 見出しと区切り線を付けます。

```ts
// Context
// -------

// Root
// ----

// Content
// -------
```

グループ全体のコンテキストはファイル先頭の `// Context` セクションに置きます。単一パーツに属するコンテキスト（Button の CircularProgressContext など）はそのパーツの直前に置きます。

各パーツは次の順で定義します。

1. スタイル系のサブ型 (`XxxRootColor`, `XxxRootRadius`, `XxxRootSize`, `XxxRootVariant`, `XxxRootOrientation` など)。JSDoc に候補値の箇条書きを付けます。

   ```ts
   /**
    * チェックボックスの角丸です。
    *
    * - `"none"`: 角を直角にする
    * - `"sm"`: 小さい角丸
    * - `"md"`: 標準的な角丸
    * - `"lg"`: 大きい角丸
    * - `"full"`: 完全な丸形
    */
   export type CheckboxRootRadius = "none" | Size | "full";
   ```

2. `State` 型 — `/** {@link XxxRoot} の状態です。 */` の JSDoc を付ける。Base UI 由来の状態は namespace 経由で参照します (例: `Checkbox.Root.State`, `Dialog.Root.State`)。
3. `Props` 型 — `/** {@link XxxRoot} に渡すプロパティーです。 */` の JSDoc を付ける。スタイル系プロパティーの型はサブ型を参照し、JSDoc に「CheckboxGroup 内では、グループの値が優先されます」のような上書き規則も書きます。
4. コンポーネント本体 — 関数名は `Sui<コンポーネント名><パーツ名>` (例: `function SuiCheckboxRoot`)。`export const CheckboxRoot: IComponent<CheckboxRootProps> = function SuiCheckboxRoot(props) { ... };` の形です。
5. `export namespace <Part>` — 「{@link XxxRoot} の状態やプロパティーをまとめた型名前空間です。」の JSDoc を付け、`State`、`Props`、必要ならサブ型 (`Color`, `Radius`, `Size`, `Variant`, `Orientation`) を `/** {@link Xxx} です。 */` の JSDoc 付きで入れます。
6. 別名 — `export const Root: IComponent<Root.Props> = CheckboxRoot;` の形で、「{@link XxxRoot} です。」の JSDoc を付けます。

コンポーネントの型は `types.ts` の `IComponent<TProps>` を使います。コンテキスト読み取りフックの型は `IUseContext<TContext>` です。
`erasableSyntaxOnly` が有効です。`enum` と、値を持つ `namespace` は使えません。namespace には型だけを入れます。

### import の規則

- `import` のファイル拡張子は、コンパイル後の拡張子で書きます。`.ts` ファイルは `.js`、`.tsx` ファイルは `.jsx` です。`@base-ui/react/*`、`@suru-ui/theme` などのパッケージは拡張子なしです。
- 宣言の並び (外部パッケージ → 相対パス → CSS) と `{}` 内の並びは oxfmt と sort スクリプトが自動整形します (「format による自動整形」参照)。CSS は最後に `import "./<名前>.css";` を書きます。
- CSS はパーツファイル (`*.parts.tsx`) でのみ import します。本体ファイルや `index.ts` では import しません。
- テーマの型は `import type { Size, Color } from "@suru-ui/theme";` で取り込みます。

## パターン A（Base UI コンポーネントのラップ）

Base UI のコンポーネントをそのまま使い、クラス名と共通プロパティーを追加します。
参考実装は `packages/react/src/forms/checkbox-group/checkbox-group.parts.tsx` です。

```tsx
export type CheckboxGroupRootColor = Color;

/**
 * {@link CheckboxGroupRoot} の状態です。
 */
export type CheckboxGroupRootState = CheckboxGroup.State;

/**
 * {@link CheckboxGroupRoot} に渡すプロパティーです。
 *
 * グループに指定したスタイルプロパティーは、子要素のチェックボックス指定より優先されます。
 */
export type CheckboxGroupRootProps = React.ComponentProps<typeof CheckboxGroup> & {
  /**
   * チェックボックスの色を指定します。
   *
   * 子要素のチェックボックスのプロパティーを上書きします。
   *
   * @default "grey"
   */
  color?: CheckboxGroupRootColor | undefined;
  // ...
};

export const CheckboxGroupRoot: IComponent<CheckboxGroupRootProps> = function SuiCheckboxGroupRoot(
  props,
) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    disabled,
    outlined = false,
    className,
    orientation = "vertical",
    ...otherProps
  } = props;
  const context = React.useMemo<CheckboxGroupContext>(
    () => ({ size, color, radius, variant, disabled, outlined }),
    [size, color, radius, variant, disabled, outlined],
  );

  return (
    <Context value={context}>
      <CheckboxGroup
        {...otherProps}
        disabled={disabled}
        className={cn(
          className,
          "sui_checkbox_group",
          `sui_checkbox_group-orientation_${orientation}`,
        )}
      />
    </Context>
  );
};

export namespace Root {
  export type State = CheckboxGroupRootState;

  export type Props = CheckboxGroupRootProps;
}

export const Root: IComponent<Root.Props> = CheckboxGroupRoot;
```

(例を短くするため JSDoc を省略しています。実際のコードには全項目に JSDoc を付けます。)

- 既定値は分割代入で `size = "md"` のように書きます。他のプロパティーに依存する `radius` は `radius = size` です。グループから値を読む場合は `size: sizeProp = "md"` としてから `const size = group?.size ?? sizeProp;` の形にします。
- クラス名は `cn(className, ...)` で利用者のクラス名と合成します。修飾クラスはテンプレートリテラル、ブール状態は `outlined && "sui_checkbox-outlined"` の形で並べます。
- Base UI 由来の状態は render props で状態クラスを付けます (例: `(state) => state.checked && "sui_checkbox-checked"`)。
- Base UI のコンポーネントは、利用者のイベントハンドラー、Render Props、`className` をそのまま通します。
- Base UI の型は namespace 経由で参照します (`CheckboxGroup.State`, `Checkbox.Root.State`, `Dialog.Root.State`)。

## コンテキスト (グループ)

グループの Root が状態とスタイルをコンテキストで子に伝え、子がその値を読んで表示を決めます。
参考実装は `packages/react/src/forms/checkbox-group/checkbox-group.parts.tsx` と `packages/react/src/layout/action-group/action-group.parts.tsx` です。

`// Context` セクションでは、次の要素をこの順で定義します。

1. コンテキスト値のサブ型 (`CheckboxGroupContextColor` など)
2. コンテキスト値の型 `XxxContext` (各プロパティーは `readonly` と JSDoc)
3. `React.createContext<XxxContext | null>(null)` のインスタンス
4. 内部フック `useSuiXxxContext(optional?)` — オーバーロード付き。見つからないときは `ContextMissingError` を投げる
5. 公開フック `export const useXxxContext: IUseContext<XxxContext> = useSuiXxxContext;`
6. エイリアス `export type Context = XxxContext;` と `export const Context: React.Context<Context | null> = XxxContext;`
7. 必要なら `namespace Context { Color; Radius; Size; Variant; ... }`
8. `export const useContext: IUseContext<Context> = useXxxContext;`

```tsx
function useSuiCheckboxGroupContext(optional?: false): CheckboxGroupContext;
function useSuiCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null;
function useSuiCheckboxGroupContext(optional?: boolean): CheckboxGroupContext | null {
  const context = React.use(CheckboxGroupContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "CheckboxGroupContext",
      providerName: "CheckboxGroupRoot",
    });
  }

  return context;
}

export const useCheckboxGroupContext: IUseContext<CheckboxGroupContext> =
  useSuiCheckboxGroupContext;
```

- `contextName` にはコンテキスト名、`providerName` には提供側 Root の名前を渡します (`src/errors.ts` の `ContextMissingError`)。
- 子の読み取りは必ず `useXxxContext(true)` でオプショナルにし、グループ外での既定値を子側に持ちます (`const size = group?.size ?? sizeProp`)。
- Root がコンテキストを提供するときは `<Context value={context}>` の children に要素を包みます。値は `React.useMemo` で作ります。`useRender` の返り値 (`element`) を包む形もあります。

## 公開本体 (`<名前>.tsx`)

公開本体は、パーツを組み立てて利用者向け API を作る層です。
参考実装は `packages/react/src/buttons/button/button.tsx` と `packages/react/src/forms/checkbox/checkbox.tsx` です。

標準の構成要素は次のとおりです (上からこの順)。

1. スタイル系の公開型エイリアス

   ```tsx
   export type CheckboxColor = CheckboxRootColor;
   export type CheckboxRadius = CheckboxRootRadius;
   export type CheckboxSize = CheckboxRootSize;
   export type CheckboxVariant = CheckboxRootVariant;
   ```

2. `XxxSlotProps` — 各パーツに渡すオプションのプロパティー。全メンバーに `readonly` を付け、各メンバーの JSDoc でパーツに型をリンクします。

   ```tsx
   /**
    * {@link Checkbox} の各パーツに渡すプロパティーです。
    */
   export type CheckboxSlotProps = {
     /**
      * {@link CheckboxIndicator} に渡すプロパティーです。
      */
     readonly indicator?: CheckboxIndicatorProps | undefined;
   };
   ```

3. `XxxPartsProps` — `useXxx` フックの戻り値型。`root` と各パーツのキーを必須の `readonly` メンバーとして持ちます。`slotProps` と異なり `undefined` を許しません (明示的に `undefined` を入れるメンバーは除く)。

4. `XxxState`, `XxxProps` — Root の型を別名として公開します。`XxxProps` は `Omit<XxxRootProps, "children">` を基礎に、本体固有の `children` と `slotProps` を加えます。

5. `useXxx(props): XxxPartsProps` — 「{@link Xxx} の各パーツに渡すプロパティーを作るフックです。」という JSDoc を付ける。`slotProps` を展開し、`children` などの本体固有プロパティーを対応するパーツへ振り分けます。`slotProps` の各メンバーが常に勝つように、既定値を先に展開します (`{ children, ...contentProps }`)。

6. 公開コンポーネント `export const Xxx: IComponent<XxxProps> = function SuiXxx(props) { ... };` — 内部で `const partsProps = useXxx(props);` を呼び、パーツツリー順に描画します。JSDoc にはコンポーネントの説明を書きます。

7. `export namespace Xxx { State; Props; SlotProps?; Color?; Radius?; Size?; Variant? }` — 各メンバーに `/** {@link XxxXxx} です。 */` の JSDoc を付けます。namespace の説明は「{@link Xxx} の状態やプロパティーをまとめた型名前空間です。」です。

8. 本体固有の非公開ヘルパー (デフォルトアイコンなど) はファイル末尾に置きます。

```tsx
export const Checkbox: IComponent<CheckboxProps> = function SuiCheckbox(props) {
  const partsProps = useCheckbox(props);

  return (
    <CheckboxRoot {...partsProps.root}>
      <CheckboxIndicator {...partsProps.indicator} />
    </CheckboxRoot>
  );
};
```

### 静的メンバー (Object.assign)

公開本体に静的メンバー (パーツやフック) を付ける場合は、interface で型を宣言し、`/*#__PURE__*/ Object.assign(...)` で結合します。
参考実装は `button.tsx` (`Button.useContext`) と `field.tsx` (`Field.Item`, `Field.Control`) です。

```tsx
interface ButtonType extends IComponent<ButtonProps> {
  /**
   * {@link useButtonContext} です。
   */
  readonly useContext: IUseContext<ButtonContext>;
}

export const Button: ButtonType = /*#__PURE__*/ Object.assign(
  function SuiButton(props: ButtonProps) {
    const partsProps = useButton(props);
    // ...
  },
  {
    useContext: useButtonContext,
  },
);
```

- パーツツリーを持たない単純な部品 (Form のような Root だけのもの) に、不要な静的メンバーを追加してはいけません。
- 静的パーツに対応する型は、公開本体の namespace に入れず、必要に応じて `Field.Item.State` のような入れ子の型 namespace を interface 上で宣言します。

### ジェネリックな公開本体 (Form)

入力値などの型パラメーターを持つ場合は、ジェネリックな呼び出しシグネチャーを interface で定義します。
参考実装は `packages/react/src/forms/form/form.parts.tsx` と `form.tsx` です。

```tsx
export type FormRootValues<TValues extends Record<string, any> = Record<string, any>> = TValues;

export type FormRootProps<TValues extends FormRootValues = FormRootValues> =
  React.ComponentProps<typeof BaseForm<TValues>>;

interface FormRootComponentType extends IComponent<FormRootProps> {
  <TValues extends FormRootValues>(props: FormRootProps<TValues>): React.ReactElement | null;
}

export const FormRoot: FormRootComponentType = function SuiFormRoot(props: FormRootProps) {
  return <BaseForm {...props} />;
};

export const Root: FormRootComponentType = FormRoot;
```

- Root 固有の型 (`Values`, `Actions`, `ValidationMode`, 送信イベントの理由と詳細) は、まず `FormRoot*` としてパーツ層に定義し、公開本体で `Form*` として別名を付けます。
- ジェネリック型の既定値と制約を Root 層、本体層、namespace で一致させ、型パラメーターを失わないようにします。
- 公開本体でも同じ `XxxComponentType` をそのまま使います (`IComponent<XxxProps>` に狭めない)。

### 便利プロパティー (Field 型)

`Field` の `label`、`description`、`errorMatches` のような 1 段目のプロパティーは、パーツの生のプロパティーではなく公開本体固有の便利な API です。これらは `slotProps` の規則と区別し、`XxxProps` の中で JSDoc 付きで定義します。`"label" in props` のようにプロパティーの存在が意味を持つ場合は、存在判定で条件付き描画します。

## パターン D（Render Props パーツ）

Base UI にない小物パーツ（`span`、`svg`、`circle` など）は、`useRender` で描画します。
参考実装は `packages/react/src/buttons/button/button.parts.tsx` の `Content` です。

```tsx
export type ButtonContentState = {};

/**
 * {@link ButtonContent} に渡すプロパティーです。
 */
export type ButtonContentProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ButtonContentState>;

export const ButtonContent: IComponent<ButtonContentProps> = function SuiButtonContent(props) {
  return useRender({
    defaultTagName: "span",
    props: [
      props,
      {
        className: "sui_button_content",
      },
    ],
  });
};
```

- `useRender` の `props` は、利用者のプロパティーと固定プロパティーの配列、または 1 つのオブジェクトです。プロパティーは配列の先頭から順に合成されます。
- 要素を条件付きで描画したいときは `enabled` に条件を渡します。
- 空状態の型 (`{}`) は `ButtonContentState` のような名前で定義し、`RenderProps` の型引数に渡します。

## パターン E（既存コンポーネントへの委譲）

既存の Suru UI パーツと同じ構造の部品は、既存パーツへ委譲します。
参考実装は `packages/react/src/buttons/toggle-button/toggle-button.parts.tsx` です。

- 委譲するパーツも、`export namespace Content` と `export const Content` の別名まで通常どおり定義し、内部は既存のパーツを再利用します。
- 既存のパーツの型 (`Button.Root.State` など) を自分の型に再利用します。

## JSDoc

- 公開する型、プロパティー、コンポーネント、namespace、namespace の各メンバーには必ず複数行 JSDoc を付けます。1 行形式の `/** ... */` は公開 API では禁止です。
- namespace とそのメンバーの基本形は「{@link Xxx} です。」です。説明が自明な場合も省略しません。
- スタイル系サブ型には候補値の箇条書きを付けます。
- コンポーネントの JSDoc には説明を書きます (利用例は stories とドキュメントに任せます)。
- 自明でない既定値には `@default` を付けます。`undefined` の場合は付けません。
- 詳細な形式は `../jsdoc/SKILL.md` に従います。

## index.ts

コンポーネントの `index.ts` は、最初にパーツファイルを `export *` し、その後で本体ファイルから公開 API を明示的に export します。

```ts
export * from "./checkbox.parts.jsx";

export {
  type CheckboxSize,
  type CheckboxColor,
  type CheckboxProps,
  type CheckboxState,
  type CheckboxRadius,
  type CheckboxVariant,
  type CheckboxSlotProps,
  type CheckboxPartsProps,
  Checkbox,
  useCheckbox,
} from "./checkbox.jsx";
```

- パーツの `export *` と本体の明示的な export を分ける点が重要です。本体へ `export *` してはいけません。
- `{}` 内の並びは sort スクリプトが自動整形します。

### `src/index.ts` への追加

`packages/react/src/index.ts` の該当カテゴリーのコメント (`// buttons`, `// forms` など) の下に export ブロックを追加します。ブロック内の並びも自動整形されます。

```ts
// forms
export {
  type InputSize,
  type InputType,
  type InputColor,
  type InputProps,
  type InputState,
  Input,
} from "./forms/input/index.js";
```

### `package.json` のエクスポート

新しいコンポーネントを追加したら、`packages/react/package.json` の `exports` にサブパスを追加します。エクスポートはカテゴリーごとのブロックで並んでいるため、該当カテゴリーのブロックを見つけて挿入します。

```json
"./<名前>": {
  "types": "./dist/src/<カテゴリー>/<名前>/index.d.ts",
  "default": "./dist/src/<カテゴリー>/<名前>/index.js"
},
```

## テスト

コンポーネントのテストは `packages/react/tests/<カテゴリー>/<名前>.client.test.tsx` に置きます。書き方は `../vitest/SKILL.md` に従います。現時点の模範例は `tests/forms/autocomplete.client.test.tsx` です。

```tsx
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Autocomplete, Root as AutocompletePartsRoot } from "../../src/forms/autocomplete/index.js";

describe("Autocomplete", () => {
  test("既定のスタイルクラスを入力グループへ適用する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);

    // 検証
    await expect.element(screen.getByRole("combobox")).toHaveClass("sui_autocomplete-size_md");
  });
});

describe("AutocompleteParts.Root", () => {
  // パーツ単体の振る舞い
});
```

- テスト名と describe 名は日本語の説明文にします。
- 各 test は `// 準備` → `// 実行` → `// 検証` の順にコメント区切りで書きます (準備がない場合は省略)。
- レンダリングには `@suru-ui/theme/suru.css` を読み込んだ上で `vitest-browser-react` の `render` を使い、検証は `await expect.element(...)` を使います。
- クリックなどの操作には `vitest/browser` の `userEvent` を使います。
- パーツ単体のテストは同じファイルに `describe("<名前>Parts.<Part>")` として並べます。
- カバーする内容: レンダリングと既定のスタイルクラス、スタイル系プロパティーの上書き (size/color/radius/variant)、インタラクション、disabled などの無効状態、`slotProps` の適用、パーツ単体の振る舞い。

## Storybook

`packages/react/stories/<カテゴリー>/<名前>.stories.tsx` を作ります。
模範例は `packages/react/stories/buttons/button.stories.tsx` です。

- import は `import { preview, controls } from "../../.config/storybook/preview.js";` と、コンポーネント本体の `../../src/<カテゴリー>/<名前>/index.js` を使います。
- テーマの配列 (`SIZES`, `COLORS`, `COLOR_TEMPLATES`) は `@suru-ui/theme` から import します。角丸の候補は `const RADII = ["none", ...SIZES, "full"] as const;` として作ります。
- meta は次の形です。

  ```tsx
  const meta = preview.meta({
    title: "<Category> / <Name>",
    component: Xxx,
  });

  export default meta;
  ```

- controls の第 2 引数は、各プロパティーの設定を必ず複数行のオブジェクトで記述します。1 行に詰め込んではいけません。

  ```tsx
  const ctrl = controls(Xxx, {
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

- story は `meta.story({ name: "...", ...ctrl({...}), render(props) { ... } })` の形で作ります。
- 最初に「使い方」(`name: "使い方"`) を置きます。その後、主な外観 (「主な外観」= バリアント一覧)、色、角丸、大きさなどの外観 story と、部品固有の機能 story を置きます。
- `color`、`radius`、`size`、バリアントを公開する場合は、対応する一覧 story を必ず作ります。配列の `map` によるループで構いません。各候補の値が分かるようにラベルも表示します。
- `ctrl({...})` には、その story で固定しないプロパティーの既定値をすべて渡します (他の story との見た目の一貫性のため)。

## ドキュメント

web サイトの mdx ドキュメント (`website/content/docs/react/<カテゴリー>/<名前>.mdx`) と example (`website/examples/react/<名前>/<story>.tsx`) を書くときは、`../component-docs/SKILL.md` に従います。このスキルでは詳細を繰り返しません。

## 実装手順

手順は、一度に 1 つの作業に集中できるよう、短い Step に分けています。各 Step の完了条件を満たしてから次へ進みます。

### Step 1 設計

1. `node_modules/@base-ui/react` のパッケージ一覧から、対応する部品を探します。
2. パターン A〜E から選び、パーツツリー (Root とその子パーツ) とカテゴリーを決めます。

完了条件: パターンとパーツツリー、カテゴリーが決まっている。

### Step 2 パーツファイル

`<名前>.parts.tsx` を作り、パーツツリー順に全パーツを実装します。

1. 必要な import を書きます (Base UI、`cn`、`errors`、`types`、`_use-render`、テーマ、CSS)。
2. コンテキストが必要なグループなら `// Context` セクションを先頭に置きます。
3. 各パーツについて、サブ型 → State → Props → 本体 → namespace → 別名の順に書きます。
4. Root だけのコンポーネントでも、Base UI の Root ラッパー、namespace、別名を定義します。

完了条件: 参照コンポーネントと同じ形で全パーツが定義されている。

### Step 3 CSS

`<名前>.css` を作ります。`../css/SKILL.md` を読み、`sui_<名前>-*` のクラスとカスタムプロパティーを定義します。必要な状態 (pending、disabled など) を先に洗い出し、`@layer sui.important` の状態セクションを計画します。CSS の import はパーツファイルに置いたままにします。

完了条件: パーツごとのセクションが `../css/SKILL.md` の構成に従っている。

### Step 4 公開本体

`<名前>.tsx` を作り、「公開本体」章の標準構成 (SlotProps / PartsProps / Props / useXxx / SuiXxx / namespace) に従って実装します。静的メンバーが必要なときだけ `Object.assign` を使います。ジェネリックが必要なときは専用のコンポーネント型を定義します。

完了条件: 公開 API の型とコンポーネントが定義され、JSDoc が書かれている。

### Step 5 index.ts とエクスポート

1. `<名前>/index.ts` を作ります (パーツの `export *` + 本体の明示的 export)。
2. `packages/react/src/index.ts` の該当カテゴリーに export ブロックを追加します。
3. `packages/react/package.json` の `exports` にサブパスを追加します。

完了条件: 3 つのファイルに追加が入っている。

### Step 6 Storybook

`stories/<カテゴリー>/<名前>.stories.tsx` を作ります (「Storybook」章参照)。

完了条件: 「使い方」と主な外観 story があり、controls で主要プロパティーを操作できる。

### Step 7 ドキュメント

必要に応じて `../component-docs/SKILL.md` に従い、mdx と example を作ります。

### Step 8 テスト

`tests/<カテゴリー>/<名前>.client.test.tsx` を作ります (「テスト」章参照)。ブラウザーを必要としない純粋なロジックを書いた場合は `<名前>.test.ts` に分けます。

完了条件: 公開 API の主要な振る舞いを検証するテストが存在する。

### Step 9 検証

`packages/react` ディレクトリーで次を実行し、すべて通ることを確認します。

```sh
mise run test        # server vitest → client vitest → format → lint → typecheck
```

個別のステップ:

```sh
mise run test:server      # npx vitest --config ./.config/vitest.server.ts
mise run test:client      # npx vitest --config ./.config/vitest.client.ts
mise run test:format      # oxfmt / sort スクリプトの --check
mise run test:lint        # npx oxlint --config ./.config/.oxlintrc.json
mise run test:typecheck   # 複数の tsconfig に対する tsc --noEmit
```

ビルドは `npm run build` で確認します。型エラーがある場合はランダムにキャストせず (`as any` 禁止)、型を修正します。

完了条件: 上記すべてがエラーなく終了する。

## 禁則リスト

- `.ts` は `.js`、`.tsx` は `.jsx` の import 拡張子を使う。間違えない。
- CSS をパーツファイル以外 (本体ファイルや `index.ts`) で import しない。
- `as any` などの型キャストで型エラーをごまかさない。
- `enum` や値を持つ `namespace` を使わない (`erasableSyntaxOnly`)。
- コンポーネント関数名の `Sui` プレフィックスを付け忘れない。
- パーツを `slotProps` にせず、1 段目のプロパティーで直接公開しない (Field 型の便利プロパティーは除く)。
- `slotProps` のメンバーから `readonly` を外さない。`XxxPartsProps` のメンバーは必須 (`readonly`) にする。
- 子のコンテキスト読み取りを `useXxxContext(true)` (オプショナル) にせず、グループ外での既定値を持たない実装にしない。
- `cn()` を使わずに `className` を文字列で直接結合しない。
- 公開 API に 1 行形式の JSDoc を書かない。`@default undefined` を書かない。
- 状態クラスの強制上書きを `@layer sui.important` の外に書かない (`../css/SKILL.md` 参照)。
- `package.json` の `exports` と `packages/react/src/index.ts` への公開登録を忘れない。
- テストを書かずに完了としない。ブラウザーで実行するテストを `*.client.test.tsx` 以外のファイル名にしない。
- 検証コマンド (test、format、lint、typecheck) を通さずに完了としない。

## 既存コンポーネントへの対応

既存コンポーネントの修正や拡張のときも、このスキルの「format による自動整形」「禁則リスト」を守って進めてください。
新規パーツを追加する場合は、パターン A〜E から該当するものを選び、既存のパーツファイル内のパーツツリー順どおりに挿入します。
