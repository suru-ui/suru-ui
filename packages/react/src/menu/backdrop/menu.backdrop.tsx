import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuBackdropContext } from "./menu.backdrop.context.js";

/**
 * {@link MenuBackdrop} が持つ状態です。
 */
export type MenuBackdropState = MenuBackdropContext;

export namespace MenuBackdropProps {
  export type Render = RenderProps<MenuBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Backdrop>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuBackdropProps より:
      never
    >,
    keyof Render | keyof SuruUI
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
          render: (htmlProps, state) => (
            <MenuBackdropContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </MenuBackdropContext>
          ),
          className: cn<MenuBackdropState>(
            className,
            "sui_menu_backdrop",
            (state) => `sui_menu_backdrop-size_${state.size}`,
            (state) => `sui_menu_backdrop-radius_${state.radius}`,
            (state) => `sui_menu_backdrop-variant_${state.variant}`,
            (state) => state.outlined && "sui_menu_backdrop-outlined",
            (state) => state.open && "sui_menu_backdrop-open",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_menu_backdrop-transition_status_${state.transitionStatus}`,
          ),
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
