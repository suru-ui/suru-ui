import type * as React from "react";

/**************************************************************************************************/

/**
 * React の合成イベントの基本型です。
 */
export type ReactEvent = React.SyntheticEvent;

/**
 * Base UI のイベント型です。
 *
 * Base UI のハンドラーが実行されないようにするためのメソッドと、その実行が防がれたかどうかのフラグを持ちます。
 *
 * @template E 基本となる React の合成イベント型です。
 * @see https://github.com/mui/base-ui/blob/v1.0.0/packages/react/src/utils/types.ts#L15-L18
 */
export type BaseUIEvent<E extends ReactEvent> = E & {
  /**
   * Base UI のイベントハンドラーの実行を防ぎます。
   */
  preventBaseUiHandler: () => void;

  /**
   * Base UI のイベントハンドラーの実行が防がれたかどうかを示すフラグです。
   */
  readonly baseUIHandlerPrevented?: boolean;
};

/**
 * Suru UI のイベント型です。
 *
 * Base UI のイベント (`TEvent`) を拡張し、Suru UI のハンドラーの実行を防ぐための機能を追加します。
 *
 * @template TEvent 基本となる Base UI のイベント型です。
 */
export type SuiEvent<TEvent extends BaseUIEvent<ReactEvent>> = BaseUIEvent<TEvent> & {
  /**
   * Suru UI のイベントハンドラーの実行を防ぎます。
   */
  preventSuiHandler(): void;

  /**
   * Suru UI のイベントハンドラーの実行が防がれたかどうかを示すフラグです。
   */
  readonly suiHandlerPrevented?: boolean;
};

/**
 * Suru UI のイベントハンドラーの関数シグネチャーです。
 *
 * Base UI との連携のため、引数として Suru UI のカスタムイベント (`SuiEvent`) を受け取ります。
 *
 * @template TEvent ラップされた Base UI のイベント型です。
 * @template TRestArgs イベントに続く追加の引数の型です。
 */
export interface SuiEventHandler<
  TEvent extends BaseUIEvent<ReactEvent>,
  TRestArgs extends unknown[] = [],
> {
  (event: SuiEvent<TEvent>, ...args: TRestArgs): void;
}

/**
 * コンポーネントの状態 (`TState`) に基づいてクラス名を動的に決定する関数です。
 *
 * @template TState コンポーネントの状態の型です。
 */
export interface SuiClassNameFunction<TState = Record<string, any>> {
  (sate: TState): string | undefined;
}

/**
 * コンポーネントの状態 (`TState`) に基づいてスタイルプロパティー (`React.CSSProperties`) を動的に決定する関数です。
 *
 * @template TState コンポーネントの状態の型です。
 */
export interface SuiStyleFunction<TState = Record<string, any>> {
  (state: TState): React.CSSProperties | undefined;
}

/**
 * `render` 関数に渡される基本的なプロパティーの型です。
 *
 * 基本的な HTML 属性と `ref` プロパティーを含みます。
 *
 * @template T `ref` プロパティーの要素の型です。デフォルトは `any` です。
 */
export type RenderFunctionProps<T = any> = React.HTMLAttributes<T> & {
  ref?: React.Ref<T> | undefined;
};

/**
 * コンポーネントの状態 (`TState`) とプロパティー (`TProps`) に基づいて、レンダリングする React 要素を決定する関数です。
 *
 * @template TProps 要素に渡されるプロパティーの型です。
 * @template TState コンポーネントの状態の型です。
 */
export interface SuiComponentRenderFunction<
  TProps = RenderFunctionProps,
  TState = Record<string, any>,
> {
  (props: TProps, state: TState): React.ReactElement;
}

/**
 * 大文字のアルファベット一文字のユニオン型です。
 */
// dprint-ignore
export type UpperAlphabet =
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
  | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"

/**
 * Base UI のイベントハンドラーと見なされるプロパティーキーの値を、Suru UI のイベントハンドラー型に変換するユーティリティー型です。
 *
 * `on` + {@link UpperAlphabet} から始まるプロパティーの値を `SuiEventHandler` 型に変換し、それ以外のプロパティーの値をそのまま保持します。
 *
 * @template TKey プロパティーキーの型です。
 * @template TValue プロパティーの値の型です。
 */
// dprint-ignore
export type $ToSuiHtmlProp<TKey extends PropertyKey, TValue> =
  // Base UI は "on[A-Z]" から始まるプロパティーキーにをイベントハンドラーと見なします。
  // 参照: https://github.com/mui/base-ui/blob/v1.0.0/packages/react/src/merge-props/mergeProps.ts#L142-L154
    TKey extends `on${UpperAlphabet}${string}`
  ? TValue extends {
      (event: infer TEvent extends BaseUIEvent<ReactEvent>, ...args: infer TRestArgs): any
    }
    // Base UI のイベントハンドラーの型を、SuiEvent を受け取る SuiEventHandler 型に変換します。
    ? SuiEventHandler<TEvent, TRestArgs>
    : TValue
  // 上記のいずれにも当てはまらないプロパティーキーは、元の型をそのまま受け流します。
  : TValue;

/**
 * プロパティーを走査し、各プロパティーに対して `$ToSuiHtmlProp` による型変換を適用するユーティリティー型です。
 *
 * @template TProps 変換対象となるプロパティーの集合です。
 */
export type $ToSuiHtmlProps<TProps> = {
  [P in keyof TProps]: $ToSuiHtmlProp<P, TProps[P]>;
};

/**
 * Suru UI コンポーネントが受け入れる、基となる HTML 要素のプロパティーの型です。
 *
 * Base UI との互換性のために、特定のプロパティーは意図的に除外されています。
 *
 * @template TElement ターゲットとなる HTML 要素のキーです（例: `"button"`, `"div"` など）。
 */
export type SuiHtmlProps<TElement extends keyof React.JSX.IntrinsicElements> = Omit<
  $ToSuiHtmlProps<React.ComponentPropsWithRef<TElement>>,
  // Base UI との互換性のため、特定のプロパティーを意図的に除外します。
  // 参照: https://github.com/mui/base-ui/blob/v1.0.0/packages/react/src/utils/types.ts#L56
  | "className"
  | "color"
  | "defaultChecked"
  | "defaultValue"
  // 本来は "style" も入れるべきだと思いますが、Base UI は入れていないので、それを踏襲します。おそらく Base UI のバグです。
  // | "style"
  | never
>;

/**
 * Suru UI コンポーネントで共通して使用されるプロパティー（`className`, `render`, `style`）の型です。
 *
 * `className` と `style` は、コンポーネントの状態に基づいた動的な関数を受け入れることができます。
 *
 * @template TState コンポーネントの状態の型です。
 * @template TRenderFunctionProps `render` 関数に渡されるプロパティーの型です。デフォルトは `RenderFunctionProps` です。
 */
export type SuiCommonProps<
  TState = Record<string, any>,
  TRenderFunctionProps = RenderFunctionProps,
> = {
  /**
   * コンポーネントに適用するクラス名です。
   *
   * 文字列、またはコンポーネントの状態に基づいてクラス名を返す関数を指定できます。
   */
  className?: string | SuiClassNameFunction<TState> | undefined;

  /**
   * カスタムレンダリングロジックを定義するためのプロパティーです。
   *
   * 関数、または直接 React 要素を渡すことができます。
   */
  render?:
    | React.ReactElement<Record<string, unknown>>
    | SuiComponentRenderFunction<TRenderFunctionProps, TState>
    | undefined;

  /**
   * コンポーネントに適用するインラインスタイルです。
   *
   * `React.CSSProperties` オブジェクト、またはコンポーネントの状態に基づいてスタイルを返す関数を指定できます。
   */
  style?: React.CSSProperties | SuiStyleFunction<TState> | undefined;
};

/**
 * Suru UI コンポーネントのプロパティーの型を定義します。
 *
 * ターゲットとなる要素 (`TElement`) のプロパティーに基づき、特別なプロパティーに対して型変換を適用します。
 *
 * @template TElement ターゲットとなる HTML 要素またはコンポーネントの型です（例: `'button'`, `'div'` など）。
 * @template TState コンポーネントの状態の型です。
 * @template TRenderFunctionProps `render` 関数に渡されるプロパティーの型です。デフォルトは基本的な HTML 属性と `ref` です。
 */
export type SuiComponentProps<
  TElement extends keyof React.JSX.IntrinsicElements,
  TState = {},
  TRenderFunctionProps = RenderFunctionProps,
> =
  & SuiHtmlProps<TElement>
  & SuiCommonProps<TState, TRenderFunctionProps>;

/**************************************************************************************************/

/**
 * 座標とサイズによって定義される矩形の型定義です。
 */
export type Rect = {
  /** 矩形の左端の X 座標です。 */
  x: number;
  /** 矩形の上端の Y 座標です。 */
  y: number;
  /** 矩形の横幅です。 */
  width: number;
  /** 矩形の高さです。 */
  height: number;
};

/**
 * 矩形の形状を表すオブジェクトの型です。
 *
 * 座標とサイズに加えて、上下左右の端の値を保持します。
 */
export type ClientRectObject = {
  /** 矩形の左端の X 座標です。 */
  x: number;
  /** 矩形の上端の Y 座標です。 */
  y: number;
  /** 矩形の横幅です。 */
  width: number;
  /** 矩形の高さです。 */
  height: number;
  /** 矩形の上端の座標です。 */
  top: number;
  /** 矩形の右端の座標です。 */
  right: number;
  /** 矩形の下端の座標です。 */
  bottom: number;
  /** 矩形の左端の座標です。 */
  left: number;
};

/**
 * カスタムの配置参照要素のインターフェースです。
 *
 * 実際の DOM 要素ではない仮想的な位置をアンカーとして使用する場合に利用します。
 *
 * @see https://floating-ui.com/docs/virtual-elements
 */
export interface VirtualElement {
  /**
   * 仮想要素に関連付けられるコンテキスト要素です。
   */
  contextElement?: Element;

  /**
   * 仮想要素の矩形情報を取得するためのメソッドです。
   *
   * @returns 矩形の詳細情報を返します。
   */
  getBoundingClientRect(): ClientRectObject;

  /**
   * 仮想要素を構成する複数の矩形情報を取得するためのメソッドです。
   *
   * @returns 矩形オブジェクトの配列、または DOMRectList を返します。
   */
  getClientRects?(): Array<ClientRectObject> | DOMRectList;
}

/**
 * 要素の周囲に設定するパディングの型定義です。
 *
 * 上下左右すべてに対する数値を直接指定するか、上下左右を個別に指定するオブジェクトを使用します。
 */
export declare type Padding = number | {
  /** 上側のパディング量です。 */
  top?: number | undefined;
  /** 右側のパディング量です。 */
  right?: number | undefined;
  /** 下側のパディング量です。 */
  bottom?: number | undefined;
  /** 左側のパディング量です。 */
  left?: number | undefined;
};
