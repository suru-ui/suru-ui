import { Radio } from "@base-ui/react/radio";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link RadioIndicator} が持つ状態です。
 */
export type RadioIndicatorState = Radio.Indicator.State;

export namespace RadioIndicatorProps {
  export type Render = RenderProps<RadioIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Radio.Indicator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // RadioIndicatorProps より :
      "keepMounted"
    >,
    keyof Render | keyof SuruUI
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

export type IRadioIndicator = IComponent<RadioIndicatorProps>;

/** ラジオボタンのインジケーターコンポーネントです。 */
export const RadioIndicator: IRadioIndicator = (props) => {
  const { className, ...otherProps } = props;

  return (
    <Radio.Indicator
      {...otherProps}
      className={cn<RadioIndicatorState>(
        className,
        "sui_radio_indicator",
        (state) => state.disabled && "sui_radio_indicator-disabled",
        (state) => state.readOnly && "sui_radio_indicator-readonly",
        (state) => state.required && "sui_radio_indicator-required",
        (state) => state.checked && "sui_radio_indicator-checked",
        (state) => state.touched && "sui_radio_indicator-touched",
        (state) => state.dirty && "sui_radio_indicator-dirty",
        (state) => state.filled && "sui_radio_indicator-filled",
        (state) => state.focused && "sui_radio_indicator-focused",
        (state) => state.valid === false && "sui_radio_indicator-invalid",
        (state) => state.valid === true && "sui_radio_indicator-valid",
        (state) => state.valid === null && "sui_radio_indicator-unverified",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_radio_indicator-transition_status_${state.transitionStatus}`,
      )}
    />
  );
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
