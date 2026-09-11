import { Slider } from "@base-ui/react/slider";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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

export namespace SliderRootProps {
  export type BaseUI<TValue extends number | readonly number[] = number | readonly number[]> = Omit<
    React.ComponentProps<typeof Slider.Root<TValue>>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<SliderRootState>;

  export type SuruUI = {
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
  SliderRootProps.HTML;

interface ISliderRoot extends IComponent<SliderRootProps> {
  /**
   * @template TValue 値の型です。
   */
  <TValue extends number | readonly number[] = number | readonly number[]>(
    props: SliderRootProps<TValue>,
  ): IComponent.Return;
}

/**
 * スライダーのルートコンポーネントです。
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

/**
 * {@link SliderRoot} の状態や props をまとめた型名前空間です。
 */
export namespace Root {
  export type State = SliderRootState;

  export type Props<TValue extends number | readonly number[] = number | readonly number[]> =
    Props.Render & Props.SuruUI & Props.BaseUI<TValue> & Props.HTML;

  export namespace Props {
    export type BaseUI<TValue extends number | readonly number[] = number | readonly number[]> =
      SliderRootProps.BaseUI<TValue>;

    export type HTML = SliderRootProps.HTML;

    export type Render = SliderRootProps.Render;

    export type SuruUI = SliderRootProps.SuruUI;
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

// Label
// -----

/**
 * {@link SliderLabel} が持つ状態です。
 */
export type SliderLabelState = Slider.Label.State;

export namespace SliderLabelProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Slider.Label>, keyof Render>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SliderLabelState>;

  export type SuruUI = {};
}

/**
 * {@link SliderLabel} に渡す props です。
 */
export type SliderLabelProps = SliderLabelProps.Render &
  SliderLabelProps.SuruUI &
  SliderLabelProps.BaseUI &
  SliderLabelProps.HTML;

/**
 * スライダーのラベルコンポーネントです。
 */
export const SliderLabel: IComponent<SliderLabelProps> = function SuiSliderLabel(props) {
  const { className, ...otherProps } = props;

  return <Slider.Label {...otherProps} className={cn(className, "sui_slider_label")} />;
};

export { SliderLabel as Label };

/**
 * {@link SliderLabel} の状態や props をまとめた型名前空間です。
 */
export namespace Label {
  export type State = SliderLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = SliderLabelProps.BaseUI;

    export type HTML = SliderLabelProps.HTML;

    export type Render = SliderLabelProps.Render;

    export type SuruUI = SliderLabelProps.SuruUI;
  }
}

// Value
// -----

/**
 * {@link SliderValue} が持つ状態です。
 */
export type SliderValueState = Slider.Value.State;

export namespace SliderValueProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Slider.Value>, keyof Render>;

  export type HTML = Omit<React.ComponentProps<"output">, keyof Render>;

  export type Render = RenderProps<SliderValueState>;

  export type SuruUI = {};
}

/**
 * {@link SliderValue} に渡す props です。
 */
export type SliderValueProps = SliderValueProps.Render &
  SliderValueProps.SuruUI &
  SliderValueProps.BaseUI &
  SliderValueProps.HTML;

/**
 * スライダーの現在値を表示するコンポーネントです。
 */
export const SliderValue: IComponent<SliderValueProps> = function SuiSliderValue(props) {
  const { className, ...otherProps } = props;

  return <Slider.Value {...otherProps} className={cn(className, "sui_slider_value")} />;
};

export { SliderValue as Value };

/**
 * {@link SliderValue} の状態や props をまとめた型名前空間です。
 */
export namespace Value {
  export type State = SliderValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = SliderValueProps.BaseUI;

    export type HTML = SliderValueProps.HTML;

    export type Render = SliderValueProps.Render;

    export type SuruUI = SliderValueProps.SuruUI;
  }
}

// Control
// -------

/**
 * {@link SliderControl} が持つ状態です。
 */
export type SliderControlState = Slider.Control.State;

export namespace SliderControlProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Slider.Control>, keyof Render>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SliderControlState>;

  export type SuruUI = {};
}

/**
 * {@link SliderControl} に渡す props です。
 */
export type SliderControlProps = SliderControlProps.Render &
  SliderControlProps.SuruUI &
  SliderControlProps.BaseUI &
  SliderControlProps.HTML;

/**
 * スライダーの操作領域コンポーネントです。
 */
export const SliderControl: IComponent<SliderControlProps> = function SuiSliderControl(props) {
  const { className, ...otherProps } = props;

  return <Slider.Control {...otherProps} className={cn(className, "sui_slider_control")} />;
};

export { SliderControl as Control };

/**
 * {@link SliderControl} の状態や props をまとめた型名前空間です。
 */
export namespace Control {
  export type State = SliderControlState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = SliderControlProps.BaseUI;

    export type HTML = SliderControlProps.HTML;

    export type Render = SliderControlProps.Render;

    export type SuruUI = SliderControlProps.SuruUI;
  }
}

// Track
// -----

/**
 * {@link SliderTrack} が持つ状態です。
 */
export type SliderTrackState = Slider.Track.State;

export namespace SliderTrackProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Slider.Track>, keyof Render>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SliderTrackState>;

  export type SuruUI = {};
}

/**
 * {@link SliderTrack} に渡す props です。
 */
export type SliderTrackProps = SliderTrackProps.Render &
  SliderTrackProps.SuruUI &
  SliderTrackProps.BaseUI &
  SliderTrackProps.HTML;

/**
 * スライダーの全範囲を表すトラックコンポーネントです。
 */
export const SliderTrack: IComponent<SliderTrackProps> = function SuiSliderTrack(props) {
  const { className, ...otherProps } = props;

  return <Slider.Track {...otherProps} className={cn(className, "sui_slider_track")} />;
};

export { SliderTrack as Track };

/**
 * {@link SliderTrack} の状態や props をまとめた型名前空間です。
 */
export namespace Track {
  export type State = SliderTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = SliderTrackProps.BaseUI;

    export type HTML = SliderTrackProps.HTML;

    export type Render = SliderTrackProps.Render;

    export type SuruUI = SliderTrackProps.SuruUI;
  }
}

// Indicator
// ---------

/**
 * {@link SliderIndicator} が持つ状態です。
 */
export type SliderIndicatorState = Slider.Indicator.State;

export namespace SliderIndicatorProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Slider.Indicator>, keyof Render>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SliderIndicatorState>;

  export type SuruUI = {};
}

/**
 * {@link SliderIndicator} に渡す props です。
 */
export type SliderIndicatorProps = SliderIndicatorProps.Render &
  SliderIndicatorProps.SuruUI &
  SliderIndicatorProps.BaseUI &
  SliderIndicatorProps.HTML;

/**
 * スライダーの現在値を示すインジケーターコンポーネントです。
 */
export const SliderIndicator: IComponent<SliderIndicatorProps> = function SuiSliderIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Slider.Indicator {...otherProps} className={cn(className, "sui_slider_indicator")} />;
};

export { SliderIndicator as Indicator };

/**
 * {@link SliderIndicator} の状態や props をまとめた型名前空間です。
 */
export namespace Indicator {
  export type State = SliderIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = SliderIndicatorProps.BaseUI;

    export type HTML = SliderIndicatorProps.HTML;

    export type Render = SliderIndicatorProps.Render;

    export type SuruUI = SliderIndicatorProps.SuruUI;
  }
}

// Thumb
// -----

/**
 * {@link SliderThumb} が持つ状態です。
 */
export type SliderThumbState = Slider.Thumb.State;

export namespace SliderThumbProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Slider.Thumb>, keyof Render>;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;

  export type Render = RenderProps<SliderThumbState>;

  export type SuruUI = {};
}

/**
 * {@link SliderThumb} に渡す props です。
 */
export type SliderThumbProps = SliderThumbProps.Render &
  SliderThumbProps.SuruUI &
  SliderThumbProps.BaseUI &
  SliderThumbProps.HTML;

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

export { SliderThumb as Thumb };

/**
 * {@link SliderThumb} の状態や props をまとめた型名前空間です。
 */
export namespace Thumb {
  export type State = SliderThumbState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = SliderThumbProps.BaseUI;

    export type HTML = SliderThumbProps.HTML;

    export type Render = SliderThumbProps.Render;

    export type SuruUI = SliderThumbProps.SuruUI;
  }
}
