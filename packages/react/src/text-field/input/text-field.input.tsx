import { Input as BaseInput } from "@base-ui/react/input";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTextFieldContext } from "../root/text-field.root.context.js";
import { TextFieldInputContext } from "./text-field.input.context.js";

/**
 * {@link TextFieldInput} の値が変更されたイベントの詳細です。
 */
export type TextFieldInputChangeEventDetails = BaseInput.ChangeEventDetails;

/**
 * {@link TextFieldInput} の値が変更された理由です。
 */
export type TextFieldInputChangeEventReason = BaseInput.ChangeEventReason;

/**
 * 入力欄で使用できる入力項目の種類です。
 *
 * ボタンや選択系 (`"button"`、`"checkbox"`、`"radio"` など) は除きます。
 */
export type TextFieldInputType = Exclude<
  React.HTMLInputTypeAttribute,
  "button" | "checkbox" | "color" | "image" | "radio" | "range" | "reset" | "submit"
>;

/**
 * {@link TextFieldInput} の状態です。
 */
export type TextFieldInputState = TextFieldInputContext;

export namespace TextFieldInputProps {
  export type Render = RenderProps<TextFieldInputState>;

  export type SuruUI = {
    /**
     * 入力項目です。
     *
     * @default "text"
     */
    type?: TextFieldInputType | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseInput>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // InputProps より:
      "value" | "defaultValue" | "onValueChange"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseInput>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TextFieldInput} に渡す props です。
 */
export type TextFieldInputProps = TextFieldInputProps.Render &
  TextFieldInputProps.SuruUI &
  TextFieldInputProps.BaseUI &
  TextFieldInputProps.HTML;

export type ITextFieldInput = IComponent<TextFieldInputProps>;

/**
 * 文字入力欄の入力欄です。
 */
export const TextFieldInput: ITextFieldInput = function SuiTextFieldInput(props) {
  const ctx = useTextFieldContext();
  const { type = "text", style, render, className, ...otherProps } = props;
  const renderState = ctx;

  return (
    <BaseInput
      {...otherProps}
      {...proxyRenderProps<BaseInput.State, TextFieldInputState>(
        (inputState) => ({ ...renderState, ...inputState }),
        {
          style,
          render: (htmlProps, state) => (
            <TextFieldInputContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="input"
              />
            </TextFieldInputContext>
          ),
          className: cn<TextFieldInputState>(
            className,
            "sui_text_field_input",
            (state) => `sui_text_field_input-size_${state.size}`,
            (state) => `sui_text_field_input-color_${state.color}`,
            (state) => `sui_text_field_input-radius_${state.radius}`,
            (state) => `sui_text_field_input-variant_${state.variant}`,
            (state) => state.outlined && "sui_text_field_input-outlined",
            (state) => state.valid === true && "sui_text_field_input-valid",
            (state) => state.valid === false && "sui_text_field_input-invalid",
            (state) => state.valid === null && "sui_text_field_input-unverified",
            (state) => state.disabled && "sui_text_field_input-disabled",
            (state) => state.touched && "sui_text_field_input-touched",
            (state) => state.dirty && "sui_text_field_input-dirty",
            (state) => state.filled && "sui_text_field_input-filled",
            (state) => state.focused && "sui_text_field_input-focused",
          ),
        },
      )}
      type={type}
    />
  );
};

export { TextFieldInput as Input };

export namespace Input {
  export type State = TextFieldInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TextFieldInputProps.Render;

    export type SuruUI = TextFieldInputProps.SuruUI;

    export type BaseUI = TextFieldInputProps.BaseUI;

    export type HTML = TextFieldInputProps.HTML;
  }

  export type ChangeEventDetails = TextFieldInputChangeEventDetails;

  export type ChangeEventReason = TextFieldInputChangeEventReason;

  export type Type = TextFieldInputType;
}
