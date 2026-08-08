import { Slider } from "@base-ui/react/slider";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./slider.css";

// Root
// ----

/**
 * {@link SliderRoot} の状態です。
 */
export type SliderRootState = Slider.Root.State;

/**
 * {@link SliderRoot} に渡すプロパティーです。
 */
export type SliderRootProps = React.ComponentProps<typeof Slider.Root> & {
  /**
   * スライダーのサイズを指定します。値を変更すると、ルートのクラスも更新されます。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * スライダーの色を指定します。値を変更すると、ルートのクラスも更新されます。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * スライダーのスタイルバリエーションを指定します。値を変更すると、ルートのクラスも更新されます。
   *
   * - `"naked"`: 背景のないトラックのみ、枠線なし
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。値を変更すると、ルートのクラスも更新されます。
   */
  outlined?: boolean | undefined;

  /**
   * スライダーの角丸を指定します。値を変更すると、ルートのクラスも更新されます。
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

/**
 * {@link SliderRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link SliderRoot} の状態型です。
   */
  export type State = SliderRootState;

  /**
   * {@link SliderRoot} のプロパティー型です。
   */
  export type Props = SliderRootProps;
}

/**
 * {@link SliderRoot} の別名です。
 */
export const Root: Component<Root.Props> = SliderRoot;

// Label
// -----

/**
 * {@link SliderLabel} の状態です。
 */
export type SliderLabelState = Slider.Label.State;

/**
 * {@link SliderLabel} に渡すプロパティーです。
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

/**
 * {@link SliderLabel} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link SliderLabel} の状態型です。
   */
  export type State = SliderLabelState;

  /**
   * {@link SliderLabel} のプロパティー型です。
   */
  export type Props = SliderLabelProps;
}

/**
 * {@link SliderLabel} の別名です。
 */
export const Label: Component<Label.Props> = SliderLabel;

// Value
// -----

/**
 * {@link SliderValue} の状態です。
 */
export type SliderValueState = Slider.Value.State;

/**
 * {@link SliderValue} に渡すプロパティーです。
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

/**
 * {@link SliderValue} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link SliderValue} の状態型です。
   */
  export type State = SliderValueState;

  /**
   * {@link SliderValue} のプロパティー型です。
   */
  export type Props = SliderValueProps;
}

/**
 * {@link SliderValue} の別名です。
 */
export const Value: Component<Value.Props> = SliderValue;

// Control
// -------

/**
 * {@link SliderControl} の状態です。
 */
export type SliderControlState = Slider.Control.State;

/**
 * {@link SliderControl} に渡すプロパティーです。
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

/**
 * {@link SliderControl} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Control {
  /**
   * {@link SliderControl} の状態型です。
   */
  export type State = SliderControlState;

  /**
   * {@link SliderControl} のプロパティー型です。
   */
  export type Props = SliderControlProps;
}

/**
 * {@link SliderControl} の別名です。
 */
export const Control: Component<Control.Props> = SliderControl;

// Track
// -----

/**
 * {@link SliderTrack} の状態です。
 */
export type SliderTrackState = Slider.Track.State;

/**
 * {@link SliderTrack} に渡すプロパティーです。
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

/**
 * {@link SliderTrack} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Track {
  /**
   * {@link SliderTrack} の状態型です。
   */
  export type State = SliderTrackState;

  /**
   * {@link SliderTrack} のプロパティー型です。
   */
  export type Props = SliderTrackProps;
}

/**
 * {@link SliderTrack} の別名です。
 */
export const Track: Component<Track.Props> = SliderTrack;

// Indicator
// ---------

/**
 * {@link SliderIndicator} の状態です。
 */
export type SliderIndicatorState = Slider.Indicator.State;

/**
 * {@link SliderIndicator} に渡すプロパティーです。
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

/**
 * {@link SliderIndicator} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link SliderIndicator} の状態型です。
   */
  export type State = SliderIndicatorState;

  /**
   * {@link SliderIndicator} のプロパティー型です。
   */
  export type Props = SliderIndicatorProps;
}

/**
 * {@link SliderIndicator} の別名です。
 */
export const Indicator: Component<Indicator.Props> = SliderIndicator;

// Thumb
// -----

/**
 * {@link SliderThumb} の状態です。
 */
export type SliderThumbState = Slider.Thumb.State;

/**
 * {@link SliderThumb} に渡すプロパティーです。
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

/**
 * {@link SliderThumb} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Thumb {
  /**
   * {@link SliderThumb} の状態型です。
   */
  export type State = SliderThumbState;

  /**
   * {@link SliderThumb} のプロパティー型です。
   */
  export type Props = SliderThumbProps;
}

/**
 * {@link SliderThumb} の別名です。
 */
export const Thumb: Component<Thumb.Props> = SliderThumb;
