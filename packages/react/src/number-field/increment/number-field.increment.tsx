import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { PlusIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type NumberFieldContext,
  useNumberFieldContext,
} from "../root/number-field.root.context.js";

/**
 * {@link NumberFieldIncrement} が持つ状態です。
 */
export type NumberFieldIncrementState = Override<NumberFieldContext, NumberField.Increment.State>;

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
  const ctx = useNumberFieldContext();
  const {
    style,
    render,
    children = <PlusIcon />,
    className,
    "aria-label": ariaLabel = "値を増やす",
    ...otherProps
  } = props;

  return (
    <NumberField.Increment
      {...otherProps}
      {...proxyRenderProps<NumberField.Increment.State, NumberFieldIncrementState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<NumberFieldIncrementState>(
            className,
            "sui_number_field_stepper",
            "sui_number_field_increment",
            (state) => `sui_number_field_increment-size_${state.size}`,
            (state) => `sui_number_field_increment-color_${state.color}`,
            (state) => `sui_number_field_increment-radius_${state.radius}`,
            (state) => `sui_number_field_increment-variant_${state.variant}`,
            (state) => state.outlined && "sui_number_field_increment-outlined",
            (state) => state.disabled && "sui_number_field_stepper-disabled",
            (state) => state.readOnly && "sui_number_field_stepper-readonly",
            (state) => state.required && "sui_number_field_stepper-required",
            (state) => state.scrubbing && "sui_number_field_stepper-scrubbing",
            (state) => state.touched && "sui_number_field_stepper-touched",
            (state) => state.dirty && "sui_number_field_stepper-dirty",
            (state) => state.filled && "sui_number_field_stepper-filled",
            (state) => state.focused && "sui_number_field_stepper-focused",
            (state) => state.valid === false && "sui_number_field_stepper-invalid",
            (state) => state.valid === true && "sui_number_field_stepper-valid",
            (state) => state.valid === null && "sui_number_field_stepper-unverified",
          ),
        },
      )}
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
