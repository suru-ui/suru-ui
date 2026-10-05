import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type NumberFieldContext,
  useNumberFieldContext,
} from "../root/number-field.root.context.js";
import { NumberFieldInputContext } from "./number-field.input.context.js";

/**
 * {@link NumberFieldInput} が持つ状態です。
 */
export type NumberFieldInputState = Override<NumberFieldContext, NumberField.Input.State>;

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
  const ctx = useNumberFieldContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <NumberField.Input
      {...otherProps}
      {...proxyRenderProps<NumberField.Input.State, NumberFieldInputState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <NumberFieldInputContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="input"
              />
            </NumberFieldInputContext>
          ),
          className: cn<NumberFieldInputState>(
            className,
            "sui_number_field_input",
            (state) => `sui_number_field_input-size_${state.size}`,
            (state) => `sui_number_field_input-color_${state.color}`,
            (state) => `sui_number_field_input-radius_${state.radius}`,
            (state) => `sui_number_field_input-variant_${state.variant}`,
            (state) => state.outlined && "sui_number_field_input-outlined",
            (state) => state.valid === true && "sui_number_field_input-valid",
            (state) => state.valid === false && "sui_number_field_input-invalid",
            (state) => state.valid === null && "sui_number_field_input-unverified",
            (state) => state.disabled && "sui_number_field_input-disabled",
            (state) => state.readOnly && "sui_number_field_input-readonly",
            (state) => state.required && "sui_number_field_input-required",
            (state) => state.scrubbing && "sui_number_field_input-scrubbing",
            (state) => state.touched && "sui_number_field_input-touched",
            (state) => state.dirty && "sui_number_field_input-dirty",
            (state) => state.filled && "sui_number_field_input-filled",
            (state) => state.focused && "sui_number_field_input-focused",
          ),
        },
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
