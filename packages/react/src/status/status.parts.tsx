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
  const ctx = React.use(StatusContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "StatusContext",
      providerName: "StatusRoot",
    });
  }

  return ctx;
}

/**
 * {@link StatusContext} を読み取るフックです。
 */
export const useStatusContext: IUseContext<StatusContext> = useSuiStatusContext;

export { StatusContext as Context, useStatusContext as useContext };

export namespace Context {
  /**
   * {@link StatusContextColor}
   */
  export type Color = StatusContextColor;

  /**
   * {@link StatusContextProcessing}
   */
  export type Processing = StatusContextProcessing;

  /**
   * {@link StatusContextSize}
   */
  export type Size = StatusContextSize;
}

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
 * {@link StatusRoot} が持つ状態です。
 */
export type StatusRootState = {};

/**
 * {@link StatusRoot} に渡す props です。
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
 * 状態を示すドットとラベルを並べて表示するルートコンポーネントです。
 */
export const StatusRoot: IComponent<StatusRootProps> = function SuiStatusRoot(props) {
  const {
    size = "md",
    color = "grey",
    processing = false,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherSpanProps
  } = props;
  const ctx = React.useMemo<StatusContext>(
    () => ({ size, color, processing }),
    [size, color, processing],
  );
  const element = useRender({
    props: [
      otherSpanProps,
      {
        className: cn<StatusRootState>(
          "sui_status",
          `sui_status-size_${size}`,
          `sui_status-color_${color}`,
          processing && "sui_status-processing",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "span",
  });

  return <StatusContext value={ctx}>{element}</StatusContext>;
};

export { StatusRoot as Root };

export namespace Root {
  /**
   * {@link StatusRootState}
   */
  export type State = StatusRootState;

  /**
   * {@link StatusRootProps}
   */
  export type Props = StatusRootProps;

  /**
   * {@link StatusRootColor}
   */
  export type Color = StatusRootColor;

  /**
   * {@link StatusRootSize}
   */
  export type Size = StatusRootSize;
}

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
 * {@link StatusIndicator} が持つ状態です。
 */
export type StatusIndicatorState = {};

/**
 * {@link StatusIndicator} に渡す props です。
 */
export type StatusIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<StatusIndicatorState> & {
    /**
     * インジケーターの色を指定します。
     *
     * 親 {@link StatusRoot} 内では {@link StatusRootProps.color|color} が優先されます。
     */
    color?: StatusIndicatorColor | undefined;

    /**
     * 処理中を示すアニメーションを表示します。
     *
     * 親 {@link StatusRoot} 内では {@link StatusRootProps.processing|processing} が優先されます。
     */
    processing?: boolean | undefined;

    /**
     * インジケーターの大きさを指定します。
     *
     * 親 {@link StatusRoot} 内では {@link StatusRootProps.size|size} が優先されます。
     */
    size?: StatusIndicatorSize | undefined;
  };

/**
 * 状態を示すドットを表示するインジケーターコンポーネントです。
 */
export const StatusIndicator: IComponent<StatusIndicatorProps> = function SuiStatusIndicator(
  props,
) {
  const ctx = useSuiStatusContext(true);
  const { size: sizeProp, color: colorProp, processing: processingProp, ...otherSpanProps } = props;
  const size = ctx?.size ?? sizeProp ?? "md";
  const color = ctx?.color ?? colorProp ?? "grey";
  const processing = ctx?.processing ?? processingProp ?? false;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn<StatusIndicatorState>(
          "sui_status_indicator",
          `sui_status_indicator-size_${size}`,
          `sui_status_indicator-color_${color}`,
          processing && "sui_status_indicator-processing",
        ),
        "aria-hidden": true,
      },
    ],
    defaultTagName: "span",
  });
};

export { StatusIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link StatusIndicatorState}
   */
  export type State = StatusIndicatorState;

  /**
   * {@link StatusIndicatorProps}
   */
  export type Props = StatusIndicatorProps;

  /**
   * {@link StatusIndicatorColor}
   */
  export type Color = StatusIndicatorColor;

  /**
   * {@link StatusIndicatorSize}
   */
  export type Size = StatusIndicatorSize;
}
