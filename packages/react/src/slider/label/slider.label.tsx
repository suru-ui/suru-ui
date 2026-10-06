import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSliderContext } from "../root/slider.root.context.js";
import { SliderLabelContext } from "./slider.label.context.js";

/**
 * {@link SliderLabel} が持つ状態です。
 */
export type SliderLabelState = SliderLabelContext;

export namespace SliderLabelProps {
  export type Render = RenderProps<SliderLabelState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Slider.Label>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SliderLabelProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Slider.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SliderLabel} に渡す props です。
 */
export type SliderLabelProps = SliderLabelProps.Render &
  SliderLabelProps.SuruUI &
  SliderLabelProps.BaseUI &
  SliderLabelProps.HTML;

export type ISliderLabel = IComponent<SliderLabelProps>;

/**
 * スライダーのラベルコンポーネントです。
 */
export const SliderLabel: ISliderLabel = function SuiSliderLabel(props) {
  const ctx = useSliderContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Slider.Label
      {...otherProps}
      {...proxyRenderProps<Slider.Label.State, SliderLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SliderLabelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SliderLabelContext>
          ),
          className: cn<SliderLabelState>(
            className,
            "sui_slider_label",
            (state) => `sui_slider_label-size_${state.size}`,
            (state) => `sui_slider_label-color_${state.color}`,
            (state) => `sui_slider_label-radius_${state.radius}`,
            (state) => `sui_slider_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_slider_label-outlined",
            (state) => state.disabled && "sui_slider_label-disabled",
            (state) => state.dragging && "sui_slider_label-dragging",
            (state) => state.touched && "sui_slider_label-touched",
            (state) => state.dirty && "sui_slider_label-dirty",
            (state) => state.filled && "sui_slider_label-filled",
            (state) => state.focused && "sui_slider_label-focused",
            (state) => state.valid === false && "sui_slider_label-invalid",
            (state) => state.valid === true && "sui_slider_label-valid",
            (state) => state.valid === null && "sui_slider_label-unverified",
            (state) => `sui_slider_label-orientation_${state.orientation}`,
            (state) =>
              state.activeThumbIndex >= 0 &&
              `sui_slider_label-active_thumb_index_${state.activeThumbIndex}`,
          ),
        },
      )}
    />
  );
};

export { SliderLabel as Label };

/**
 * {@link SliderLabel} の状態や props をまとめた型名前空間です。
 */
export namespace Label {
  export type State = SliderLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SliderLabelProps.Render;

    export type SuruUI = SliderLabelProps.SuruUI;

    export type BaseUI = SliderLabelProps.BaseUI;

    export type HTML = SliderLabelProps.HTML;
  }
}
