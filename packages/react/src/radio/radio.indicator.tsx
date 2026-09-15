import { Radio } from "@base-ui/react/radio";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link RadioIndicator} が持つ状態です。
 */
export type RadioIndicatorState = Radio.Indicator.State;

export namespace RadioIndicatorProps {
  export type Render = RenderProps<RadioIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Radio.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // RadioIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Radio.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link RadioIndicator} に渡す props です。
 */
export type RadioIndicatorProps = RadioIndicatorProps.Render &
  RadioIndicatorProps.SuruUI &
  RadioIndicatorProps.BaseUI &
  RadioIndicatorProps.HTML;

/**
 * ラジオボタンのインジケーターコンポーネントです。
 */
export const RadioIndicator: IComponent<RadioIndicatorProps> = function SuiRadioIndicator(props) {
  const { className, ...otherProps } = props;

  return <Radio.Indicator {...otherProps} className={cn(className, "sui_radio_indicator")} />;
};

export { RadioIndicator as Indicator };

export namespace Indicator {
  export type State = RadioIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = RadioIndicatorProps.Render;

    export type SuruUI = RadioIndicatorProps.SuruUI;

    export type BaseUI = RadioIndicatorProps.BaseUI;

    export type HTML = RadioIndicatorProps.HTML;
  }
}
