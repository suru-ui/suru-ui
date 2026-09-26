import type { RenderProps } from "../_use-render.js";
import {
  type TextFieldInputProps,
  type TextFieldInputState,
  type TextFieldInputChangeEventReason,
  type TextFieldInputChangeEventDetails,
  TextFieldInput,
} from "../text-field/text-field.parts.js";
import type { IComponent } from "../types.js";
import { usePasswordFieldContext } from "./password-field.context.js";

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
export type PasswordFieldInputState = TextFieldInputState;

export namespace PasswordFieldInputProps {
  export type Render = RenderProps<PasswordFieldInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    TextFieldInputProps.BaseUI,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PasswordFieldInputProps:
      keyof TextFieldInputProps.BaseUI,
      keyof Render | keyof SuruUI
    >
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

/**
 * パスワード入力欄の入力欄です。
 *
 * 入力項目はコンテキストから読み取った表示状態で自動的に切り替わり、常に上書きされます。
 */
export const PasswordFieldInput: IComponent<PasswordFieldInputProps> =
  function SuiPasswordFieldInput(props) {
    const ctx = usePasswordFieldContext();

    // 表示状態は必ずコンテキストから決まるため、利用者の指定より優先します。
    return <TextFieldInput {...props} type={ctx.visible ? "text" : "password"} />;
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
