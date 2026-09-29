import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link NumberFieldInput} が持つ状態です。
 */
export type NumberFieldInputState = NumberField.Input.State;

export namespace NumberFieldInputProps {
  export type Render = RenderProps<NumberFieldInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldInputProps:
      "aria-roledescription",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldInput} に渡す props です。
 */
export type NumberFieldInputProps = NumberFieldInputProps.Render &
  NumberFieldInputProps.SuruUI &
  NumberFieldInputProps.BaseUI &
  NumberFieldInputProps.HTML;

export type INumberFieldInput = IComponent<NumberFieldInputProps>;

/**
 * 数値の入力欄です。
 */
export const NumberFieldInput: INumberFieldInput = function SuiNumberFieldInput(props) {
  const { className, ...otherProps } = props;

  return (
    <NumberField.Input
      {...otherProps}
      className={cn(
        className,
        "sui_number_field_input",
        (state) => state.valid === true && "sui_number_field_input-valid",
        (state) => state.valid === false && "sui_number_field_input-invalid",
        (state) => state.valid === null && "sui_number_field_input-unverified",
      )}
    />
  );
};

export { NumberFieldInput as Input };

export namespace Input {
  export type State = NumberFieldInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldInputProps.Render;

    export type SuruUI = NumberFieldInputProps.SuruUI;

    export type BaseUI = NumberFieldInputProps.BaseUI;

    export type HTML = NumberFieldInputProps.HTML;
  }
}
