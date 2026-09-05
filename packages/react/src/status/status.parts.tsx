import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./status.css";

// Context
// -------

/**
 * ステータスの配色です。
 */
type StatusContextColor = Color;

/**
 * ステータスのインジケーターが処理中のアニメーションを表示するかどうかです。
 */
type StatusContextProcessing = boolean;

/**
 * ステータスの大きさです。
 */
type StatusContextSize = Size;

/**
 * {@link StatusRoot} が子要素へ提供するスタイルです。
 */
export type StatusContext = {
  /**
   * ステータスの配色です。
   */
  readonly color: StatusContextColor;

  /**
   * インジケーターが処理中のアニメーションを表示するかどうかです。
   */
  readonly processing: StatusContextProcessing;

  /**
   * ステータスの大きさです。
   */
  readonly size: StatusContextSize;
};

/**
 * {@link StatusRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const StatusContext: React.Context<StatusContext | null> =
  React.createContext<StatusContext | null>(null);

function useSuiStatusContext(optional?: false): StatusContext;
function useSuiStatusContext(optional?: boolean): StatusContext | null;
function useSuiStatusContext(optional?: boolean): StatusContext | null {
  const context = React.use(StatusContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "StatusContext",
      providerName: "StatusRoot",
    });
  }

  return context;
}

/**
 * {@link StatusContext} を読み取るフックです。
 */
export const useStatusContext: IUseContext<StatusContext> = useSuiStatusContext;

/**
 * {@link StatusContext} です。
 */
export type Context = StatusContext;

/**
 * {@link StatusContext} です。
 */
export const Context: React.Context<Context | null> = StatusContext;

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link StatusContextColor} です。
   */
  export type Color = StatusContextColor;

  /**
   * {@link StatusContextProcessing} です。
   */
  export type Processing = StatusContextProcessing;

  /**
   * {@link StatusContextSize} です。
   */
  export type Size = StatusContextSize;
}

/**
 * {@link useStatusContext} です。
 */
export const useContext: IUseContext<Context> = useStatusContext;

// Root
// ----

/**
 * ステータスの配色です。
 */
export type StatusRootColor = Color;

/**
 * ステータスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatusRootSize = Size;

/**
 * {@link StatusRoot} の状態です。
 */
export type StatusRootState = {};

/**
 * {@link StatusRoot} に渡すプロパティーです。
 *
 * ルートに指定したスタイルプロパティーは、子要素の指定より優先されます。
 */
export type StatusRootProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<StatusRootState> & {
    /**
     * ステータスの色を指定します。
     *
     * 色はインジケーターのドットに適用されます。
     *
     * @default "grey"
     */
    color?: StatusRootColor | undefined;

    /**
     * インジケーターに処理中を示すアニメーションを表示します。
     *
     * @default false
     */
    processing?: boolean | undefined;

    /**
     * ステータスの大きさを指定します。
     *
     * @default "md"
     */
    size?: StatusRootSize | undefined;
  };

/**
 * 状態を示すドットとラベルを並べて表示するルート要素です。
 *
 * スタイルプロパティーをコンテキストで子パーツへ伝播します。
 */
export const StatusRoot: IComponent<StatusRootProps> = function SuiStatusRoot(props) {
  const { size = "md", color = "grey", processing = false, className, ...otherProps } = props;
  const context = React.useMemo<StatusContext>(
    () => ({ size, color, processing }),
    [size, color, processing],
  );
  const element = useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        className: cn(
          className,
          "sui_status",
          `sui_status-size_${size}`,
          `sui_status-color_${color}`,
          processing && "sui_status-processing",
        ),
      },
    ],
  });

  return <Context value={context}>{element}</Context>;
};

/**
 * {@link StatusRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link StatusRootState} です。
   */
  export type State = StatusRootState;

  /**
   * {@link StatusRootProps} です。
   */
  export type Props = StatusRootProps;

  /**
   * {@link StatusRootColor} です。
   */
  export type Color = StatusRootColor;

  /**
   * {@link StatusRootProcessing} です。
   */
  export type Processing = boolean;

  /**
   * {@link StatusRootSize} です。
   */
  export type Size = StatusRootSize;
}

/**
 * {@link StatusRoot} です。
 */
export const Root: IComponent<Root.Props> = StatusRoot;

// Indicator
// ---------

/**
 * インジケーターの配色です。
 */
export type StatusIndicatorColor = Color;

/**
 * インジケーターの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatusIndicatorSize = Size;

/**
 * {@link StatusIndicator} の状態です。
 */
export type StatusIndicatorState = {};

/**
 * {@link StatusIndicator} に渡すプロパティーです。
 *
 * 親 {@link StatusRoot} 内で使うときは、スタイルプロパティーを省略するとルートの値を使用します。
 */
export type StatusIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<StatusIndicatorState> & {
    /**
     * インジケーターの色を指定します。
     *
     * 親 {@link StatusRoot} 内では、ルートに指定した値が優先されます。
     */
    color?: StatusIndicatorColor | undefined;

    /**
     * 処理中を示すアニメーションを表示します。
     *
     * 親 {@link StatusRoot} 内では、ルートに指定した値が優先されます。
     */
    processing?: boolean | undefined;

    /**
     * インジケーターの大きさを指定します。
     *
     * 親 {@link StatusRoot} 内では、ルートに指定した値が優先されます。
     */
    size?: StatusIndicatorSize | undefined;
  };

/**
 * 状態を示すドットを表すインジケーターコンポーネントです。
 *
 * 装飾要素として描画するため、既定で `aria-hidden` 属性を付けます。
 */
export const StatusIndicator: IComponent<StatusIndicatorProps> = function SuiStatusIndicator(
  props,
) {
  const group = useSuiStatusContext(true);
  const {
    color: colorProp,
    processing: processingProp,
    size: sizeProp,
    className,
    ...otherProps
  } = props;
  const color = group?.color ?? colorProp ?? "grey";
  const processing = group?.processing ?? processingProp ?? false;
  const size = group?.size ?? sizeProp ?? "md";

  return useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        "aria-hidden": true,
        className: cn(
          className,
          "sui_status_indicator",
          `sui_status_indicator-size_${size}`,
          `sui_status_indicator-color_${color}`,
          processing && "sui_status_indicator-processing",
        ),
      },
    ],
  });
};

/**
 * {@link StatusIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link StatusIndicatorState} です。
   */
  export type State = StatusIndicatorState;

  /**
   * {@link StatusIndicatorProps} です。
   */
  export type Props = StatusIndicatorProps;

  /**
   * {@link StatusIndicatorColor} です。
   */
  export type Color = StatusIndicatorColor;

  /**
   * {@link StatusIndicatorProps} の `processing` プロパティーです。
   */
  export type Processing = boolean;

  /**
   * {@link StatusIndicatorSize} です。
   */
  export type Size = StatusIndicatorSize;
}

/**
 * {@link StatusIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = StatusIndicator;
