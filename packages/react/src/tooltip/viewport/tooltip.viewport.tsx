import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTooltipContentContext } from "../content/tooltip.content.context.js";
import { TooltipViewportContext } from "./tooltip.viewport.context.js";

/**
 * {@link TooltipViewport} が持つ状態です。
 */
export type TooltipViewportState = TooltipViewportContext;

export namespace TooltipViewportProps {
  export type Render = RenderProps<TooltipViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Tooltip.Viewport>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TooltipViewportProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Tooltip.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TooltipViewport} に渡す props です。
 */
export type TooltipViewportProps = TooltipViewportProps.Render &
  TooltipViewportProps.SuruUI &
  TooltipViewportProps.BaseUI &
  TooltipViewportProps.HTML;

export type ITooltipViewport = IComponent<TooltipViewportProps>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのツールチップを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const TooltipViewport: ITooltipViewport = function SuiTooltipViewport(props) {
  const ctx = useTooltipContentContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Tooltip.Viewport
      {...otherProps}
      {...proxyRenderProps<Tooltip.Viewport.State, TooltipViewportState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <TooltipViewportContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TooltipViewportContext>
          ),
          className: cn<TooltipViewportState>(
            className,
            "sui_tooltip_viewport",
            (state) => `sui_tooltip_viewport-size_${state.size}`,
            (state) => `sui_tooltip_viewport-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_viewport-outlined",
            (state) => state.open && "sui_tooltip_viewport-open",
            (state) => state.anchorHidden && "sui_tooltip_viewport-anchor_hidden",
            (state) => state.instant && "sui_tooltip_viewport-instant",
            (state) => `sui_tooltip_viewport-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_tooltip_viewport-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_tooltip_viewport-transition_status_${state.transitionStatus}`,
            (state) => state.transitioning && "sui_tooltip_viewport-transitioning",
            (state) =>
              state.activationDirection !== undefined &&
              `sui_tooltip_viewport-activation_direction_${state.activationDirection}`,
          ),
        },
      )}
    />
  );
};

export { TooltipViewport as Viewport };

export namespace Viewport {
  export type State = TooltipViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipViewportProps.Render;

    export type SuruUI = TooltipViewportProps.SuruUI;

    export type BaseUI = TooltipViewportProps.BaseUI;

    export type HTML = TooltipViewportProps.HTML;
  }
}
