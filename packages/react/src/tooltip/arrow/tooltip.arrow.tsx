import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTooltipPopupContext } from "../popup/tooltip.popup.context.js";
import { TooltipArrowContext } from "./tooltip.arrow.context.js";

/**
 * {@link TooltipArrow} が持つ状態です。
 */
export type TooltipArrowState = TooltipArrowContext;

export namespace TooltipArrowProps {
  export type Render = RenderProps<TooltipArrowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Tooltip.Arrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // TooltipArrowProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<typeof Tooltip.Arrow>, keyof Render | keyof SuruUI>;
}

/**
 * {@link TooltipArrow} に渡す props です。
 */
export type TooltipArrowProps = TooltipArrowProps.Render &
  TooltipArrowProps.SuruUI &
  TooltipArrowProps.BaseUI &
  TooltipArrowProps.HTML;

export type ITooltipArrow = IComponent<TooltipArrowProps>;

/** ポップアップとトリガーをつなぐ矢印要素です。 */
export const TooltipArrow: ITooltipArrow = (props) => {
  const ctx = useTooltipPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Tooltip.Arrow
      {...otherProps}
      {...proxyRenderProps<Tooltip.Arrow.State, TooltipArrowState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <TooltipArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TooltipArrowContext>
          ),
          className: cn<TooltipArrowState>(
            className,
            "sui_tooltip_arrow",
            (state) => `sui_tooltip_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_tooltip_arrow-size_${state.size}`,
            (state) => `sui_tooltip_arrow-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_arrow-outlined",
            (state) => state.open && "sui_tooltip_arrow-open",
            (state) => state.instant && "sui_tooltip_arrow-instant",
            (state) => state.uncentered && "sui_tooltip_arrow-uncentered",
            (state) => `sui_tooltip_arrow-align_${state.align}`,
            (state) => state.anchorHidden && "sui_tooltip_arrow-anchor_hidden",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_tooltip_arrow-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { TooltipArrow as Arrow };
export namespace Arrow {
  export type State = TooltipArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipArrowProps.Render;

    export type SuruUI = TooltipArrowProps.SuruUI;

    export type BaseUI = TooltipArrowProps.BaseUI;

    export type HTML = TooltipArrowProps.HTML;
  }
}
