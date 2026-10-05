import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import {
  type TextFieldAddonProps,
  type TextFieldAddonState,
  TextFieldAddon,
} from "../../text-field/text-field.parts.js";
import type { Override, IComponent } from "../../types.js";
import {
  type PasswordFieldContextState,
  usePasswordFieldContext,
} from "../root/password-field.root.context.js";

/**
 * {@link PasswordFieldAddon} の状態です。
 */
export type PasswordFieldAddonState = Override<PasswordFieldContextState, TextFieldAddonState>;

export namespace PasswordFieldAddonProps {
  export type Render = RenderProps<PasswordFieldAddonState>;

  export type SuruUI = {
    /**
     * クリック時の入力欄への自動フォーカスを無効にするかどうかを指定します。
     *
     * @default false
     */
    disableFocusOnClick?: boolean | undefined;
  };

  export type BaseUI = Pick<
    TextFieldAddonProps.BaseUI,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PasswordFieldAddonProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<TextFieldAddonProps.HTML, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link PasswordFieldAddon} に渡すプロパティーです。
 */
export type PasswordFieldAddonProps = PasswordFieldAddonProps.Render &
  PasswordFieldAddonProps.SuruUI &
  PasswordFieldAddonProps.BaseUI &
  PasswordFieldAddonProps.HTML;

export type IPasswordFieldAddon = IComponent<PasswordFieldAddonProps>;

/**
 * パスワード入力欄の入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const PasswordFieldAddon: IPasswordFieldAddon = function SuiPasswordFieldAddon(props) {
  const ctx = usePasswordFieldContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <TextFieldAddon
      {...otherProps}
      {...proxyRenderProps<TextFieldAddonState, PasswordFieldAddonState>(
        (state) => ({ ...state, visible: ctx.visible }),
        {
          style,
          render,
          className: cn<PasswordFieldAddonState>(
            className,
            "sui_password_field_addon",
            (state) => `sui_password_field_addon-size_${state.size}`,
            (state) => `sui_password_field_addon-color_${state.color}`,
            (state) => `sui_password_field_addon-radius_${state.radius}`,
            (state) => `sui_password_field_addon-variant_${state.variant}`,
            (state) => state.outlined && "sui_password_field_addon-outlined",
            (state) => state.visible && "sui_password_field_addon-visible",
          ),
        },
      )}
    />
  );
};

export { PasswordFieldAddon as Addon };

export namespace Addon {
  export type State = PasswordFieldAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PasswordFieldAddonProps.Render;

    export type SuruUI = PasswordFieldAddonProps.SuruUI;

    export type BaseUI = PasswordFieldAddonProps.BaseUI;

    export type HTML = PasswordFieldAddonProps.HTML;
  }
}
