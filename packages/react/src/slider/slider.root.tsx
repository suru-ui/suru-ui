import { Slider } from "@base-ui/react/slider";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SliderRoot} の値が変更されたイベントの詳細です。
 */
export type SliderRootChangeEventDetails = Slider.Root.ChangeEventDetails;

/**
 * {@link SliderRoot} の値が変更された理由です。
 */
export type SliderRootChangeEventReason = Slider.Root.ChangeEventReason;

/**
 * {@link SliderRoot} の値の変更が確定したイベントの詳細です。
 */
export type SliderRootCommitEventDetails = Slider.Root.CommitEventDetails;

/**
 * {@link SliderRoot} の値の変更が確定した理由です。
 */
export type SliderRootCommitEventReason = Slider.Root.CommitEventReason;

/**
 * スライダーの配色です。
 */
export type SliderRootColor = Color;

/**
 * スライダーの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type SliderRootRadius = "none" | Size | "full";

/**
 * スライダーの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SliderRootSize = Size;

/**
 * スライダーの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SliderRootVariant = "naked" | "liquid";

/**
 * {@link SliderRoot} が持つ状態です。
 */
export type SliderRootState = Slider.Root.State;

export namespace SliderRootProps {
  export type Render = RenderProps<SliderRootState>;

  export type SuruUI = {
    /**
     * 現在値を示す部分に適用する色を指定します。
     *
     * @default "grey"
     */
    color?: SliderRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * スライダーの角丸を指定します。
     *
     * @default "full"
     */
    radius?: SliderRootRadius | undefined;

    /**
     * スライダーの大きさを指定します。
     *
     * @default "md"
     */
    size?: SliderRootSize | undefined;

    /**
     * スライダーの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: SliderRootVariant | undefined;
  };

  export type BaseUI<TValue extends number | readonly number[] = number | readonly number[]> = Pick<
    React.ComponentProps<typeof Slider.Root<TValue>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SliderRootProps:
      | "defaultValue"
      | "disabled"
      | "format"
      | "locale"
      | "max"
      | "min"
      | "minStepsBetweenValues"
      | "name"
      | "form"
      | "orientation"
      | "step"
      | "largeStep"
      | "thumbAlignment"
      | "thumbCollisionBehavior"
      | "value"
      | "onValueChange"
      | "onValueCommitted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TValue extends number | readonly number[] = number | readonly number[]> = Omit<
    React.ComponentProps<typeof Slider.Root<TValue>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SliderRoot} に渡す props です。
 *
 * @template TValue 値の型です。
 */
export type SliderRootProps<
  TValue extends number | readonly number[] = number | readonly number[],
> = SliderRootProps.Render &
  SliderRootProps.SuruUI &
  SliderRootProps.BaseUI<TValue> &
  SliderRootProps.HTML<TValue>;

/**
 * {@link SliderRoot} のコンポーネント型です。
 */
interface ISliderRoot extends IComponent<SliderRootProps> {
  /**
   * @template TValue 値の型です。
   */
  <TValue extends number | readonly number[] = number | readonly number[]>(
    props: SliderRootProps<TValue>,
  ): IComponent.Return;
}

/**
 * スライダーのルートです。
 */
export const SliderRoot: ISliderRoot = function SuiSliderRoot(props: SliderRootProps) {
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
    <Slider.Root
      {...otherProps}
      className={cn(
        className,
        "sui_slider",
        `sui_slider-size_${size}`,
        `sui_slider-color_${color}`,
        `sui_slider-radius_${radius}`,
        `sui_slider-variant_${variant}`,
        outlined && "sui_slider-outlined",
        (state) => state.disabled && "sui_slider-disabled",
        (state) => state.dragging && "sui_slider-dragging",
        (state) => `sui_slider-orientation_${state.orientation}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { SliderRoot as Root };

export namespace Root {
  export type State = SliderRootState;

  export type Props<TValue extends number | readonly number[] = number | readonly number[]> =
    Props.Render & Props.SuruUI & Props.BaseUI<TValue> & Props.HTML<TValue>;

  export namespace Props {
    export type Render = SliderRootProps.Render;

    export type SuruUI = SliderRootProps.SuruUI;

    export type BaseUI<TValue extends number | readonly number[] = number | readonly number[]> =
      SliderRootProps.BaseUI<TValue>;

    export type HTML<TValue extends number | readonly number[] = number | readonly number[]> =
      SliderRootProps.HTML<TValue>;
  }

  export type ChangeEventDetails = SliderRootChangeEventDetails;

  export type ChangeEventReason = SliderRootChangeEventReason;

  export type Color = SliderRootColor;

  export type CommitEventDetails = SliderRootCommitEventDetails;

  export type CommitEventReason = SliderRootCommitEventReason;

  export type Radius = SliderRootRadius;

  export type Size = SliderRootSize;

  export type Variant = SliderRootVariant;
}
