import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { type TextFieldAddonProps, TextFieldAddon } from "../text-field/text-field.parts.js";
import type { IComponent } from "../types.js";

/**
 * {@link PasswordFieldAddon} の状態です。
 */
export type PasswordFieldAddonState = {};

export namespace PasswordFieldAddonProps {
  export type Render = RenderProps<PasswordFieldAddonState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    TextFieldAddonProps,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PasswordFieldAddonProps: TextField の props をすべて継承します。
      keyof TextFieldAddonProps,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI | keyof BaseUI>;
}

/**
 * {@link PasswordFieldAddon} に渡すプロパティーです。
 */
export type PasswordFieldAddonProps = PasswordFieldAddonProps.Render &
  PasswordFieldAddonProps.SuruUI &
  PasswordFieldAddonProps.BaseUI &
  PasswordFieldAddonProps.HTML;

/**
 * パスワード入力欄の入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const PasswordFieldAddon: IComponent<PasswordFieldAddonProps> =
  function SuiPasswordFieldAddon(props) {
    const { className, ...otherProps } = props;

    return <TextFieldAddon {...otherProps} className={cn(className, "sui_password_field_addon")} />;
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
