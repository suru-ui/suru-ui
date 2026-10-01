import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SliderIndicator} が持つ状態です。
 */
export type SliderIndicatorState = Slider.Indicator.State;

export namespace SliderIndicatorProps {
  export type Render = RenderProps<SliderIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Slider.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SliderIndicatorProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Slider.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SliderIndicator} に渡す props です。
 */
export type SliderIndicatorProps = SliderIndicatorProps.Render &
  SliderIndicatorProps.SuruUI &
  SliderIndicatorProps.BaseUI &
  SliderIndicatorProps.HTML;

export type ISliderIndicator = IComponent<SliderIndicatorProps>;

/**
 * スライダーの現在値を示すインジケーターコンポーネントです。
 */
export const SliderIndicator: ISliderIndicator = function SuiSliderIndicator(props) {
  const { className, ...otherProps } = props;

  return (
    <Slider.Indicator
      {...otherProps}
      className={cn<SliderIndicatorState>(
        className,
        "sui_slider_indicator",
        (state) => state.disabled && "sui_slider_indicator-disabled",
        (state) => state.dragging && "sui_slider_indicator-dragging",
        (state) => state.touched && "sui_slider_indicator-touched",
        (state) => state.dirty && "sui_slider_indicator-dirty",
        (state) => state.filled && "sui_slider_indicator-filled",
        (state) => state.focused && "sui_slider_indicator-focused",
        (state) => state.valid === false && "sui_slider_indicator-invalid",
        (state) => state.valid === true && "sui_slider_indicator-valid",
        (state) => state.valid === null && "sui_slider_indicator-unverified",
        (state) => `sui_slider_indicator-orientation_${state.orientation}`,
        (state) =>
          state.activeThumbIndex >= 0 &&
          `sui_slider_indicator-active_thumb_index_${state.activeThumbIndex}`,
      )}
    />
  );
};

export { SliderIndicator as Indicator };

/**
 * {@link SliderIndicator} の状態や props をまとめた型名前空間です。
 */
export namespace Indicator {
  export type State = SliderIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SliderIndicatorProps.Render;

    export type SuruUI = SliderIndicatorProps.SuruUI;

    export type BaseUI = SliderIndicatorProps.BaseUI;

    export type HTML = SliderIndicatorProps.HTML;
  }
}
