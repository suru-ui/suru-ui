import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuPositionerContext } from "./menu.positioner.context.js";

/**
 * {@link MenuPositioner} が持つ状態です。
 */
export type MenuPositionerState = MenuPositionerContext;

export namespace MenuPositionerProps {
  export type Render = RenderProps<MenuPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Positioner>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters より:
      | "anchor"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "collisionBoundary"
      | "collisionPadding"
      | "sticky"
      | "arrowPadding"
      | "disableAnchorTracking"
      | "collisionAvoidance"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuPositioner} に渡す props です。
 */
export type MenuPositionerProps = MenuPositionerProps.Render &
  MenuPositionerProps.SuruUI &
  MenuPositionerProps.BaseUI &
  MenuPositionerProps.HTML;

export type IMenuPositioner = IComponent<MenuPositionerProps>;

/**
 * ポップアップをトリガーに位置合わせする要素です。
 */
export const MenuPositioner: IMenuPositioner = function SuiMenuPositioner(props) {
  const ctx = useMenuContext();
  const {
    // ルートメニューは上下優先、サブメニューは左右優先にします。
    side = ctx.depth === 1 ? "bottom" : "right",
    align = "start",
    style,
    render,
    className,
    ...otherProps
  } = props;

  return (
    <Menu.Positioner
      {...otherProps}
      side={side}
      align={align}
      {...proxyRenderProps<Menu.Positioner.State, MenuPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <MenuPositionerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </MenuPositionerContext>
          ),
          className: cn<MenuPositionerState>(
            className,
            "sui_menu_positioner",
            (state) => `sui_menu_positioner-size_${state.size}`,
            (state) => `sui_menu_positioner-radius_${state.radius}`,
            (state) => `sui_menu_positioner-variant_${state.variant}`,
            (state) => state.outlined && "sui_menu_positioner-outlined",
            (state) => state.open && "sui_menu_positioner-open",
            (state) => state.nested && "sui_menu_positioner-nested",
            (state) => state.anchorHidden && "sui_menu_positioner-anchor_hidden",
            (state) => state.instant && "sui_menu_positioner-instant",
            (state) => `sui_menu_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_menu_positioner-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { MenuPositioner as Positioner };

export namespace Positioner {
  export type State = MenuPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuPositionerProps.Render;

    export type SuruUI = MenuPositionerProps.SuruUI;

    export type BaseUI = MenuPositionerProps.BaseUI;

    export type HTML = MenuPositionerProps.HTML;
  }
}
