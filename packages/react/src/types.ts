import type { ComponentRenderFn } from "@base-ui/react/types";
import type * as React from "react";

/**
 * Suru UI のコンポーネント型です。
 *
 * @template TProps コンポーネントのプロパティー型です。
 * @template TRednerNode コンポーネントが返す React ノードの型です。
 */
export interface Component<
  TProps = {},
  TRednerNode extends ReturnType<React.FC<TProps>> = React.ReactElement | null,
> {
  (props: TProps): TRednerNode;

  displayName?: string | undefined;
}

export namespace RenderProps {
  /**
   * 静的なクラス名のプリミティブ型です。
   */
  export type PrimitiveClassName = string;

  /**
   * コンポーネントの状態に応じてクラス名を返す関数です。
   *
   * @template TState コンポーネントの状態の型です。
   */
  export interface ClassNameFunction<TState = any> {
    (state: TState): PrimitiveClassName;
  }

  /**
   * 静的なクラス名または状態に応じた動的なクラス名を表します。
   *
   * @template TState コンポーネントの状態の型です。
   */
  export type ClassName<TState = any> = PrimitiveClassName | ClassNameFunction<TState>;

  /**
   * Base UI の ComponentRenderFn を拡張したレンダー関数型です。
   *
   * @template TProps レンダー関数に渡されるプロパティーの型です。
   * @template TState コンポーネントの状態の型です。
   */
  export interface RenderFunction<TProps = any, TState = any> extends ComponentRenderFn<
    TProps,
    TState
  > {}

  /**
   * 静的な React 要素、または状態に応じて要素を返すレンダー関数を表します。
   *
   * @template TProps レンダー関数に渡されるプロパティーの型です。
   * @template TState コンポーネントの状態の型です。
   */
  export type Render<TProps = any, TState = any> =
    | React.ReactElement
    | RenderFunction<TProps, TState>;

  /**
   * コンポーネントの状態に応じてスタイルを返す関数です。
   *
   * @template TState コンポーネントの状態の型です。
   */
  export interface StyleFunction<TState = any> {
    (state: TState): React.CSSProperties | undefined;
  }

  /**
   * 静的なスタイルまたは状態に応じた動的なスタイルを表します。
   *
   * @template TState コンポーネントの状態の型です。
   */
  export type Style<TState = any> = React.CSSProperties | StyleFunction<TState>;
}

/**
 * Base UI の Render Props パターンに対応するためのプロパティー型です。
 *
 * コンポーネントの状態に応じて `render`、`className`、`style` を動的に切り替えられます。
 *
 * @template TElement レンダリングする HTML 要素の型です。
 * @template TState コンポーネントの状態の型です。
 */
export type RenderProps<TElement extends keyof React.JSX.IntrinsicElements = any, TState = any> = {
  /**
   * 要素をカスタマイズするためのレンダー関数または React 要素です。
   */
  render?: RenderProps.Render<React.ComponentProps<TElement>, TState> | undefined;

  /**
   * クラス名または状態に応じてクラス名を返す関数です。
   */
  className?: RenderProps.ClassName<TState> | undefined;

  /**
   * スタイルまたは状態に応じてスタイルを返す関数です。
   */
  style?: RenderProps.Style<TState> | undefined;
};
