import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SliderThumb} が持つ状態です。
 */
export type SliderThumbState = Slider.Thumb.State;

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

/**
 * スライダーのつまみコンポーネントです。
 *
 * 矢印キーで操作でき、フォーカス時はフォーカスリングが表示されます。
 */
export const SliderThumb: IComponent<SliderThumbProps> = function SuiSliderThumb(props) {
  const { className, ...otherProps } = props;

  return <Slider.Thumb {...otherProps} className={cn(className, "sui_slider_thumb")} />;
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
