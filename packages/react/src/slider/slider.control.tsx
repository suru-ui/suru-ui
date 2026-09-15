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
    export type Render = SliderControlProps.Render;

    export type SuruUI = SliderControlProps.SuruUI;

    export type BaseUI = SliderControlProps.BaseUI;

    export type HTML = SliderControlProps.HTML;
  }
}
