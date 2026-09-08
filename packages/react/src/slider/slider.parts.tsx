import { Slider } from "@base-ui/react/slider";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./slider.css";

// Root
// ----

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

/**
 * {@link SliderRoot} に渡す props です。
 *
 * @template TValue 値の型です。
 */
export type SliderRootProps<
  TValue extends number | readonly number[] = number | readonly number[],
> = React.ComponentProps<typeof Slider.Root<TValue>> & {
  /**
   * スライダーの色を指定します。
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

/**
 * スライダーのルートコンポーネントです。
 */
interface ISliderRoot extends IComponent<SliderRootProps> {
  /**
   * @template TValue 値の型です。
   */
  <TValue extends number | readonly number[] = number | readonly number[]>(
    props: SliderRootProps<TValue>,
  ): IComponent.Return;
}

export const SliderRoot: ISliderRoot = function SuiSliderRoot(props: SliderRootProps) {
  const {
    size = "md",
    color = "grey",
    radius = "full",
    variant = "liquid",
    outlined = false,
    className,
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
      data-scope=""
    />
  );
};

/**
 * {@link SliderRoot}
 */
export { SliderRoot as Root };

/**
 * {@link SliderRoot} の状態や props をまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link SliderRootState}
   */
  export type State = SliderRootState;

  /**
   * {@link SliderRootProps}
   */
  export type Props<TValue extends number | readonly number[] = number | readonly number[]> =
    SliderRootProps<TValue>;

  /**
   * {@link SliderRootChangeEventDetails}
   */
  export type ChangeEventDetails = SliderRootChangeEventDetails;

  /**
   * {@link SliderRootChangeEventReason}
   */
  export type ChangeEventReason = SliderRootChangeEventReason;

  /**
   * {@link SliderRootColor}
   */
  export type Color = SliderRootColor;

  /**
   * {@link SliderRootCommitEventDetails}
   */
  export type CommitEventDetails = SliderRootCommitEventDetails;

  /**
   * {@link SliderRootCommitEventReason}
   */
  export type CommitEventReason = SliderRootCommitEventReason;

  /**
   * {@link SliderRootRadius}
   */
  export type Radius = SliderRootRadius;

  /**
   * {@link SliderRootSize}
   */
  export type Size = SliderRootSize;

  /**
   * {@link SliderRootVariant}
   */
  export type Variant = SliderRootVariant;
}

// Label
// -----

/**
 * {@link SliderLabel} が持つ状態です。
 */
export type SliderLabelState = Slider.Label.State;

/**
 * {@link SliderLabel} に渡す props です。
 */
export type SliderLabelProps = React.ComponentProps<typeof Slider.Label>;

/**
 * スライダーのラベルコンポーネントです。
 */
export const SliderLabel: IComponent<SliderLabelProps> = function SuiSliderLabel(props) {
  const { className, ...otherProps } = props;

  return <Slider.Label {...otherProps} className={cn(className, "sui_slider_label")} />;
};

/**
 * {@link SliderLabel}
 */
export { SliderLabel as Label };

/**
 * {@link SliderLabel} の状態や props をまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link SliderLabelState}
   */
  export type State = SliderLabelState;

  /**
   * {@link SliderLabelProps}
   */
  export type Props = SliderLabelProps;
}

// Value
// -----

/**
 * {@link SliderValue} が持つ状態です。
 */
export type SliderValueState = Slider.Value.State;

/**
 * {@link SliderValue} に渡す props です。
 */
export type SliderValueProps = React.ComponentProps<typeof Slider.Value>;

/**
 * スライダーの現在値を表示するコンポーネントです。
 */
export const SliderValue: IComponent<SliderValueProps> = function SuiSliderValue(props) {
  const { className, ...otherProps } = props;

  return <Slider.Value {...otherProps} className={cn(className, "sui_slider_value")} />;
};

/**
 * {@link SliderValue}
 */
export { SliderValue as Value };

/**
 * {@link SliderValue} の状態や props をまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link SliderValueState}
   */
  export type State = SliderValueState;

  /**
   * {@link SliderValueProps}
   */
  export type Props = SliderValueProps;
}

// Control
// -------

/**
 * {@link SliderControl} が持つ状態です。
 */
export type SliderControlState = Slider.Control.State;

/**
 * {@link SliderControl} に渡す props です。
 */
export type SliderControlProps = React.ComponentProps<typeof Slider.Control>;

/**
 * スライダーの操作領域コンポーネントです。
 */
export const SliderControl: IComponent<SliderControlProps> = function SuiSliderControl(props) {
  const { className, ...otherProps } = props;

  return <Slider.Control {...otherProps} className={cn(className, "sui_slider_control")} />;
};

/**
 * {@link SliderControl}
 */
export { SliderControl as Control };

/**
 * {@link SliderControl} の状態や props をまとめた型名前空間です。
 */
export namespace Control {
  /**
   * {@link SliderControlState}
   */
  export type State = SliderControlState;

  /**
   * {@link SliderControlProps}
   */
  export type Props = SliderControlProps;
}

// Track
// -----

/**
 * {@link SliderTrack} が持つ状態です。
 */
export type SliderTrackState = Slider.Track.State;

/**
 * {@link SliderTrack} に渡す props です。
 */
export type SliderTrackProps = React.ComponentProps<typeof Slider.Track>;

/**
 * スライダーの全範囲を表すトラックコンポーネントです。
 */
export const SliderTrack: IComponent<SliderTrackProps> = function SuiSliderTrack(props) {
  const { className, ...otherProps } = props;

  return <Slider.Track {...otherProps} className={cn(className, "sui_slider_track")} />;
};

/**
 * {@link SliderTrack}
 */
export { SliderTrack as Track };

/**
 * {@link SliderTrack} の状態や props をまとめた型名前空間です。
 */
export namespace Track {
  /**
   * {@link SliderTrackState}
   */
  export type State = SliderTrackState;

  /**
   * {@link SliderTrackProps}
   */
  export type Props = SliderTrackProps;
}

// Indicator
// ---------

/**
 * {@link SliderIndicator} が持つ状態です。
 */
export type SliderIndicatorState = Slider.Indicator.State;

/**
 * {@link SliderIndicator} に渡す props です。
 */
export type SliderIndicatorProps = React.ComponentProps<typeof Slider.Indicator>;

/**
 * スライダーの現在値を示すインジケーターコンポーネントです。
 */
export const SliderIndicator: IComponent<SliderIndicatorProps> = function SuiSliderIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Slider.Indicator {...otherProps} className={cn(className, "sui_slider_indicator")} />;
};

/**
 * {@link SliderIndicator}
 */
export { SliderIndicator as Indicator };

/**
 * {@link SliderIndicator} の状態や props をまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link SliderIndicatorState}
   */
  export type State = SliderIndicatorState;

  /**
   * {@link SliderIndicatorProps}
   */
  export type Props = SliderIndicatorProps;
}

// Thumb
// -----

/**
 * {@link SliderThumb} が持つ状態です。
 */
export type SliderThumbState = Slider.Thumb.State;

/**
 * {@link SliderThumb} に渡す props です。
 */
export type SliderThumbProps = React.ComponentProps<typeof Slider.Thumb>;

/**
 * スライダーのつまみコンポーネントです。
 *
 * 矢印キーで操作でき、フォーカス時はフォーカスリングが表示されます。
 */
export const SliderThumb: IComponent<SliderThumbProps> = function SuiSliderThumb(props) {
  const { className, ...otherProps } = props;

  return (
    <Slider.Thumb
      {...otherProps}
      className={cn(
        className,
        "sui_slider_thumb",
        (state) => state.dragging && "sui_slider_thumb-dragging",
      )}
    />
  );
};

/**
 * {@link SliderThumb}
 */
export { SliderThumb as Thumb };

/**
 * {@link SliderThumb} の状態や props をまとめた型名前空間です。
 */
export namespace Thumb {
  /**
   * {@link SliderThumbState}
   */
  export type State = SliderThumbState;

  /**
   * {@link SliderThumbProps}
   */
  export type Props = SliderThumbProps;
}
