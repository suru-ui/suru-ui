import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useButtonContext } from "../root/button.root.context.js";
import type { ButtonAddonContext } from "./button.addon.context.js";

/**
 * {@link ButtonAddon} が持つ状態です。
 */
export type ButtonAddonState = ButtonAddonContext;

export namespace ButtonAddonProps {
  export type Render = RenderProps<ButtonAddonState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonAddon} に渡す props です。
 */
export type ButtonAddonProps = ButtonAddonProps.Render &
  ButtonAddonProps.SuruUI &
  ButtonAddonProps.BaseUI &
  ButtonAddonProps.HTML;

export type IButtonAddon = IComponent<ButtonAddonProps>;

/**
 * ボタンの左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const ButtonAddon: IButtonAddon = function SuiButtonAddon(props) {
  const ctx = useButtonContext();

  return useRender({
    props: [
      props,
      {
        className: cn<ButtonAddonState>(
          "sui_button_addon",
          (state) => `sui_button_addon-size_${state.size}`,
          (state) => `sui_button_addon-color_${state.color}`,
          (state) => `sui_button_addon-radius_${state.radius}`,
          (state) => `sui_button_addon-variant_${state.variant}`,
          (state) => state.item && "sui_button_addon-item",
          (state) => state.muted && "sui_button_addon-muted",
          (state) => state.outlined && "sui_button_addon-outlined",
          (state) => state.pending && "sui_button_addon-pending",
          (state) => state.squared && "sui_button_addon-squared",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { ButtonAddon as Addon };

export namespace Addon {
  export type State = ButtonAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonAddonProps.Render;

    export type SuruUI = ButtonAddonProps.SuruUI;

    export type BaseUI = ButtonAddonProps.BaseUI;

    export type HTML = ButtonAddonProps.HTML;
  }
}
