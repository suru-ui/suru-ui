import { Input as BaseInput } from "@base-ui/react/input";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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
export type TextFieldInputState = BaseInput.State;

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

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseInput>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // InputProps:
      "value" | "defaultValue" | "onValueChange",
      keyof Render | keyof SuruUI
    >
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

/**
 * 文字入力欄の入力欄です。
 */
export const TextFieldInput: IComponent<TextFieldInputProps> = function SuiTextFieldInput(props) {
  const { type = "text", className, ...otherProps } = props;

  return (
    <BaseInput
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_text_field_input",
        (state) => state.valid === true && "sui_text_field_input-valid",
        (state) => state.valid === false && "sui_text_field_input-invalid",
        (state) => state.valid === null && "sui_text_field_input-unverified",
        (state) => state.disabled && "sui_text_field_input-disabled",
      )}
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
