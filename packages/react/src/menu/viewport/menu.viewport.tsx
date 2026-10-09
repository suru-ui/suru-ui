import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuViewportContext } from "./menu.viewport.context.js";

/**
 * {@link MenuViewport} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuViewportState<TItem = any> = MenuViewportContext<TItem>;

export namespace MenuViewportProps {
  export type Render<TItem = any> = RenderProps<MenuViewportState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Viewport>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuViewportProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuViewport} に渡す props です。
 */
export type MenuViewportProps = MenuViewportProps.Render &
  MenuViewportProps.SuruUI &
  MenuViewportProps.BaseUI &
  MenuViewportProps.HTML;

export type IMenuViewport = IComponent<MenuViewportProps>;

/**
 * トリガーの切り替えに伴うメニュー内容のアニメーション用ビューポートです。
 */
export const MenuViewport: IMenuViewport = function SuiMenuViewport(props) {
  const ctx = useMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Menu.Viewport
      {...otherProps}
      {...proxyRenderProps<Menu.Viewport.State, MenuViewportState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <MenuViewportContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </MenuViewportContext>
          ),
          className: cn<MenuViewportState>(
            className,
            "sui_menu_viewport",
            (state) => `sui_menu_viewport-size_${state.size}`,
            (state) => `sui_menu_viewport-radius_${state.radius}`,
            (state) => `sui_menu_viewport-variant_${state.variant}`,
            (state) => state.outlined && "sui_menu_viewport-outlined",
            (state) => state.instant && "sui_menu_viewport-instant",
            (state) => state.transitioning && "sui_menu_viewport-transitioning",
            (state) =>
              state.activationDirection !== undefined &&
              `sui_menu_viewport-activation_direction_${state.activationDirection}`,
          ),
        },
      )}
    />
  );
};

export { MenuViewport as Viewport };

export namespace Viewport {
  export type State<TItem = any> = MenuViewportState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuViewportProps.Render<TItem>;

    export type SuruUI = MenuViewportProps.SuruUI;

    export type BaseUI = MenuViewportProps.BaseUI;

    export type HTML = MenuViewportProps.HTML;
  }
}
