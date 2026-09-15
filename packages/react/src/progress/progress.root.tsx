import { Progress } from "@base-ui/react/progress";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * 進捗の状態です。
 *
 * - `"indeterminate"`: 不確定状態
 * - `"progressing"`: 進行中
 * - `"complete"`: 完了
 */
export type ProgressRootStatus = Progress.Status;

/**
 * 進捗の配色です。
 */
export type ProgressRootColor = Color;

/**
 * 進捗の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ProgressRootRadius = "none" | Size | "full";

/**
 * 進捗の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ProgressRootSize = Size;

/**
 * 進捗の主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ProgressRootVariant = "naked" | "liquid";

/**
 * {@link ProgressRoot} が持つ状態です。
 */
export type ProgressRootState = Progress.Root.State;

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
     * @default false
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Progress.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ProgressRootProps:
      "aria-valuetext" | "format" | "getAriaValueText" | "locale" | "max" | "min" | "value",
      keyof Render | keyof SuruUI
    >
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

/**
 * 進捗のルートコンポーネントです。
 *
 * `value` に `null` を指定すると、不確定状態になります。
 */
export const ProgressRoot: IComponent<ProgressRootProps> = function SuiProgressRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = "full",
    variant = "liquid",
    outlined = false,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Progress.Root
      {...otherProps}
      className={cn(
        className,
        "sui_progress",
        `sui_progress-size_${size}`,
        `sui_progress-color_${color}`,
        `sui_progress-radius_${radius}`,
        `sui_progress-variant_${variant}`,
        outlined && "sui_progress-outlined",
        (state) => `sui_progress-status_${state.status}`,
      )}
      data-scope={dataScope}
    />
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
