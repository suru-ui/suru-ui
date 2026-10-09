import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useContextMenuPortalContext } from "../portal/context-menu.portal.context.js";
import { ContextMenuPositionerContext } from "./context-menu.positioner.context.js";

/**
 * {@link ContextMenuPositioner} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuPositionerState<TItem = any> = ContextMenuPositionerContext<TItem>;

export namespace ContextMenuPositionerProps {
  export type Render<TItem = any> = RenderProps<ContextMenuPositionerState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.Positioner>,
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
    React.ComponentProps<typeof ContextMenu.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuPositioner} に渡す props です。
 */
export type ContextMenuPositionerProps = ContextMenuPositionerProps.Render &
  ContextMenuPositionerProps.SuruUI &
  ContextMenuPositionerProps.BaseUI &
  ContextMenuPositionerProps.HTML;

export type IContextMenuPositioner = IComponent<ContextMenuPositionerProps>;

/**
 * ポップアップを右クリックまたは長押しした位置に合わせる要素です。
 */
export const ContextMenuPositioner: IContextMenuPositioner = function SuiContextMenuPositioner(
  props,
) {
  const ctx = useContextMenuPortalContext();
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
    <ContextMenu.Positioner
      {...otherProps}
      side={side}
      align={align}
      {...proxyRenderProps<ContextMenu.Positioner.State, ContextMenuPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuPositionerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ContextMenuPositionerContext>
          ),
          className: cn<ContextMenuPositionerState>(
            className,
            "sui_context_menu_positioner",
            (state) => `sui_context_menu_positioner-size_${state.size}`,
            (state) => `sui_context_menu_positioner-radius_${state.radius}`,
            (state) => `sui_context_menu_positioner-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_positioner-outlined",
            (state) => state.open && "sui_context_menu_positioner-open",
            (state) => state.nested && "sui_context_menu_positioner-nested",
            (state) => state.anchorHidden && "sui_context_menu_positioner-anchor_hidden",
            (state) => state.instant && "sui_context_menu_positioner-instant",
            (state) => `sui_context_menu_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_context_menu_positioner-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { ContextMenuPositioner as Positioner };

export namespace Positioner {
  export type State<TItem = any> = ContextMenuPositionerState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuPositionerProps.Render<TItem>;

    export type SuruUI = ContextMenuPositionerProps.SuruUI;

    export type BaseUI = ContextMenuPositionerProps.BaseUI;

    export type HTML = ContextMenuPositionerProps.HTML;
  }
}
