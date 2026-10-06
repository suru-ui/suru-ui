import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuGroupContext } from "./menu.group.context.js";

/**
 * {@link MenuGroup} が持つ状態です。
 */
export type MenuGroupState = MenuGroupContext;

export namespace MenuGroupProps {
  export type Render = RenderProps<MenuGroupState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Group>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuGroupProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuGroup} に渡す props です。
 */
export type MenuGroupProps = MenuGroupProps.Render &
  MenuGroupProps.SuruUI &
  MenuGroupProps.BaseUI &
  MenuGroupProps.HTML;

export type IMenuGroup = IComponent<MenuGroupProps>;

/**
 * 関連するメニュー項目をまとめるグループ要素です。
 */
export const MenuGroup: IMenuGroup = function SuiMenuGroup(props) {
  const ctx = useMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Menu.Group
      {...otherProps}
      {...proxyRenderProps<Menu.Group.State, MenuGroupState>((state) => ({ ...ctx, ...state }), {
        style,
        render: (htmlProps, state) => (
          <MenuGroupContext value={state}>
            <RenderElement
              state={state}
              render={render}
              htmlProps={htmlProps}
              defaultTagName="div"
            />
          </MenuGroupContext>
        ),
        className: cn<MenuGroupState>(
          className,
          "sui_menu_group",
          (state) => `sui_menu_group-size_${state.size}`,
          (state) => `sui_menu_group-radius_${state.radius}`,
          (state) => `sui_menu_group-variant_${state.variant}`,
          (state) => state.outlined && "sui_menu_group-outlined",
        ),
      })}
    />
  );
};

export { MenuGroup as Group };

export namespace Group {
  export type State = MenuGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuGroupProps.Render;

    export type SuruUI = MenuGroupProps.SuruUI;

    export type BaseUI = MenuGroupProps.BaseUI;

    export type HTML = MenuGroupProps.HTML;
  }
}
