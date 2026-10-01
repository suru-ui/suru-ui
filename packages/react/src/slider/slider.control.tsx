import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SliderControl} が持つ状態です。
 */
export type SliderControlState = Slider.Control.State;

export namespace SliderControlProps {
  export type Render = RenderProps<SliderControlState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Slider.Control>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SliderControlProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Slider.Control>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SliderControl} に渡す props です。
 */
export type SliderControlProps = SliderControlProps.Render &
  SliderControlProps.SuruUI &
  SliderControlProps.BaseUI &
  SliderControlProps.HTML;

export type ISliderControl = IComponent<SliderControlProps>;

/**
 * スライダーの操作領域コンポーネントです。
 */
export const SliderControl: ISliderControl = function SuiSliderControl(props) {
  const { className, ...otherProps } = props;

  return (
    <Slider.Control
      {...otherProps}
      className={cn<SliderControlState>(
        className,
        "sui_slider_control",
        (state) => state.disabled && "sui_slider_control-disabled",
        (state) => state.dragging && "sui_slider_control-dragging",
        (state) => state.touched && "sui_slider_control-touched",
        (state) => state.dirty && "sui_slider_control-dirty",
        (state) => state.filled && "sui_slider_control-filled",
        (state) => state.focused && "sui_slider_control-focused",
        (state) => state.valid === false && "sui_slider_control-invalid",
        (state) => state.valid === true && "sui_slider_control-valid",
        (state) => state.valid === null && "sui_slider_control-unverified",
        (state) => `sui_slider_control-orientation_${state.orientation}`,
        (state) =>
          state.activeThumbIndex >= 0 &&
          `sui_slider_control-active_thumb_index_${state.activeThumbIndex}`,
      )}
    />
  );
};

export { SliderControl as Control };

/**
 * {@link SliderControl} の状態や props をまとめた型名前空間です。
 */
export namespace Control {
  export type State = SliderControlState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SliderControlProps.Render;

    export type SuruUI = SliderControlProps.SuruUI;

    export type BaseUI = SliderControlProps.BaseUI;

    export type HTML = SliderControlProps.HTML;
  }
}
