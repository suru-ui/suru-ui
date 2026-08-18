import { Slider } from "@base-ui/react/slider";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./slider.css";

// Types
// -----

/**
 * スライダーの色です。
 */
export type SliderColor = Color;

/**
 * スライダーの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"rounded"`: 標準的な角丸
 * - `"full"`: 完全な丸形
 */
export type SliderRadius = "none" | "rounded" | "full";

/**
 * スライダーの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type SliderSize = Size;

/**
 * スライダーの主な外観の種類です。
 *
 * - `"naked"`: 背景のないトラックのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SliderVariant = "naked" | "liquid";

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
  size?: SliderSize | undefined;

  /**
   * スライダーの色を指定します。値を変更すると、ルートのクラスも更新されます。
   *
   * @default "grey"
   */
  color?: SliderColor | undefined;

  /**
   * スライダーのスタイルバリエーションを指定します。値を変更すると、ルートのクラスも更新されます。
   *
   * @default "liquid"
   */
  variant?: SliderVariant | undefined;

  /**
   * 枠線を表示するかどうかを指定します。値を変更すると、ルートのクラスも更新されます。
   */
  outlined?: boolean | undefined;

  /**
   * スライダーの角丸を指定します。値を変更すると、ルートのクラスも更新されます。
   *
   * @default "full"
   */
  radius?: SliderRadius | undefined;
};

/**
 * スライダーのルート要素です。
 */
export const SliderRoot: IComponent<SliderRootProps> = function SuiSliderRoot(props) {
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
 * {@link SliderRoot} の状態やプロパティーをまとめた型名前空間です。
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
export const Root: IComponent<Root.Props> = SliderRoot;

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
 */
export const SliderLabel: IComponent<SliderLabelProps> = function SuiSliderLabel(props) {
  const { className, ...otherProps } = props;

  return <Slider.Label {...otherProps} className={cn(className, "sui_slider_label")} />;
};

/**
 * {@link SliderLabel} の状態やプロパティーをまとめた型名前空間です。
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
export const Label: IComponent<Label.Props> = SliderLabel;

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
 */
export const SliderValue: IComponent<SliderValueProps> = function SuiSliderValue(props) {
  const { className, ...otherProps } = props;

  return <Slider.Value {...otherProps} className={cn(className, "sui_slider_value")} />;
};

/**
 * {@link SliderValue} の状態やプロパティーをまとめた型名前空間です。
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
export const Value: IComponent<Value.Props> = SliderValue;

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
 */
export const SliderControl: IComponent<SliderControlProps> = function SuiSliderControl(props) {
  const { className, ...otherProps } = props;

  return <Slider.Control {...otherProps} className={cn(className, "sui_slider_control")} />;
};

/**
 * {@link SliderControl} の状態やプロパティーをまとめた型名前空間です。
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
export const Control: IComponent<Control.Props> = SliderControl;

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
 */
export const SliderTrack: IComponent<SliderTrackProps> = function SuiSliderTrack(props) {
  const { className, ...otherProps } = props;

  return <Slider.Track {...otherProps} className={cn(className, "sui_slider_track")} />;
};

/**
 * {@link SliderTrack} の状態やプロパティーをまとめた型名前空間です。
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
export const Track: IComponent<Track.Props> = SliderTrack;

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
 */
export const SliderIndicator: IComponent<SliderIndicatorProps> = function SuiSliderIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Slider.Indicator {...otherProps} className={cn(className, "sui_slider_indicator")} />;
};

/**
 * {@link SliderIndicator} の状態やプロパティーをまとめた型名前空間です。
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
export const Indicator: IComponent<Indicator.Props> = SliderIndicator;

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
 */
export const SliderThumb: IComponent<SliderThumbProps> = function SuiSliderThumb(props) {
  const { className, ...otherProps } = props;

  return <Slider.Thumb {...otherProps} className={cn(className, "sui_slider_thumb")} />;
};

/**
 * {@link SliderThumb} の状態やプロパティーをまとめた型名前空間です。
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
export const Thumb: IComponent<Thumb.Props> = SliderThumb;
