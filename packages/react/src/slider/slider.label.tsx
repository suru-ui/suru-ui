import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SliderLabel} が持つ状態です。
 */
export type SliderLabelState = Slider.Label.State;

export namespace SliderLabelProps {
  export type Render = RenderProps<SliderLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Slider.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SliderLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
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
    export type Render = SliderLabelProps.Render;

    export type SuruUI = SliderLabelProps.SuruUI;

    export type BaseUI = SliderLabelProps.BaseUI;

    export type HTML = SliderLabelProps.HTML;
  }
}
