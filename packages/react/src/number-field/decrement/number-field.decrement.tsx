import type { NativeButtonProps } from "@base-ui/react/internals/types";
import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import { MinusIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useNumberFieldAddonContext } from "../addon/number-field.addon.context.js";
import { NumberFieldDecrementContext } from "./number-field.decrement.context.js";

/**
 * {@link NumberFieldDecrement} が持つ状態です。
 */
export type NumberFieldDecrementState = NumberFieldDecrementContext;

export namespace NumberFieldDecrementProps {
  export type Render = RenderProps<NumberFieldDecrementState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof NumberField.Decrement>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より :
      | keyof NativeButtonProps
      // NumberFieldDecrementProps より :
      | never
    >,
    keyof Render | keyof SuruUI
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

export type INumberFieldDecrement = IComponent<NumberFieldDecrementProps>;

/** 値を減らすボタンです。 */
export const NumberFieldDecrement: INumberFieldDecrement = (props) => {
  const ctx = useNumberFieldAddonContext();
  const {
    style,
    render,
    children = <MinusIcon />,
    className,
    "aria-label": ariaLabel = "値を減らす",
    ...otherProps
  } = props;

  return (
    <NumberField.Decrement
      {...otherProps}
      {...proxyRenderProps<NumberField.Decrement.State, NumberFieldDecrementState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <NumberFieldDecrementContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </NumberFieldDecrementContext>
          ),
          className: cn<NumberFieldDecrementState>(
            className,
            "sui_number_field_stepper",
            "sui_number_field_decrement",
            (state) => `sui_number_field_decrement-size_${state.size}`,
            (state) => `sui_number_field_decrement-color_${state.color}`,
            (state) => `sui_number_field_decrement-radius_${state.radius}`,
            (state) => `sui_number_field_decrement-variant_${state.variant}`,
            (state) => state.outlined && "sui_number_field_decrement-outlined",
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
