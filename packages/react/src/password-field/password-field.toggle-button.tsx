import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import { EyeIcon, EyeOffIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { usePasswordFieldContext } from "./password-field.context.js";

/**
 * {@link PasswordFieldToggleButton} の状態です。
 */
export type PasswordFieldToggleButtonState = {};

export namespace PasswordFieldToggleButtonProps {
  export type Render = RenderProps<PasswordFieldToggleButtonState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PasswordFieldToggleButton} に渡すプロパティーです。
 */
export type PasswordFieldToggleButtonProps = PasswordFieldToggleButtonProps.Render &
  PasswordFieldToggleButtonProps.SuruUI &
  PasswordFieldToggleButtonProps.BaseUI &
  PasswordFieldToggleButtonProps.HTML;

/**
 * パスワードの表示と非表示を切り替えるボタンです。
 *
 * アイコン、既定のラベル、押下状態はコンテキストから読み取った表示状態で切り替わります。
 */
export const PasswordFieldToggleButton: IComponent<PasswordFieldToggleButtonProps> =
  function SuiPasswordFieldToggleButton(props) {
    const ctx = usePasswordFieldContext();
    const { visible, setVisible } = ctx;
    const {
      children = visible ? <EyeOffIcon /> : <EyeIcon />,
      disabled = false,
      "aria-label": ariaLabel,
      ...otherButtonProps
    } = props;
    const label = ariaLabel ?? (visible ? "パスワードを隠す" : "パスワードを表示");

    return useRender({
      props: [
        otherButtonProps,
        {
          type: "button",
          onClick() {
            setVisible(!visible);
          },
          children,
          disabled,
          className: cn(
            "sui_password_field_toggle",
            visible && "sui_password_field_toggle-visible",
          ),
          "aria-label": label,
          "aria-pressed": visible,
        },
      ],
      defaultTagName: "button",
    });
  };

export { PasswordFieldToggleButton as ToggleButton };

export namespace ToggleButton {
  export type State = PasswordFieldToggleButtonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PasswordFieldToggleButtonProps.Render;

    export type SuruUI = PasswordFieldToggleButtonProps.SuruUI;

    export type BaseUI = PasswordFieldToggleButtonProps.BaseUI;

    export type HTML = PasswordFieldToggleButtonProps.HTML;
  }
}
