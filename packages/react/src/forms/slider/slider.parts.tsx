import { Slider } from "@base-ui/react/slider";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./slider.css";

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type SliderRootState = Slider.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type SliderRootProps = React.ComponentProps<typeof Slider.Root> & {
  /**
   * スライダーのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * スライダーの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * スライダーのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないトラックのみ、枠線なし
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * スライダーの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "full"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * スライダーのルート要素です。
 *
 * @example
 * ```tsx
 * <SliderParts.Root defaultValue={25} color="blue">
 *   <SliderParts.Control>
 *     <SliderParts.Track>
 *       <SliderParts.Indicator />
 *       <SliderParts.Thumb />
 *     </SliderParts.Track>
 *   </SliderParts.Control>
 * </SliderParts.Root>
 * ```
 */
export const SliderRoot: Component<SliderRootProps> = function SuiSliderRoot(props) {
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "full",
    variant: variantProp = "liquid",
    disabled = false,
    outlined = false,
    className,
    ...otherProps
  } = props;

  return (
    <Slider.Root
      {...otherProps}
      disabled={disabled}
      className={cn(
        className,
        "sui_slider",
        `sui_slider-size_${sizeProp}`,
        `sui_slider-color_${colorProp}`,
        `sui_slider-radius_${radiusProp}`,
        `sui_slider-variant_${variantProp}`,
        outlined && "sui_slider-outlined",
        disabled && "sui_slider-disabled",
      )}
    />
  );
};

export namespace Root {
  export type State = SliderRootState;
  export type Props = SliderRootProps;
}

export const Root: Component<Root.Props> = SliderRoot;

// Label
// -----

/**
 * {@link Label} の状態です。
 */
export type SliderLabelState = Slider.Label.State;

/**
 * {@link Label} に渡すプロパティーです。
 */
export type SliderLabelProps = React.ComponentProps<typeof Slider.Label>;

/**
 * スライダーのラベル要素です。
 *
 * @example
 * ```tsx
 * <SliderParts.Root>
 *   <SliderParts.Label>音量</SliderParts.Label>
 *   <SliderParts.Control>
 *     <SliderParts.Track>
 *       <SliderParts.Indicator />
 *       <SliderParts.Thumb />
 *     </SliderParts.Track>
 *   </SliderParts.Control>
 * </SliderParts.Root>
 * ```
 */
export const SliderLabel: Component<SliderLabelProps> = function SuiSliderLabel(props) {
  const { className, ...otherProps } = props;

  return <Slider.Label {...otherProps} className={cn(className, "sui_slider_label")} />;
};

export namespace Label {
  export type State = SliderLabelState;
  export type Props = SliderLabelProps;
}

export const Label: Component<Label.Props> = SliderLabel;

// Value
// -----

/**
 * {@link Value} の状態です。
 */
export type SliderValueState = Slider.Value.State;

/**
 * {@link Value} に渡すプロパティーです。
 */
export type SliderValueProps = React.ComponentProps<typeof Slider.Value>;

/**
 * スライダーの現在値を表示する要素です。
 *
 * @example
 * ```tsx
 * <SliderParts.Root>
 *   <SliderParts.Value />
 *   <SliderParts.Control>
 *     <SliderParts.Track>
 *       <SliderParts.Indicator />
 *       <SliderParts.Thumb />
 *     </SliderParts.Track>
 *   </SliderParts.Control>
 * </SliderParts.Root>
 * ```
 */
export const SliderValue: Component<SliderValueProps> = function SuiSliderValue(props) {
  const { className, ...otherProps } = props;

  return <Slider.Value {...otherProps} className={cn(className, "sui_slider_value")} />;
};

export namespace Value {
  export type State = SliderValueState;
  export type Props = SliderValueProps;
}

export const Value: Component<Value.Props> = SliderValue;

// Control
// -------

/**
 * {@link Control} の状態です。
 */
export type SliderControlState = Slider.Control.State;

/**
 * {@link Control} に渡すプロパティーです。
 */
export type SliderControlProps = React.ComponentProps<typeof Slider.Control>;

/**
 * スライダーの操作可能な領域です。
 *
 * @example
 * ```tsx
 * <SliderParts.Root>
 *   <SliderParts.Control>
 *     <SliderParts.Track>
 *       <SliderParts.Indicator />
 *       <SliderParts.Thumb />
 *     </SliderParts.Track>
 *   </SliderParts.Control>
 * </SliderParts.Root>
 * ```
 */
export const SliderControl: Component<SliderControlProps> = function SuiSliderControl(props) {
  const { className, ...otherProps } = props;

  return <Slider.Control {...otherProps} className={cn(className, "sui_slider_control")} />;
};

export namespace Control {
  export type State = SliderControlState;
  export type Props = SliderControlProps;
}

export const Control: Component<Control.Props> = SliderControl;

// Track
// -----

/**
 * {@link Track} の状態です。
 */
export type SliderTrackState = Slider.Track.State;

/**
 * {@link Track} に渡すプロパティーです。
 */
export type SliderTrackProps = React.ComponentProps<typeof Slider.Track>;

/**
 * スライダーのトラック要素です。
 *
 * @example
 * ```tsx
 * <SliderParts.Root>
 *   <SliderParts.Control>
 *     <SliderParts.Track>
 *       <SliderParts.Indicator />
 *       <SliderParts.Thumb />
 *     </SliderParts.Track>
 *   </SliderParts.Control>
 * </SliderParts.Root>
 * ```
 */
export const SliderTrack: Component<SliderTrackProps> = function SuiSliderTrack(props) {
  const { className, ...otherProps } = props;

  return <Slider.Track {...otherProps} className={cn(className, "sui_slider_track")} />;
};

export namespace Track {
  export type State = SliderTrackState;
  export type Props = SliderTrackProps;
}

export const Track: Component<Track.Props> = SliderTrack;

// Indicator
// ---------

/**
 * {@link Indicator} の状態です。
 */
export type SliderIndicatorState = Slider.Indicator.State;

/**
 * {@link Indicator} に渡すプロパティーです。
 */
export type SliderIndicatorProps = React.ComponentProps<typeof Slider.Indicator>;

/**
 * スライダーの現在値を示すインジケーター要素です。
 *
 * @example
 * ```tsx
 * <SliderParts.Root>
 *   <SliderParts.Control>
 *     <SliderParts.Track>
 *       <SliderParts.Indicator />
 *       <SliderParts.Thumb />
 *     </SliderParts.Track>
 *   </SliderParts.Control>
 * </SliderParts.Root>
 * ```
 */
export const SliderIndicator: Component<SliderIndicatorProps> = function SuiSliderIndicator(props) {
  const { className, ...otherProps } = props;

  return <Slider.Indicator {...otherProps} className={cn(className, "sui_slider_indicator")} />;
};

export namespace Indicator {
  export type State = SliderIndicatorState;
  export type Props = SliderIndicatorProps;
}

export const Indicator: Component<Indicator.Props> = SliderIndicator;

// Thumb
// -----

/**
 * {@link Thumb} の状態です。
 */
export type SliderThumbState = Slider.Thumb.State;

/**
 * {@link Thumb} に渡すプロパティーです。
 */
export type SliderThumbProps = React.ComponentProps<typeof Slider.Thumb>;

/**
 * スライダーのつまみ要素です。
 *
 * @example
 * ```tsx
 * <SliderParts.Root>
 *   <SliderParts.Control>
 *     <SliderParts.Track>
 *       <SliderParts.Indicator />
 *       <SliderParts.Thumb aria-label="音量" />
 *     </SliderParts.Track>
 *   </SliderParts.Control>
 * </SliderParts.Root>
 * ```
 */
export const SliderThumb: Component<SliderThumbProps> = function SuiSliderThumb(props) {
  const { className, ...otherProps } = props;

  return <Slider.Thumb {...otherProps} className={cn(className, "sui_slider_thumb")} />;
};

export namespace Thumb {
  export type State = SliderThumbState;
  export type Props = SliderThumbProps;
}

export const Thumb: Component<Thumb.Props> = SliderThumb;
