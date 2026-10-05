import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useSliderContext } from "../root/slider.root.context.js";
import { SliderValueContext } from "./slider.value.context.js";

/**
 * 値をレンダリングする関数のインターフェイスです。
 */
export interface ISliderValueRenderer {
  /**
   * スライダーの現在値をレンダリングします。
   *
   * @param formattedValues 書式化された値の一覧です。
   * @param values 現在値の一覧です。
   * @returns レンダリングする内容です。
   */
  (formattedValues: readonly string[], values: readonly number[]): React.ReactNode;
}

/**
 * {@link SliderValue} が持つ状態です。
 */
export type SliderValueState = SliderValueContext;

export namespace SliderValueProps {
  export type Render = RenderProps<SliderValueState>;

  export type SuruUI = {};

  export type BaseUI = Override<
    Pick<
      React.ComponentProps<typeof Slider.Value>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // SliderValueProps:
        "children",
        keyof Render | keyof SuruUI
      >
    >,
    // Base UI の型を強化します。
    {
      children?: ISliderValueRenderer | React.ReactNode | undefined;
    }
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Slider.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SliderValue} に渡す props です。
 */
export type SliderValueProps = SliderValueProps.Render &
  SliderValueProps.SuruUI &
  SliderValueProps.BaseUI &
  SliderValueProps.HTML;

export type ISliderValue = IComponent<SliderValueProps>;

/**
 * スライダーの現在値を表示するコンポーネントです。
 */
export const SliderValue: ISliderValue = function SuiSliderValue(props) {
  const ctx = useSliderContext();
  const { style, render, children, className, ...otherProps } = props;
  const renderer =
    typeof children === "function" ? children : children != null ? () => children : undefined;

  return (
    <Slider.Value
      {...otherProps}
      {...proxyRenderProps<Slider.Value.State, SliderValueState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SliderValueContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </SliderValueContext>
          ),
          className: cn<SliderValueState>(
            className,
            "sui_slider_value",
            (state) => `sui_slider_value-size_${state.size}`,
            (state) => `sui_slider_value-color_${state.color}`,
            (state) => `sui_slider_value-radius_${state.radius}`,
            (state) => `sui_slider_value-variant_${state.variant}`,
            (state) => state.outlined && "sui_slider_value-outlined",
            (state) => state.disabled && "sui_slider_value-disabled",
            (state) => state.dragging && "sui_slider_value-dragging",
            (state) => state.touched && "sui_slider_value-touched",
            (state) => state.dirty && "sui_slider_value-dirty",
            (state) => state.filled && "sui_slider_value-filled",
            (state) => state.focused && "sui_slider_value-focused",
            (state) => state.valid === false && "sui_slider_value-invalid",
            (state) => state.valid === true && "sui_slider_value-valid",
            (state) => state.valid === null && "sui_slider_value-unverified",
            (state) => `sui_slider_value-orientation_${state.orientation}`,
            (state) =>
              state.activeThumbIndex >= 0 &&
              `sui_slider_value-active_thumb_index_${state.activeThumbIndex}`,
          ),
        },
      )}
    >
      {renderer}
    </Slider.Value>
  );
};

export { SliderValue as Value };

/**
 * {@link SliderValue} の状態や props をまとめた型名前空間です。
 */
export namespace Value {
  export type State = SliderValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SliderValueProps.Render;

    export type SuruUI = SliderValueProps.SuruUI;

    export type BaseUI = SliderValueProps.BaseUI;

    export type HTML = SliderValueProps.HTML;
  }

  export type IRenderer = ISliderValueRenderer;
}
