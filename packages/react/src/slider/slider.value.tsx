import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";

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
export type SliderValueState = Slider.Value.State;

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
  const { children, className, ...otherProps } = props;
  const renderer =
    typeof children === "function" ? children : children != null ? () => children : undefined;

  return (
    <Slider.Value
      {...otherProps}
      children={renderer}
      className={cn(className, "sui_slider_value")}
    />
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
