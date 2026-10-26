import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopupContext } from "../popup/menu.popup.context.js";
import { MenuGroupContext } from "./menu.group.context.js";

/**
 * {@link MenuGroup} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuGroupState<TItem = any> = MenuGroupContext<TItem>;

export namespace MenuGroupProps {
  export type Render<TItem = any> = RenderProps<MenuGroupState<TItem>>;

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
  const ctx = usePopupContext();
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
          (state) => state.open && "sui_menu_group-open",
          (state) => state.anchorHidden && "sui_menu_group-anchor_hidden",
          (state) => state.nested && "sui_menu_group-nested",
          (state) => state.instant && "sui_menu_group-instant",
          (state) => `sui_menu_group-side_${state.side.replaceAll("-", "_")}`,
          (state) => `sui_menu_group-align_${state.align}`,
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_menu_group-transition_status_${state.transitionStatus}`,
        ),
      })}
    />
  );
};

export { MenuGroup as Group };

export namespace Group {
  export type State<TItem = any> = MenuGroupState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuGroupProps.Render<TItem>;

    export type SuruUI = MenuGroupProps.SuruUI;

    export type BaseUI = MenuGroupProps.BaseUI;

    export type HTML = MenuGroupProps.HTML;
  }
}
