import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type MenuContext, useMenuContext } from "./menu.context.js";

/**
 * {@link MenuBackdrop} が持つ状態です。
 */
export type MenuBackdropState = Override<MenuContext, Menu.Backdrop.State>;

export namespace MenuBackdropProps {
  export type Render = RenderProps<MenuBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuBackdrop} に渡す props です。
 */
export type MenuBackdropProps = MenuBackdropProps.Render &
  MenuBackdropProps.SuruUI &
  MenuBackdropProps.BaseUI &
  MenuBackdropProps.HTML;

export type IMenuBackdrop = IComponent<MenuBackdropProps>;

/**
 * メニューの背後に表示されるオーバーレイ要素です。
 */
export const MenuBackdrop: IMenuBackdrop = function SuiMenuBackdrop(props) {
  const ctx = useMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Menu.Backdrop
      {...otherProps}
      {...proxyRenderProps<Menu.Backdrop.State, MenuBackdropState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_menu_backdrop"),
        },
      )}
    />
  );
};

export { MenuBackdrop as Backdrop };

export namespace Backdrop {
  export type State = MenuBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuBackdropProps.Render;

    export type SuruUI = MenuBackdropProps.SuruUI;

    export type BaseUI = MenuBackdropProps.BaseUI;

    export type HTML = MenuBackdropProps.HTML;
  }
}
