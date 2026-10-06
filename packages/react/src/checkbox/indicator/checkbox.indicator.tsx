import { Checkbox } from "@base-ui/react/checkbox";
import * as React from "react";

import { CheckboxIcon } from "../../_icons.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link CheckboxIndicator} が持つ状態です。
 */
export type CheckboxIndicatorState = Checkbox.Indicator.State;

export namespace CheckboxIndicatorProps {
  export type Render = RenderProps<CheckboxIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Checkbox.Indicator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // CheckboxIndicatorProps より:
      "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Checkbox.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CheckboxIndicator} に渡す props です。
 */
export type CheckboxIndicatorProps = CheckboxIndicatorProps.Render &
  CheckboxIndicatorProps.SuruUI &
  CheckboxIndicatorProps.BaseUI &
  CheckboxIndicatorProps.HTML;

export type ICheckboxIndicator = IComponent<CheckboxIndicatorProps>;

/**
 * チェックボックスのインジケーターコンポーネントです。
 */
export const CheckboxIndicator: ICheckboxIndicator = function SuiCheckboxIndicator(props) {
  const { children = <CheckboxIcon />, className, ...otherProps } = props;

  return (
    <Checkbox.Indicator
      {...otherProps}
      className={cn<CheckboxIndicatorState>(
        className,
        "sui_checkbox_indicator",
        (state) => state.disabled && "sui_checkbox_indicator-disabled",
        (state) => state.readOnly && "sui_checkbox_indicator-readonly",
        (state) => state.required && "sui_checkbox_indicator-required",
        (state) => state.checked && "sui_checkbox_indicator-checked",
        (state) => state.indeterminate && "sui_checkbox_indicator-indeterminate",
        (state) => state.touched && "sui_checkbox_indicator-touched",
        (state) => state.dirty && "sui_checkbox_indicator-dirty",
        (state) => state.filled && "sui_checkbox_indicator-filled",
        (state) => state.focused && "sui_checkbox_indicator-focused",
        (state) => state.valid === false && "sui_checkbox_indicator-invalid",
        (state) => state.valid === true && "sui_checkbox_indicator-valid",
        (state) => state.valid === null && "sui_checkbox_indicator-unverified",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_checkbox_indicator-transition_status_${state.transitionStatus}`,
      )}
    >
      {children}
    </Checkbox.Indicator>
  );
};

export { CheckboxIndicator as Indicator };

export namespace Indicator {
  export type State = CheckboxIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CheckboxIndicatorProps.Render;

    export type SuruUI = CheckboxIndicatorProps.SuruUI;

    export type BaseUI = CheckboxIndicatorProps.BaseUI;

    export type HTML = CheckboxIndicatorProps.HTML;
  }
}
