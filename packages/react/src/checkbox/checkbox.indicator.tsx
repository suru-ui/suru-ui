import { Checkbox } from "@base-ui/react/checkbox";
import * as React from "react";

import { CheckboxIcon } from "../_icons.jsx";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link CheckboxIndicator} が持つ状態です。
 */
export type CheckboxIndicatorState = Checkbox.Indicator.State;

export namespace CheckboxIndicatorProps {
  export type Render = RenderProps<CheckboxIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Checkbox.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // CheckboxIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
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
    <Checkbox.Indicator {...otherProps} className={cn(className, "sui_checkbox_indicator")}>
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
