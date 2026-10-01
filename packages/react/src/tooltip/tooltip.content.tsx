import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type TooltipContext, useTooltipContext } from "./tooltip.context.js";

/**
 * {@link TooltipContent} が持つ状態です。
 */
export type TooltipContentState = Override<TooltipContext, Tooltip.Popup.State>;

export namespace TooltipContentProps {
  export type Render = RenderProps<TooltipContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Tooltip.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TooltipPopupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Tooltip.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TooltipContent} に渡す props です。
 */
export type TooltipContentProps = TooltipContentProps.Render &
  TooltipContentProps.SuruUI &
  TooltipContentProps.BaseUI &
  TooltipContentProps.HTML;

export type ITooltipContent = IComponent<TooltipContentProps>;

/**
 * ツールチップの内容を表示するポップアップ要素です。
 */
export const TooltipContent: ITooltipContent = function SuiTooltipContent(props) {
  const ctx = useTooltipContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Tooltip.Popup
      role="tooltip"
      {...otherProps}
      {...proxyRenderProps<Tooltip.Popup.State, TooltipContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<TooltipContentState>(
            className,
            "sui_tooltip_content",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_tooltip_content-transition_status_${state.transitionStatus}`,
            (state) => `sui_tooltip_content-size_${state.size}`,
            (state) => `sui_tooltip_content-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_content-outlined",
          ),
        },
      )}
    />
  );
};

export { TooltipContent as Content };

export namespace Content {
  export type State = TooltipContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipContentProps.Render;

    export type SuruUI = TooltipContentProps.SuruUI;

    export type BaseUI = TooltipContentProps.BaseUI;

    export type HTML = TooltipContentProps.HTML;
  }
}
