import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type TooltipContext, useTooltipContext } from "./tooltip.context.js";

/**
 * {@link TooltipViewport} が持つ状態です。
 */
export type TooltipViewportState = Override<TooltipContext, Tooltip.Viewport.State>;

export namespace TooltipViewportProps {
  export type Render = RenderProps<TooltipViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Tooltip.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TooltipViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
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
  const ctx = useTooltipContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Tooltip.Viewport
      {...otherProps}
      {...proxyRenderProps<Tooltip.Viewport.State, TooltipViewportState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<TooltipViewportState>(
            className,
            "sui_tooltip_viewport",
            (state) => `sui_tooltip_viewport-size_${state.size}`,
            (state) => `sui_tooltip_viewport-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_viewport-outlined",
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
