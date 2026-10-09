import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useContentContext } from "../content/menu.content.context.js";
import { MenuArrowContext } from "./menu.arrow.context.js";

/**
 * {@link MenuArrow} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuArrowState<TItem = any> = MenuArrowContext<TItem>;

export namespace MenuArrowProps {
  export type Render<TItem = any> = RenderProps<MenuArrowState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Arrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuArrowProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuArrow} に渡す props です。
 */
export type MenuArrowProps = MenuArrowProps.Render &
  MenuArrowProps.SuruUI &
  MenuArrowProps.BaseUI &
  MenuArrowProps.HTML;

export type IMenuArrow = IComponent<MenuArrowProps>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const MenuArrow: IMenuArrow = function SuiMenuArrow(props) {
  const ctx = useContentContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Menu.Arrow
      {...otherProps}
      {...proxyRenderProps<Menu.Arrow.State, MenuArrowState>((state) => ({ ...ctx, ...state }), {
        style,
        render: (htmlProps, state) => (
          <MenuArrowContext value={state}>
            <RenderElement
              state={state}
              render={render}
              htmlProps={htmlProps}
              defaultTagName="div"
            />
          </MenuArrowContext>
        ),
        className: cn<MenuArrowState>(
          className,
          "sui_menu_arrow",
          (state) => `sui_menu_arrow-size_${state.size}`,
          (state) => `sui_menu_arrow-radius_${state.radius}`,
          (state) => `sui_menu_arrow-variant_${state.variant}`,
          (state) => state.outlined && "sui_menu_arrow-outlined",
          (state) => state.open && "sui_menu_arrow-open",
          (state) => state.anchorHidden && "sui_menu_arrow-anchor_hidden",
          (state) => state.nested && "sui_menu_arrow-nested",
          (state) => state.instant && "sui_menu_arrow-instant",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_menu_arrow-transition_status_${state.transitionStatus}`,
          (state) => state.uncentered && "sui_menu_arrow-uncentered",
          (state) => `sui_menu_arrow-side_${state.side.replaceAll("-", "_")}`,
          (state) => `sui_menu_arrow-align_${state.align}`,
        ),
      })}
    />
  );
};

export { MenuArrow as Arrow };

export namespace Arrow {
  export type State<TItem = any> = MenuArrowState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuArrowProps.Render<TItem>;

    export type SuruUI = MenuArrowProps.SuruUI;

    export type BaseUI = MenuArrowProps.BaseUI;

    export type HTML = MenuArrowProps.HTML;
  }
}
