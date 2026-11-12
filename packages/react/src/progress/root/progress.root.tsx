import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type ProgressContextSize,
  type ProgressContextColor,
  type ProgressContextRadius,
  type ProgressContextVariant,
  ProgressContext,
} from "./progress.root.context.js";

/**
 * 進捗の状態です。
 *
 * - `"indeterminate"`: 不確定状態
 * - `"progressing"`: 進行中
 * - `"complete"`: 完了
 */
export type ProgressRootStatus = Progress.Status;

/** 進捗の配色です。 */
export type ProgressRootColor = ProgressContextColor;

/**
 * 進捗の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ProgressRootRadius = ProgressContextRadius;

/**
 * 進捗の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ProgressRootSize = ProgressContextSize;

/**
 * 進捗の主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ProgressRootVariant = ProgressContextVariant;

/**
 * {@link ProgressRoot} が持つ状態です。
 */
export type ProgressRootState = Override<ProgressContext, Progress.Root.State>;

export namespace ProgressRootProps {
  export type Render = RenderProps<ProgressRootState>;

  export type SuruUI = {
    /**
     * 進捗の色を指定します。
     *
     * @default "grey"
     */
    color?: ProgressRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default true
     */
    outlined?: boolean | undefined;

    /**
     * 進捗の角丸を指定します。
     *
     * @default "full"
     */
    radius?: ProgressRootRadius | undefined;

    /**
     * 進捗のサイズを指定します。
     *
     * @default "md"
     */
    size?: ProgressRootSize | undefined;

    /**
     * 進捗の主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: ProgressRootVariant | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Progress.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ProgressRootProps より :
      "aria-valuetext" | "format" | "getAriaValueText" | "locale" | "max" | "min" | "value"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Progress.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ProgressRoot} に渡す props です。
 */
export type ProgressRootProps = ProgressRootProps.Render &
  ProgressRootProps.SuruUI &
  ProgressRootProps.BaseUI &
  ProgressRootProps.HTML;

export type IProgressRoot = IComponent<ProgressRootProps>;

/**
 * 進捗のルートコンポーネントです。
 *
 * `value` に `null` を指定すると、不確定状態になります。
 */
export const ProgressRoot: IProgressRoot = (props) => {
  const {
    size = "md",
    color = "grey",
    style,
    radius = "full",
    render,
    variant = "liquid",
    outlined = true,
    className,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<ProgressContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      outlined,
    }),
    [size, color, radius, variant, outlined],
  );

  return (
    <ProgressContext value={ctx}>
      <Progress.Root
        {...otherProps}
        {...proxyRenderProps<Progress.Root.State, ProgressRootState>(
          (state) => ({
            ...ctx,
            ...state,
          }),
          {
            style,
            render,
            className: cn<ProgressRootState>(
              className,
              "sui_progress",
              (state) => `sui_progress-size_${state.size}`,
              (state) => `sui_progress-color_${state.color}`,
              (state) => `sui_progress-radius_${state.radius}`,
              (state) => `sui_progress-variant_${state.variant}`,
              (state) => state.outlined && "sui_progress-outlined",
              (state) => `sui_progress-status_${state.status}`,
            ),
          },
        )}
        data-scope={dataScope}
      />
    </ProgressContext>
  );
};

export { ProgressRoot as Root };
export namespace Root {
  export type State = ProgressRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ProgressRootProps.Render;

    export type SuruUI = ProgressRootProps.SuruUI;

    export type BaseUI = ProgressRootProps.BaseUI;

    export type HTML = ProgressRootProps.HTML;
  }

  export type Color = ProgressRootColor;

  export type Radius = ProgressRootRadius;

  export type Size = ProgressRootSize;

  export type Status = ProgressRootStatus;

  export type Variant = ProgressRootVariant;
}
