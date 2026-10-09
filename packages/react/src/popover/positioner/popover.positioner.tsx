import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopoverPortalContext } from "../portal/popover.portal.context.js";
import { PopoverPositionerContext } from "./popover.positioner.context.js";

/**
 * {@link PopoverPositioner} が持つ状態です。
 */
export type PopoverPositionerState = PopoverPositionerContext;

export namespace PopoverPositionerProps {
  export type Render = RenderProps<PopoverPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Popover.Positioner>,
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
    React.ComponentProps<typeof Popover.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverPositioner} に渡す props です。
 */
export type PopoverPositionerProps = PopoverPositionerProps.Render &
  PopoverPositionerProps.SuruUI &
  PopoverPositionerProps.BaseUI &
  PopoverPositionerProps.HTML;

export type IPopoverPositioner = IComponent<PopoverPositionerProps>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const PopoverPositioner: IPopoverPositioner = function SuiPopoverPositioner(props) {
  const ctx = usePopoverPortalContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Positioner
      {...otherProps}
      {...proxyRenderProps<Popover.Positioner.State, PopoverPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <PopoverPositionerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </PopoverPositionerContext>
          ),
          className: cn<PopoverPositionerState>(
            className,
            "sui_popover_positioner",
            (state) => `sui_popover_positioner-size_${state.size}`,
            (state) => `sui_popover_positioner-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_positioner-outlined",
            (state) => state.open && "sui_popover_positioner-open",
            (state) => state.anchorHidden && "sui_popover_positioner-anchor_hidden",
            (state) => state.instant && "sui_popover_positioner-instant",
            (state) => `sui_popover_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_popover_positioner-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { PopoverPositioner as Positioner };

export namespace Positioner {
  export type State = PopoverPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverPositionerProps.Render;

    export type SuruUI = PopoverPositionerProps.SuruUI;

    export type BaseUI = PopoverPositionerProps.BaseUI;

    export type HTML = PopoverPositionerProps.HTML;
  }
}
