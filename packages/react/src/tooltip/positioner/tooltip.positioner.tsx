import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTooltipPortalContext } from "../portal/tooltip.portal.context.js";
import { TooltipPositionerContext } from "./tooltip.positioner.context.js";

/**
 * {@link TooltipPositioner} が持つ状態です。
 */
export type TooltipPositionerState = TooltipPositionerContext;

export namespace TooltipPositionerProps {
  export type Render = RenderProps<TooltipPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Tooltip.Positioner>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TooltipPositionerProps より:
      | "side"
      // UseAnchorPositioningSharedParameters より:
      | "align"
      | "anchor"
      | "sticky"
      | "sideOffset"
      | "alignOffset"
      | "arrowPadding"
      | "positionMethod"
      | "collisionPadding"
      | "collisionBoundary"
      | "collisionAvoidance"
      | "disableAnchorTracking"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Tooltip.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TooltipPositioner} に渡す props です。
 */
export type TooltipPositionerProps = TooltipPositionerProps.Render &
  TooltipPositionerProps.SuruUI &
  TooltipPositionerProps.BaseUI &
  TooltipPositionerProps.HTML;

export type ITooltipPositioner = IComponent<TooltipPositionerProps>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const TooltipPositioner: ITooltipPositioner = function SuiTooltipPositioner(props) {
  const ctx = useTooltipPortalContext();
  const { style, render, className, positionMethod = "fixed", ...otherProps } = props;

  return (
    <Tooltip.Positioner
      {...otherProps}
      {...proxyRenderProps<Tooltip.Positioner.State, TooltipPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <TooltipPositionerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TooltipPositionerContext>
          ),
          className: cn<TooltipPositionerState>(
            className,
            "sui_tooltip_positioner",
            (state) => `sui_tooltip_positioner-size_${state.size}`,
            (state) => `sui_tooltip_positioner-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_positioner-outlined",
            (state) => state.open && "sui_tooltip_positioner-open",
            (state) => state.anchorHidden && "sui_tooltip_positioner-anchor_hidden",
            (state) => state.instant && "sui_tooltip_positioner-instant",
            (state) => `sui_tooltip_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_tooltip_positioner-align_${state.align}`,
          ),
        },
      )}
      positionMethod={positionMethod}
    />
  );
};

export { TooltipPositioner as Positioner };

export namespace Positioner {
  export type State = TooltipPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipPositionerProps.Render;

    export type SuruUI = TooltipPositionerProps.SuruUI;

    export type BaseUI = TooltipPositionerProps.BaseUI;

    export type HTML = TooltipPositionerProps.HTML;
  }
}
