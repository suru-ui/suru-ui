import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useGroupContext } from "../group/menu.group.context.js";
import { MenuGroupLabelContext } from "./menu.group-label.context.js";

/**
 * {@link MenuGroupLabel} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuGroupLabelState<TItem = any> = MenuGroupLabelContext<TItem>;

export namespace MenuGroupLabelProps {
  export type Render<TItem = any> = RenderProps<MenuGroupLabelState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.GroupLabel>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuGroupLabelProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.GroupLabel>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link MenuGroupLabel} に渡す props です。
 */
export type MenuGroupLabelProps = MenuGroupLabelProps.Render &
  MenuGroupLabelProps.SuruUI &
  MenuGroupLabelProps.BaseUI &
  MenuGroupLabelProps.HTML;

export type IMenuGroupLabel = IComponent<MenuGroupLabelProps>;

/** グループに自動的に対応付けられるラベル要素です。 */
export const MenuGroupLabel: IMenuGroupLabel = (props) => {
  const ctx = useGroupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Menu.GroupLabel
      {...otherProps}
      {...proxyRenderProps<Menu.GroupLabel.State, MenuGroupLabelState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <MenuGroupLabelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </MenuGroupLabelContext>
          ),
          className: cn<MenuGroupLabelState>(
            className,
            "sui_menu_group_label",
            (state) => `sui_menu_group_label-size_${state.size}`,
            (state) => `sui_menu_group_label-radius_${state.radius}`,
            (state) => `sui_menu_group_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_menu_group_label-outlined",
            (state) => state.open && "sui_menu_group_label-open",
            (state) => state.anchorHidden && "sui_menu_group_label-anchor_hidden",
            (state) => state.nested && "sui_menu_group_label-nested",
            (state) => state.instant && "sui_menu_group_label-instant",
            (state) => `sui_menu_group_label-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_menu_group_label-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_menu_group_label-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { MenuGroupLabel as GroupLabel };
export namespace GroupLabel {
  export type State<TItem = any> = MenuGroupLabelState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuGroupLabelProps.Render<TItem>;

    export type SuruUI = MenuGroupLabelProps.SuruUI;

    export type BaseUI = MenuGroupLabelProps.BaseUI;

    export type HTML = MenuGroupLabelProps.HTML;
  }
}
