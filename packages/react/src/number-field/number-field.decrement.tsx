import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { MinusIcon } from "../_icons.jsx";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link NumberFieldDecrement} が持つ状態です。
 */
export type NumberFieldDecrementState = NumberField.Decrement.State;

export namespace NumberFieldDecrementProps {
  export type Render = RenderProps<NumberFieldDecrementState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Decrement>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // NumberFieldDecrementProps:
      | never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Decrement>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldDecrement} に渡す props です。
 */
export type NumberFieldDecrementProps = NumberFieldDecrementProps.Render &
  NumberFieldDecrementProps.SuruUI &
  NumberFieldDecrementProps.BaseUI &
  NumberFieldDecrementProps.HTML;

/**
 * 値を減らすボタンです。
 */
export const NumberFieldDecrement: IComponent<NumberFieldDecrementProps> =
  function SuiNumberFieldDecrement(props) {
    const { children = <MinusIcon />, className, ...otherProps } = props;

    return (
      <NumberField.Decrement
        {...otherProps}
        className={cn(className, "sui_number_field_stepper", "sui_number_field_decrement")}
      >
        {children}
      </NumberField.Decrement>
    );
  };

export { NumberFieldDecrement as Decrement };

export namespace Decrement {
  export type State = NumberFieldDecrementState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldDecrementProps.Render;

    export type SuruUI = NumberFieldDecrementProps.SuruUI;

    export type BaseUI = NumberFieldDecrementProps.BaseUI;

    export type HTML = NumberFieldDecrementProps.HTML;
  }
}
