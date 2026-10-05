import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SliderContext, useSliderContext } from "../root/slider.root.context.js";

/**
 * {@link SliderThumb} が持つ状態です。
 */
export type SliderThumbState = Override<SliderContext, Slider.Thumb.State>;

export namespace SliderThumbProps {
  export type Render = RenderProps<SliderThumbState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Slider.Thumb>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SliderThumbProps:
      | "disabled"
      | "aria-valuetext"
      | "getAriaLabel"
      | "getAriaValueText"
      | "index"
      | "inputRef"
      | "onBlur"
      | "onFocus"
      | "onKeyDown"
      | "tabIndex",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Slider.Thumb>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SliderThumb} に渡す props です。
 */
export type SliderThumbProps = SliderThumbProps.Render &
  SliderThumbProps.SuruUI &
  SliderThumbProps.BaseUI &
  SliderThumbProps.HTML;

export type ISliderThumb = IComponent<SliderThumbProps>;

/**
 * スライダーのつまみコンポーネントです。
 *
 * 矢印キーで操作でき、フォーカス時はフォーカスリングが表示されます。
 */
export const SliderThumb: ISliderThumb = function SuiSliderThumb(props) {
  const ctx = useSliderContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Slider.Thumb
      {...otherProps}
      {...proxyRenderProps<Slider.Thumb.State, SliderThumbState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SliderThumbState>(
            className,
            "sui_slider_thumb",
            (state) => `sui_slider_thumb-size_${state.size}`,
            (state) => `sui_slider_thumb-color_${state.color}`,
            (state) => `sui_slider_thumb-radius_${state.radius}`,
            (state) => `sui_slider_thumb-variant_${state.variant}`,
            (state) => state.outlined && "sui_slider_thumb-outlined",
            (state) => state.disabled && "sui_slider_thumb-disabled",
            (state) => state.dragging && "sui_slider_thumb-dragging",
            (state) => state.touched && "sui_slider_thumb-touched",
            (state) => state.dirty && "sui_slider_thumb-dirty",
            (state) => state.filled && "sui_slider_thumb-filled",
            (state) => state.focused && "sui_slider_thumb-focused",
            (state) => state.valid === false && "sui_slider_thumb-invalid",
            (state) => state.valid === true && "sui_slider_thumb-valid",
            (state) => state.valid === null && "sui_slider_thumb-unverified",
            (state) => `sui_slider_thumb-orientation_${state.orientation}`,
            (state) =>
              state.activeThumbIndex >= 0 &&
              `sui_slider_thumb-active_thumb_index_${state.activeThumbIndex}`,
          ),
        },
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
    export type Render = SliderThumbProps.Render;

    export type SuruUI = SliderThumbProps.SuruUI;

    export type BaseUI = SliderThumbProps.BaseUI;

    export type HTML = SliderThumbProps.HTML;
  }
}
