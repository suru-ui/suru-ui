import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { PlusIcon } from "../_icons.jsx";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link NumberFieldIncrement} が持つ状態です。
 */
export type NumberFieldIncrementState = NumberField.Increment.State;

export namespace NumberFieldIncrementProps {
  export type Render = RenderProps<NumberFieldIncrementState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Increment>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // NumberFieldIncrementProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Increment>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldIncrement} に渡す props です。
 */
export type NumberFieldIncrementProps = NumberFieldIncrementProps.Render &
  NumberFieldIncrementProps.SuruUI &
  NumberFieldIncrementProps.BaseUI &
  NumberFieldIncrementProps.HTML;

export type INumberFieldIncrement = IComponent<NumberFieldIncrementProps>;

/**
 * 値を増やすボタンです。
 */
export const NumberFieldIncrement: INumberFieldIncrement = function SuiNumberFieldIncrement(props) {
  const {
    children = <PlusIcon />,
    className,
    "aria-label": ariaLabel = "値を増やす",
    ...otherProps
  } = props;

  return (
    <NumberField.Increment
      {...otherProps}
      className={cn(className, "sui_number_field_stepper", "sui_number_field_increment")}
      aria-label={ariaLabel}
    >
      {children}
    </NumberField.Increment>
  );
};

export { NumberFieldIncrement as Increment };

export namespace Increment {
  export type State = NumberFieldIncrementState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldIncrementProps.Render;

    export type SuruUI = NumberFieldIncrementProps.SuruUI;

    export type BaseUI = NumberFieldIncrementProps.BaseUI;

    export type HTML = NumberFieldIncrementProps.HTML;
  }
}
