import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import {
  type TextFieldInputProps,
  type TextFieldInputState,
  type TextFieldInputChangeEventReason,
  type TextFieldInputChangeEventDetails,
  TextFieldInput,
} from "../../text-field/text-field.parts.js";
import type { IComponent } from "../../types.js";
import { usePasswordFieldContext } from "../root/password-field.root.context.js";
import { PasswordFieldInputContext } from "./password-field.input.context.js";

/**
 * {@link PasswordFieldInput} の値が変更されたイベントの詳細です。
 */
export type PasswordFieldInputChangeEventDetails = TextFieldInputChangeEventDetails;

/**
 * {@link PasswordFieldInput} の値が変更された理由です。
 */
export type PasswordFieldInputChangeEventReason = TextFieldInputChangeEventReason;

/**
 * {@link PasswordFieldInput} の状態です。
 */
export type PasswordFieldInputState = PasswordFieldInputContext;

export namespace PasswordFieldInputProps {
  export type Render = RenderProps<PasswordFieldInputState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      TextFieldInputProps.BaseUI,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PasswordFieldInputProps より:
      keyof TextFieldInputProps.BaseUI
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<TextFieldInputProps.HTML, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link PasswordFieldInput} に渡すプロパティーです。
 *
 * 入力項目の種類はルートの表示状態で自動的に切り替わるため、指定できません。
 */
export type PasswordFieldInputProps = PasswordFieldInputProps.Render &
  PasswordFieldInputProps.SuruUI &
  PasswordFieldInputProps.BaseUI &
  PasswordFieldInputProps.HTML;

export type IPasswordFieldInput = IComponent<PasswordFieldInputProps>;

/**
 * パスワード入力欄の入力欄です。
 *
 * 入力項目はコンテキストから読み取った表示状態で自動的に切り替わり、常に上書きされます。
 */
export const PasswordFieldInput: IPasswordFieldInput = function SuiPasswordFieldInput(props) {
  const ctx = usePasswordFieldContext();
  const { style, render, className, ...otherProps } = props;

  // 表示状態は必ずコンテキストから決まるため、利用者の指定より優先します。
  return (
    <TextFieldInput
      {...otherProps}
      type={ctx.visible ? "text" : "password"}
      {...proxyRenderProps<TextFieldInputState, PasswordFieldInputState>(
        (state) => ({ ...state, visible: ctx.visible }),
        {
          style,
          render: (htmlProps, state) => (
            <PasswordFieldInputContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="input"
              />
            </PasswordFieldInputContext>
          ),
          className: cn<PasswordFieldInputState>(
            className,
            "sui_password_field_input",
            (state) => `sui_password_field_input-size_${state.size}`,
            (state) => `sui_password_field_input-color_${state.color}`,
            (state) => `sui_password_field_input-radius_${state.radius}`,
            (state) => `sui_password_field_input-variant_${state.variant}`,
            (state) => state.outlined && "sui_password_field_input-outlined",
            (state) => state.visible && "sui_password_field_input-visible",
            (state) => state.valid === true && "sui_password_field_input-valid",
            (state) => state.valid === false && "sui_password_field_input-invalid",
            (state) => state.valid === null && "sui_password_field_input-unverified",
            (state) => state.disabled && "sui_password_field_input-disabled",
            (state) => state.touched && "sui_password_field_input-touched",
            (state) => state.dirty && "sui_password_field_input-dirty",
            (state) => state.filled && "sui_password_field_input-filled",
            (state) => state.focused && "sui_password_field_input-focused",
          ),
        },
      )}
    />
  );
};

export { PasswordFieldInput as Input };

export namespace Input {
  export type State = PasswordFieldInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PasswordFieldInputProps.Render;

    export type SuruUI = PasswordFieldInputProps.SuruUI;

    export type BaseUI = PasswordFieldInputProps.BaseUI;

    export type HTML = PasswordFieldInputProps.HTML;
  }

  export type ChangeEventDetails = PasswordFieldInputChangeEventDetails;

  export type ChangeEventReason = PasswordFieldInputChangeEventReason;
}
