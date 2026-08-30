# Skill: new-component

# 新しい React コンポーネントの追加

## 目的

Suru UI の `packages/react` に、新しい React コンポーネントを既存コーディング規約どおりに追加します。
このスキルの目的は、書き手が変わっても同じ実装ができることです。
ここで定めた規則を最優先で守ります。ただし、このスキルと参照している実例が矛盾するときは、実例を優先してください。このスキルが古くなっている可能性があります。

基準となる実装 (最新のコーディングスタイル) は、次の 2 つのコンポーネントです。

- `packages/react/src/accordion/` — Base UI のパーツを組み合わせるコンポーネント、データ駆動なアイテム、ジェネリックな型推論
- `packages/react/src/button/` — Base UI のコンポーネントのラップ、コンテキスト、静的メンバー (`Object.assign`)

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

### ディレクトリーとファイル

コンポーネント 1 つは、`packages/react/src/<名前>/` の 1 ディレクトリーにまとめます。カテゴリーのディレクトリーは作りません。

```
packages/react/src/<名前>/
  index.ts         // パーツと本体を再エクスポートする
  <名前>.tsx        // 公開コンポーネント本体
  <名前>.parts.tsx  // Base UI のラッパーとパーツ（Root、Content、Indicator など）
  <名前>.css        // スタイル
  _<名前>.tsx?      // (必要に応じて) このコンポーネント専用の非公開ヘルパー
```

`*.parts.tsx` は子パーツがない場合も作ります。
Base UI の型を Suru UI の型として公開し、`cn()` によるクラス名の合成と CSS の import を一箇所にまとめる層です。
そのため、`Form` のように Root だけを持つコンポーネントでも、Root のラッパーは `*.parts.tsx` に置きます。

非公開ヘルパー (項目オブジェクトの判定、値の型推論、既定アイコンなど) は、本体やパーツから分離して `_<名前>.tsx` に置きます (例: `src/accordion/_accordion.tsx`)。import の拡張子は `./_<名前>.jsx` です。

Storybook の stories は `packages/react/stories/<名前>.stories.tsx` に置きます (カテゴリーのディレクトリーは作りません)。
テストは `packages/react/tests/` に置きます。ブラウザーで実行するテストは `<名前>.client.test.tsx`、ブラウザーを必要としないロジックのテストは `<名前>.test.ts`（またはサーバー専用なら `<名前>.server.test.ts`）です。

## format による自動整形

`packages/react` の `mise run format` は複数の整形器を実行します。次の項目は**手動で整える必要がありません**。意味的な正しさ (何を並べるか) だけ気にしてください。

| 整形対象                        | 整形器                              | 規則                                                                                                                       |
| ------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| TS/TSX 全般                     | oxfmt (`sortImports`)               | import 宣言のグループ化と並び替え                                                                                          |
| import/export の `{}` 内        | `scripts/sort-import-exports.ts`    | 型 → 値の順。各グループ内は名前が短い順 (同長なら辞書順)                                                                   |
| JSX 属性                        | `scripts/sort-jsx-props.ts`         | 一般 → `aria-*` → `data-*` の順。各グループ内は短い順 (同長なら辞書順)。スプレッド属性は位置維持、コメント付き属性は対象外 |
| 型リテラル/interface のメンバー | `scripts/sort-type-props.ts`        | プロパティー・メソッド署名を名前順 (呼び出し署名など名前のないメンバーは位置維持)                                          |
| 型 namespace のメンバー         | `scripts/sort-namespace-exports.ts` | `State` → `Props` → `Context` → `SlotProps` → その他の型 (名前順) → ネストした namespace                                   |
| CSS のプロパティー順            | stylelint (`--fix`)                 | recess order                                                                                                               |
| CSS 変数の宣言順                | `scripts/sort-css-variables.ts`     | recess order のプロパティー順。変種の相対順序は維持                                                                        |

たとえば「import の `{}` 内は `type` 付きを先に」という規則は自動整形されるため、覚える必要はありません。
逆に、JSDoc、セクション見出し、コンポーネントの構造、命名などは自動整形されないため、このスキルの規則に従います。

## パターンの選択

まず実装する前に、次の中からパターンを 1 つ選びます。選ぶ基準は次のとおりです。

1. Base UI に同じ部品のコンポーネントがあるかどうかを、`@base-ui/react` のパッケージ一覧で調べます。
2. ある場合はパターン A（そのまま包む）かパターン B（パーツを組む）で、子パーツが複数で構造を持つ場合はパターン B を選びます。
3. 複数の子をまとめて状態やスタイルを伝えるグループの場合はパターン C を併用します。
4. Base UI にない単純な要素（`span`、`svg` など）はパターン D で `useRender` を使います。
5. 既存の Suru UI コンポーネントの特殊形ならパターン E で既存のパーツへ委譲します。
6. Base UI にない複雑なコンポーネントでも、構成は変えません。Root パーツが状態とロジックを持ち、本体は「データ駆動なアイテム (Accordion 方式)」に従って組み立てます。

パーツは、実装したい部品の意味的な構造から決めます。既存の例:

| コンポーネント | パーツ（ファイル内の並び順）                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Button         | Root, Content, Pending, CircularProgress, CircularProgressTrack, CircularProgressFill, CircularProgressFillRotation   |
| Accordion      | Root, Item, Heading, Trigger, Indicator, Content                                                                      |

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

1. サブ型 — スタイル系 (`XxxRootColor`, `XxxRootRadius`, `XxxRootSize`, `XxxRootVariant`, `XxxRootOrientation` など)、イベント系 (`AccordionRootChangeEventDetails`, `AccordionRootChangeEventReason` など)、データ系 (`AccordionRootItemObject`, `IAccordionRootItemRenderer` など) を、アルファベット順で定義します。スタイル系の JSDoc には候補値の箇条書きを付けます。

   ```ts
   /**
    * アコーディオンの角丸の大きさです。
    *
    * - `"none"`: 直角
    * - `"sm"`: 小さめ
    * - `"md"`: 標準的
    * - `"lg"`: 大きめ
    */
   export type AccordionRootRadius = "none" | Size;
   ```

2. `State` 型 — `/** {@link XxxRoot} が持つ状態です。 */` の JSDoc を付ける。Base UI 由来の状態は namespace 経由で参照します (`Accordion.Item.State`, `Button.State`)。Base UI の状態を持たないパーツは空の型にします (`export type AccordionIndicatorState = {};`)。コンテキストを状態として持つパーツはコンテキスト型にします (`ButtonContentState = Context`)。
3. `Props` 型 — `/** {@link XxxRoot} に渡す props です。 */` の JSDoc を付ける。スタイル系プロパティーの型はサブ型を参照し、JSDoc に「グループの値が優先されます」のような上書き規則も書きます。Base UI の型に `children` を関数にするなどの拡張をする場合は `Omit<..., "children">` してから拡張します (`AccordionRootProps` 参照)。`unstyled` のようなスタイル無効化プロップも同じ方法で拡張します (`AccordionTriggerProps` 参照)。
4. コンポーネント本体 — 関数名は `Sui<コンポーネント名><パーツ名>` (例: `function SuiAccordionRoot`)。`export const AccordionRoot: IComponent<AccordionRootProps> = function SuiAccordionRoot(props) { ... };` の形です。
5. 本体専用の非公開ヘルパー — 既定レンダラー (`defaultRootItemRenderer` など) は、本体の直後に置きます。
6. `export namespace <Part>` — JSDoc は**付けません**。メンバーは `State` → `Props` → `Context` → `SlotProps` → その他の型 (名前順) の順に並びます (自動整形)。各メンバーの JSDoc は `{@link XxxXxx}` の形です。
7. 別名 — `export const Root: IComponent<Root.Props> = AccordionRoot;` の形で、JSDoc は `/** {@link AccordionRoot} */` の形です。

コンポーネントの型は `types.ts` の `IComponent<TProps>` を使います。コンテキスト読み取りフックの型は `IUseContext<TContext>` です。
`erasableSyntaxOnly` が有効です。`enum` と、値を持つ `namespace` は使えません。namespace には型だけを入れます。

### ジェネリックなパーツ

型パラメーターを持つパーツは、`IComponent` を拡張した呼び出しシグネチャーの interface で型を定義し、戻り値は `IComponent.Return` にします。interface の型パラメーターの既定値は `never`、型エイリアスの既定値は `any` にします。

```tsx
interface IAccordionRoot extends IComponent<AccordionRootProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = never, TValue = $InferItemValue<TItem>>(
    props: AccordionRootProps<TItem, TValue>,
  ): IComponent.Return;
}

/**
 * アコーディオンのルートコンポーネントです。
 */
export const AccordionRoot: IAccordionRoot = function SuiAccordionRoot(props: AccordionRootProps) {
  // ...
};
```

### Root への `data-scope` 属性

Root パーツは、Base UI (または `useRender`) のルート要素に `data-scope=""` を付けます。CSS 側の `@scope (.sui_<component>) to ([data-scope])` と対になっており、ネストした別コンポーネントの内部にスタイルが漏れるのを防ぎます (`../css/SKILL.md` 参照)。

```tsx
<Accordion.Root
  {...otherProps}
  className={cn(
    className,
    "sui_accordion",
    `sui_accordion-size_${size}`,
    // ...
  )}
  data-scope=""
>
```

### import の規則

- `import` のファイル拡張子は、コンパイル後の拡張子で書きます。`.ts` ファイルは `.js`、`.tsx` ファイルは `.jsx` です。`@base-ui/react/*`、`@suru-ui/theme` などのパッケージは拡張子なしです。
- 宣言の並び (外部パッケージ → 相対パス → CSS) と `{}` 内の並びは oxfmt と sort スクリプトが自動整形します (「format による自動整形」参照)。CSS は最後に `import "./<名前>.css";` を書きます。
- CSS はパーツファイル (`*.parts.tsx`) でのみ import します。本体ファイルや `index.ts` では import しません。
- テーマの型は `import type { Size, Color } from "@suru-ui/theme";` で取り込みます。

## パターン A（Base UI コンポーネントのラップ）

Base UI のコンポーネントをそのまま使い、クラス名と共通プロパティーを追加します。
参考実装は `packages/react/src/button/button.parts.tsx` です。

```tsx
export type ButtonRootColor = Color;

/**
 * {@link ButtonRoot} が持つ状態です。
 */
export type ButtonRootState = Button.State;

/**
 * {@link ButtonRoot} に渡す props です。
 */
export type ButtonRootProps = React.ComponentProps<typeof Button> & {
  /**
   * ボタンの配色を指定します。
   *
   * @default "grey"
   */
  color?: ButtonRootColor | undefined;
  // ...
};

/**
 * ボタンのルートコンポーネントです。
 */
export const ButtonRoot: IComponent<ButtonRootProps> = function SuiButtonRoot(props) {
  const {
    size = "md",
    type = "button",
    color = "grey",
    radius = size,
    variant = "solid",
    disabled = false,
    outlined = false,
    className,
    ...otherProps
  } = props;

  return (
    <Button
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_button",
        `sui_button-size_${size}`,
        `sui_button-color_${color}`,
        `sui_button-radius_${radius}`,
        `sui_button-variant_${variant}`,
        outlined && "sui_button-outlined",
        disabled && "sui_button-disabled",
      )}
      data-scope=""
    />
  );
};

export namespace Root {
  /**
   * {@link ButtonRootState}
   */
  export type State = ButtonRootState;

  /**
   * {@link ButtonRootProps}
   */
  export type Props = ButtonRootProps;
}

/**
 * {@link ButtonRoot}
 */
export const Root: IComponent<Root.Props> = ButtonRoot;
```

(例を短くするため JSDoc を省略しています。実際のコードには全項目に JSDoc を付けます。)

- 既定値は分割代入で `size = "md"` のように書きます。他のプロパティーに依存する `radius` は `radius = size` です。グループから値を読む場合は `size: sizeProp = "md"` としてから `const size = group?.size ?? sizeProp;` の形にします。
- クラス名は `cn(className, ...)` で利用者のクラス名と合成します。修飾クラスはテンプレートリテラル、ブール状態は `outlined && "sui_button-outlined"` の形で並べます。
- Base UI 由来の状態は render props で状態クラスを付けます (例: `(state) => state.disabled && "sui_accordion-disabled"`)。
- Base UI のコンポーネントは、利用者のイベントハンドラー、Render Props、`className` をそのまま通します。
- Base UI の型は namespace 経由で参照します (`Button.State`, `Accordion.Root.State`)。
- コンテキストで子に状態を伝えるときは、値を `React.useMemo` で作り、`<Context value={context}>` で包みます (ButtonRoot は pending 状態を提供します)。

## コンテキスト (グループ)

グループの Root が状態とスタイルをコンテキストで子に伝え、子がその値を読んで表示を決めます。
参考実装は `packages/react/src/button/button.parts.tsx` と `packages/react/src/layout/action-group/action-group.parts.tsx` です。

`// Context` セクションでは、次の要素をこの順で定義します。

1. コンテキスト値のサブ型 (`ActionGroupContextColor` など。複雑なコンテキストの場合のみ)
2. コンテキスト値の型 `XxxContext` (各プロパティーは `readonly` と JSDoc)
3. `React.createContext<XxxContext | null>(null)` のインスタンス
4. 内部フック `useSuiXxxContext(optional?)` — オーバーロード付き。見つからないときは `ContextMissingError` を投げる
5. 公開フック `export const useXxxContext: IUseContext<XxxContext> = useSuiXxxContext;`
6. エイリアス `export type Context = XxxContext;` と `export const Context: React.Context<Context | null> = XxxContext;`
7. 必要なら `namespace Context { Color; Radius; Size; Variant; ... }` (action-group.parts.tsx 参照)
8. `export const useContext: IUseContext<Context> = useXxxContext;`

```tsx
function useSuiButtonContext(optional?: false): ButtonContext;
function useSuiButtonContext(optional?: boolean): ButtonContext | null;
function useSuiButtonContext(optional?: boolean): ButtonContext | null {
  const ctx = React.use(ButtonContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });
  }

  return ctx;
}

/**
 * {@link ButtonContext} を読み取るフックです。
 */
export const useButtonContext: IUseContext<ButtonContext> = useSuiButtonContext;
```

- `contextName` にはコンテキスト名、`providerName` には提供側 Root の名前を渡します (`src/errors.ts` の `ContextMissingError`)。
- 子の読み取りは必ず `useXxxContext(true)` でオプショナルにし、グループ外での既定値を子側に持ちます (`const size = group?.size ?? sizeProp`)。
- Root がコンテキストを提供するときは `<Context value={context}>` の children に要素を包みます。値は `React.useMemo` で作ります。`useRender` の返り値 (`element`) を包む形もあります。

## 公開本体 (`<名前>.tsx`)

公開本体は、パーツを組み立てて利用者向け API を作る層です。
参考実装は `packages/react/src/button/button.tsx` と `packages/react/src/accordion/accordion.tsx` です。
公開本体は純粋な組み立て層です。状態はパーツ (Root) だけが持ち、本体で `useState` を使って状態を複製してはいけません。

標準の構成要素は次のとおりです (上からこの順)。

1. 公開型エイリアス — Root 層のサブ型を本体名に置き換えた別名です。JSDoc は `{@link ButtonRootColor}` の形です。

   ```tsx
   /**
    * {@link ButtonRootColor}
    */
   export type ButtonColor = ButtonRootColor;
   ```

2. `XxxSlotProps` — 各パーツに渡すオプションのプロパティー。全メンバーに `readonly` を付け、各メンバーの JSDoc は `{@link XxxYyy} に渡す props です。` の形です。`children` を本体が管理するパーツは `Omit<XxxProps, "children">` にします。

   ```tsx
   /**
    * {@link Accordion} の各パーツに渡す props です。
    */
   export type AccordionSlotProps = {
     /**
      * {@link AccordionContent} に渡す props です。
      */
     readonly content?: Omit<AccordionContentProps, "children"> | undefined;

     /**
      * {@link AccordionTrigger} に渡す props です。
      */
     readonly trigger?: Omit<AccordionTriggerProps, "children"> | undefined;
   };
   ```

3. `XxxAPI` — `useXxxAPI` フックの戻り値型。`getRootProps()` と、パーツごとの `getXxxProps()` をメソッドとして持ちます。interface の JSDoc は `{@link Xxx} を構成する各パーツの props を作成するための API です。` です。各メソッドの JSDoc は `{@link XxxYyy} に渡す props を取得します。` の形で、引数があるときは `@param` を付けます。メソッドの並び順は自動整形されます (名前順)。

   ```tsx
   /**
    * {@link Button} を構成する各パーツの props を作成するための API です。
    */
   export interface ButtonAPI {
     /**
      * {@link ButtonContent} に渡す props を取得します。
      */
     getContentProps(): ButtonContentProps;

     /**
      * {@link ButtonRoot} に渡す props を取得します。
      */
     getRootProps(): Omit<ButtonRootProps, "children">;
     // ...
   }
   ```

4. `XxxState`, `XxxProps` — Root の状態と props を本体名で別名公開します。`XxxProps` は Root の型に `slotProps` を加え、本体が管理する `children` などを調整します。

   ```tsx
   /**
    * {@link Button} に渡す props です。
    */
   export type ButtonProps = Omit<ButtonRootProps, "children"> &
     Pick<ButtonContentProps, "children"> &
     Pick<ButtonCircularProgressProps, "percentage" | "indeterminate"> & {
       /**
        * 各パーツに個別の props を渡すためのオブジェクトです。
        *
        * 各パーツの props が優先されます。
        */
       slotProps?: ButtonSlotProps | undefined;
     };
   ```

5. `IUseXxxAPI` と `useXxxAPI` — API を作るフック。フックの型は呼び出しシグネチャーの interface にし、`@param` と `@returns` を付けます。実装は `function useSuiXxxAPI` という名前付き関数式にします。`slotProps` の各メンバーが常に勝つように、本体固有の値を先に展開します (children のようなパーツに必ず渡すべき値は後に展開します)。`useAPI` という別名も必ず公開します。

   ```tsx
   interface IUseButtonAPI {
     /**
      * {@link ButtonAPI} を作成します。
      *
      * @param props {@link Button} の props です。
      * @returns ボタンの API です
      */
     (props: ButtonProps): ButtonAPI;
   }

   /**
    * {@link ButtonAPI} を作成するフックです。
    */
   export const useButtonAPI: IUseButtonAPI = function useSuiButtonAPI(props) {
     const {
       children,
       slotProps: {
         content: contentProps,
         pending: { overlay = true, ...otherPendingProps } = {},
         // ...
       } = {},
       percentage,
       indeterminate,
       ...otherRootProps
     } = props;

     return {
       getRootProps() {
         return otherRootProps;
       },
       getContentProps() {
         return {
           ...contentProps,
           children,
         };
       },
       getPendingProps() {
         return {
           ...otherPendingProps,
           overlay,
         };
       },
       // ...
     };
   };

   /**
    * {@link useButtonAPI}
    */
   export const useAPI: IUseButtonAPI = useButtonAPI;
   ```

6. 公開コンポーネント — `IXxx` interface と `function SuiXxx` で定義します。内部で `useXxxAPI(props)` を呼び、パーツツリー順に描画します。JSDoc にはコンポーネントの説明を書きます。

   ```tsx
   /**
    * 複数の主な外観と状態を持つクリック可能なボタンコンポーネントです。
    */
   export const Button: IButton = function SuiButton(props: ButtonProps) {
     const api = useButtonAPI(props);

     return (
       <ButtonRoot {...api.getRootProps()}>
         <ButtonContent {...api.getContentProps()} />
         {/* ... */}
       </ButtonRoot>
     );
   };
   ```

7. `export namespace Xxx` — JSDoc は付けません。`State`、`Props`、`Context`、`SlotProps`、`Color`、`Radius`、`Size`、`Variant` などのメンバーを持ち、各メンバーの JSDoc は `{@link XxxXxx}` の形です。メンバーの並び順は自動整形されます。ジェネリックな型は型パラメーターを失わないようにします (`AccordionProps` と `Accordion.Props` 参照)。

8. 本体固有の非公開ヘルパー (デフォルトアイコンなど) は `_<名前>.tsx` に置きます。

### 静的メンバー (Object.assign)

公開本体に静的メンバー (パーツやフック) を付ける場合は、interface で型を宣言し、`/*#__PURE__*/ Object.assign(...)` で結合します。
参考実装は `button.tsx` (`Button.useContext`) です。

```tsx
interface IButton extends IComponent<ButtonProps> {
  /**
   * {@link useButtonContext}
   */
  readonly useContext: IUseContext<ButtonContext>;
}

export const Button: IButton = /*#__PURE__*/ Object.assign(
  function SuiButton(props: ButtonProps) {
    const api = useButtonAPI(props);
    // ...
  },
  {
    useContext: useButtonContext,
  },
);
```

- パーツツリーを持たない単純な部品 (Form のような Root だけのもの) に、不要な静的メンバーを追加してはいけません。
- 静的パーツに対応する型は、公開本体の namespace に入れず、必要に応じて `Field.Item.State` のような入れ子の型 namespace を interface 上で宣言します。

### ジェネリックな公開本体

入力値や項目の型パラメーターを持つ場合は、ジェネリックな呼び出しシグネチャーを interface で定義します。
参考実装は `packages/react/src/accordion/accordion.tsx` です。

```tsx
interface IAccordion extends IComponent<AccordionProps> {
  /**
   * @template TItem 項目の型です。
   * @template TValue 項目の値の型です。
   */
  <TItem = never, TValue = $InferItemValue<TItem>>(
    props: AccordionProps<TItem, TValue>,
  ): IComponent.Return;
}

/**
 * アコーディオンを表示するコンポーネントです。
 */
export const Accordion: IAccordion = function SuiAccordion(props: AccordionProps) {
  const api = useAPI(props);
  const { children, ...otherRootProps } = api.getRootProps();

  return (
    <AccordionRoot {...otherRootProps}>
      {children ??
        ((item, index) => (
          <AccordionItem key={index} {...api.getItemProps(item)}>
            <AccordionHeading {...api.getHeadingProps()}>
              <AccordionTrigger {...api.getTriggerProps()}>
                {api.getTitle(item)}
                <AccordionIndicator {...api.getIndicatorProps()} />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionContent {...api.getContentProps(item)} />
          </AccordionItem>
        ))}
    </AccordionRoot>
  );
};
```

- ジェネリック型の既定値と制約を Root 層、本体層、namespace で一致させ、型パラメーターを失わないようにします。
- 公開本体でも同じ `IXxx` 型をそのまま使います (`IComponent<XxxProps>` に狭めない)。

### 便利プロパティー (Field 型)

`Field` の `label`、`description`、`errorMatches` のような 1 段目のプロパティーは、パーツの生のプロパティーではなく公開本体固有の便利な API です。これらは `slotProps` の規則と区別し、`XxxProps` の中で JSDoc 付きで定義します。`"label" in props` のようにプロパティーの存在が意味を持つ場合は、存在判定で条件付き描画します。

## パターン D（Render Props パーツ）

Base UI にない小物パーツ（`span`、`svg`、`circle` など）は、`useRender` で描画します。
参考実装は `packages/react/src/accordion/accordion.parts.tsx` の `Indicator` と `packages/react/src/button/button.parts.tsx` の `Content` です。

```tsx
/**
 * {@link AccordionIndicator} が持つ状態です。
 */
export type AccordionIndicatorState = {};

/**
 * {@link AccordionIndicator} に渡す props です。
 */
export type AccordionIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<AccordionIndicatorState>;

/**
 * アコーディオンの展開状態を示すアイコンを表示するコンポーネントです。
 */
export const AccordionIndicator: IComponent<AccordionIndicatorProps> =
  function SuiAccordionIndicator(props) {
    const { children = <ChevronIcon />, ...otherProps } = props;

    return useRender({
      defaultTagName: "span",
      props: [
        otherProps,
        {
          children,
          className: "sui_accordion_indicator",
        },
      ],
    });
  };
```

- `useRender` の `props` は、利用者のプロパティーと固定プロパティーの配列、または 1 つのオブジェクトです。プロパティーは配列の先頭から順に合成されます。
- 要素を条件付きで描画したいときは `enabled` に条件を渡します (`ButtonPending` は `ctx.pending || keepMounted` を渡します)。
- コンテキストを Render Props の状態として渡すときは `state` に渡します (`ButtonContent` は `state: ctx`)。
- 空状態の型 (`{}`) は `AccordionIndicatorState` のような名前で定義し、`RenderProps` の型引数に渡します。
- Base UI を包まないパーツ (状態を持つ Root や Item を含む) も、DOM 要素を返すときは必ず `useRender` 経由にします。生の JSX (`<div {...}>`) を直接返してはいけません。`className`、`style` (Render Props 由来では関数になり得る)、`ref`、利用者の render prop はすべて `useRender` が合成します。
  - 利用者のイベントハンドラーを壊さないときは、該当するハンドラーだけ分割代入して呼び出してから固定ハンドラーを実行します。

## パターン E（既存コンポーネントへの委譲）

既存の Suru UI パーツと同じ構造の部品は、既存パーツへ委譲します。
参考実装は `packages/react/src/toggle-button/toggle-button.parts.tsx` です。

- 委譲するパーツも、`export namespace Content` と `export const Content` の別名まで通常どおり定義し、内部は既存のパーツを再利用します。
- 既存のパーツの型 (`Button.Root.State` など) を自分の型に再利用します。

## データ駆動なアイテム (Accordion 方式)

`items` や `data` のようなノード一覧から項目を描画するコンポーネントは、次の構成にします。参考実装は `packages/react/src/accordion/` です。

1. **状態は Root だけが持つ** — 選択・展開などの状態は Root パーツが管理します。公開本体で状態を持ってはいけません (`useState` を複製しない)。
2. **Root は関数子を受け取れるようにする** — `children` に項目レンダラーを指定できるようにし、既定値は `defaultRootItemRenderer` のような内部レンダラーにします。レンダラーの型は呼び出しシグネチャーの interface として公開します。

   ```tsx
   /**
    * アコーディオンの各項目をレンダリングする関数のインターフェイスです。
    *
    * @template TItem 項目の型です。
    */
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

   export type AccordionRootProps<TItem = any, TValue = any> = Omit<
     React.ComponentProps<typeof Accordion.Root<TValue>>,
     "children"
   > & {
     /**
      * アコーディオンの内容、または各項目をレンダリングする関数です。
      */
     children?: React.ReactNode | IAccordionRootItemRenderer<TItem>;

     /**
      * アコーディオンの項目です。
      */
     items?: readonly TItem[] | undefined;
     // ...
   };
   ```

   Root の本体は `typeof children === "function" ? items.map(children) : children` で描画します。既定レンダラーは Root の直後に `const defaultRootItemRenderer: IAccordionRootItemRenderer = ...` として置きます。

3. **項目オブジェクトの判定と推論は `_` ファイルに置く** — 項目がオブジェクトかどうかの判定 (`isItemObject`)、値の型推論 (`$InferItemValue`)、既定アイコン (`ChevronIcon`) は `_<名前>.tsx` に置きます。項目文字列の変換には `src/_to-react-node.ts` の `toReactNode` を使います。

   ```tsx
   export type $InferItemValue<TItem> = TItem extends {
     content: any;
     title: any;
     value?: infer TItemValue;
   }
     ? TItemValue
     : any;
   ```

4. **API が項目ごとの props を作る** — `useXxxAPI` は、`getItemProps(item)`、`getTitle(item)`、`getContentProps(item)` のように項目を引数に取るメソッドと、`getHeadingProps()` のような共通パーツのメソッドを提供します。本体は `children ?? ((item, index) => ...)` の形で既定の組み立てをします。
5. **slotProps は構造に関わるプロパティーを Omit する** — アイテムの識別子や位置など生成される値が優先されるプロパティーは、`Omit<XxxItemProps, "id" | "level">` のように型で除外し、「どのプロパティーが上書きされないか」を JSDoc に書きます。

## JSDoc

- 公開する型、プロパティー、コンポーネント、namespace の各メンバーには必ず複数行 JSDoc を付けます。1 行形式の `/** ... */` は公開 API では禁止です。
- 別名と namespace のメンバーの JSDoc は `{@link 元の名前}` の形にします (`/** {@link ButtonRootColor} */`)。「〜です。」は付けません。
- `State` 型は `{@link XxxRoot} が持つ状態です。`、`Props` 型は `{@link XxxRoot} に渡す props です。` と書きます。
- namespace 自体には JSDoc を付けません。
- スタイル系サブ型には候補値の箇条書きを付けます。
- コンポーネントの JSDoc には説明を書きます (利用例は stories とドキュメントに任せます)。
- 自明でない既定値には `@default` を付けます。`undefined` の場合は付けません。
- 詳細な形式は `../jsdoc/SKILL.md` に従います。

## index.ts

コンポーネントの `index.ts` は、最初にパーツファイルを `export *` し、その後で本体ファイルから公開 API を明示的に export します。

```ts
export * from "./button.parts.jsx";

export {
  type ButtonAPI,
  type ButtonSize,
  type ButtonColor,
  type ButtonProps,
  type ButtonState,
  type ButtonRadius,
  type ButtonVariant,
  type ButtonSlotProps,
  Button,
  useAPI,
  useButtonAPI,
} from "./button.jsx";
```

- パーツの `export *` と本体の明示的な export を分ける点が重要です。本体へ `export *` してはいけません。
- `{}` 内の並びは sort スクリプトが自動整形します。

### `src/index.ts` への追加

`packages/react/src/index.ts` の該当カテゴリーのコメント (`// buttons`, `// forms` など) の下に export ブロックを追加します。ブロック内の並びも自動整形されます。

```ts
// buttons
export {
  type ButtonSize,
  type ButtonColor,
  type ButtonProps,
  type ButtonState,
  Button,
} from "./button/index.js";
```

### `package.json` のエクスポート

新しいコンポーネントを追加したら、`packages/react/package.json` の `exports` にサブパスを追加します。エクスポートはカテゴリーごとのブロックで並んでいるため、該当カテゴリーのブロックを見つけて挿入します。

```json
"./<名前>": {
  "types": "./dist/src/<名前>/index.d.ts",
  "default": "./dist/src/<名前>/index.js"
},
```

## テスト

コンポーネントのテストは `packages/react/tests/<名前>.client.test.tsx` に置きます。書き方は `../vitest/SKILL.md` に従います。現時点の模範例は `tests/autocomplete.client.test.tsx` です。

```tsx
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Button } from "../src/button/index.js";

describe("Button", () => {
  test("既定のスタイルクラスをボタンへ適用する", async () => {
    // 実行
    const screen = await render(<Button>ボタン</Button>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveClass("sui_button-size_md");
  });
});

describe("ButtonParts.Root", () => {
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

`packages/react/stories/<名前>.stories.tsx` を作ります。
模範例は `packages/react/stories/button.stories.tsx` と `packages/react/stories/accordion.stories.tsx` です。

- import は `import { preview, controls } from "../.config/storybook/preview.js";` と、コンポーネント本体の `../src/<名前>/index.js` を使います。
- テーマの配列 (`SIZES`, `COLORS`, `COLOR_TEMPLATES`) は `@suru-ui/theme` から import します。角丸の候補は `const RADII = ["none", ...SIZES, "full"] as const;` として作ります。バリアントの候補はコンポーネントの型から作ります (`const VARIANTS: readonly Accordion.Variant[] = ["liquid", "naked"];`)。
- meta は次の形です。title はカテゴリーを付けず、コンポーネント名だけにします。

  ```tsx
  const meta = preview.meta({
    title: "Button",
    component: Button,
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
- `ctrl({...})` には、その story で固定しないプロパティーの既定値をすべて渡します (他の story との見た目の一貫性のため)。他のプロパティーに依存するプロパティー (`radius` など) は `radius: undefined` を渡します。
- 必須プロパティー (`items` や `data` など) も `ctrl({...})` の既定値に含めます (型エラーの原因になります)。UI で操作できない値は `data: { control: false }` を設定に加えます。
- パーツを直接使う story (`Parts`) では、本体の props をそのままパーツへスプレッドしません。本体固有のプロパティーは分割代入で除外してから渡します (`const { data: _data, ...rootProps } = props;`)。

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
5. Root のルート要素に `data-scope=""` を付けます。

完了条件: 参照コンポーネントと同じ形で全パーツが定義されている。

### Step 3 CSS

`<名前>.css` を作ります。`../css/SKILL.md` を読み、`sui_<名前>-*` のクラスとカスタムプロパティーを定義します。必要な状態 (pending、disabled など) を先に洗い出し、`@layer sui.important` の状態セクションを計画します。CSS の import はパーツファイルに置いたままにします。

完了条件: パーツごとのセクションが `../css/SKILL.md` の構成に従っている。

### Step 4 公開本体

`<名前>.tsx` を作り、「公開本体」章の標準構成 (SlotProps / API / useXxxAPI / SuiXxx / namespace) に従って実装します。静的メンバーが必要なときだけ `Object.assign` を使います。ジェネリックが必要なときは専用のコンポーネント型 (`IXxx`) を定義します。

完了条件: 公開 API の型とコンポーネントが定義され、JSDoc が書かれている。

### Step 5 index.ts とエクスポート

1. `<名前>/index.ts` を作ります (パーツの `export *` + 本体の明示的 export)。
2. `packages/react/src/index.ts` の該当カテゴリーに export ブロックを追加します。
3. `packages/react/package.json` の `exports` にサブパスを追加します。

完了条件: 3 つのファイルに追加が入っている。

### Step 6 Storybook

`stories/<名前>.stories.tsx` を作ります (「Storybook」章参照)。

完了条件: 「使い方」と主な外観 story があり、controls で主要プロパティーを操作できる。

### Step 7 ドキュメント

必要に応じて `../component-docs/SKILL.md` に従い、mdx と example を作ります。

### Step 8 テスト

`tests/<名前>.client.test.tsx` を作ります (「テスト」章参照)。ブラウザーを必要としない純粋なロジックを書いた場合は `<名前>.test.ts` に分けます。

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
- Root パーツのルート要素に `data-scope=""` を付け忘れない (CSS の `@scope` と対になる)。
- `as any` などの型キャストで型エラーをごまかさない。
- `enum` や値を持つ `namespace` を使わない (`erasableSyntaxOnly`)。
- `this` を参照しない関数型のメンバーをメソッドシグネチャーで定義しない (アロー式のプロパティーとして `readonly` 付きで定義する)。
- DOM 要素を返すパーツを `useRender` 経由にせず、生の JSX で返さない (`style` や `ref` の合成を壊す)。
- 複数のパーツを組み合わせた複合パーツを作らない。アイテム一式の組み立ては本体が `useXxxAPI` の `getXxxProps` メソッドで行う (「データ駆動なアイテム」参照)。
- 公開本体で状態を持たない (`useState` を複製しない)。状態は Root パーツだけが持つ。
- データ駆動な Root の関数子にコンテキストを渡さない。描画すべきアイテムとその構造情報を渡す (Accordion と同じ形)。
- 未使用の分割代入はリントエラーになる。意図的に無視する変数は `_data` のように `_` で始める。
- Render Props 型と交差したプロパティー (`className` や `style`) を手動でスプレッドして合成しない。`useRender` の props 配列に任せる。
- コンポーネント関数名の `Sui` プレフィックスを付け忘れない。
- パーツを `slotProps` にせず、1 段目のプロパティーで直接公開しない (Field 型の便利プロパティーは除く)。
- `slotProps` のメンバーから `readonly` を外さない。
- 子のコンテキスト読み取りを `useXxxContext(true)` (オプショナル) にせず、グループ外での既定値を持たない実装にしない。
- `cn()` を使わずに `className` を文字列で直接結合しない。
- 公開 API に 1 行形式の JSDoc を書かない。`@default undefined` を書かない。
- 別名や namespace メンバーの JSDoc に「〜です。」を付けない (`/** {@link XxxRootColor} */` の形にする)。
- namespace 自体に JSDoc を付けない。
- 状態クラスの強制上書きを `@layer sui.important` の外に書かない (`../css/SKILL.md` 参照)。
- `package.json` の `exports` と `packages/react/src/index.ts` への公開登録を忘れない。
- テストを書かずに完了としない。ブラウザーで実行するテストを `*.client.test.tsx` 以外のファイル名にしない。
- 検証コマンド (test、format、lint、typecheck) を通さずに完了としない。

## 既存コンポーネントへの対応

既存コンポーネントの修正や拡張のときも、このスキルの「format による自動整形」「禁則リスト」を守って進めてください。
新規パーツを追加する場合は、パターン A〜E から該当するものを選び、既存のパーツファイル内のパーツツリー順どおりに挿入します。
古いスタイルで書かれた既存コンポーネント (checkbox-group など) を全面改修するときは、`src/accordion/` と `src/button/` の形に合わせてください。
