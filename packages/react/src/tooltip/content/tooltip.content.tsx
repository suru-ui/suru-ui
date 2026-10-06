import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTooltipContext } from "../root/tooltip.root.context.js";
import { TooltipContentContext } from "./tooltip.content.context.js";

/**
 * {@link TooltipContent} が持つ状態です。
 */
export type TooltipContentState = TooltipContentContext;

export namespace TooltipContentProps {
  export type Render = RenderProps<TooltipContentState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Tooltip.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TooltipPopupProps より:
      never
    >,
    keyof Render | keyof SuruUI
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
          render: (htmlProps, state) => (
            <TooltipContentContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TooltipContentContext>
          ),
          className: cn<TooltipContentState>(
            className,
            "sui_tooltip_content",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_tooltip_content-transition_status_${state.transitionStatus}`,
            (state) => `sui_tooltip_content-size_${state.size}`,
            (state) => `sui_tooltip_content-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_content-outlined",
            (state) => state.open && "sui_tooltip_content-open",
            (state) => state.instant && "sui_tooltip_content-instant",
            (state) => `sui_tooltip_content-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_tooltip_content-align_${state.align}`,
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
