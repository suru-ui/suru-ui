import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useTooltipPositionerContext } from "../positioner/tooltip.positioner.context.js";
import { TooltipPopupContext } from "./tooltip.popup.context.js";

/**
 * {@link TooltipPopup} が持つ状態です。
 */
export type TooltipPopupState = TooltipPopupContext;

export namespace TooltipPopupProps {
  export type Render = RenderProps<TooltipPopupState>;

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
 * {@link TooltipPopup} に渡す props です。
 */
export type TooltipPopupProps = TooltipPopupProps.Render &
  TooltipPopupProps.SuruUI &
  TooltipPopupProps.BaseUI &
  TooltipPopupProps.HTML;

export type ITooltipPopup = IComponent<TooltipPopupProps>;

/**
 * ツールチップの内容を表示するポップアップ要素です。
 */
export const TooltipPopup: ITooltipPopup = function SuiTooltipPopup(props) {
  const ctx = useTooltipPositionerContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Tooltip.Popup
      role="tooltip"
      {...otherProps}
      {...proxyRenderProps<Tooltip.Popup.State, TooltipPopupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <TooltipPopupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </TooltipPopupContext>
          ),
          className: cn<TooltipPopupState>(
            className,
            "sui_tooltip_popup",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_tooltip_popup-transition_status_${state.transitionStatus}`,
            (state) => `sui_tooltip_popup-size_${state.size}`,
            (state) => `sui_tooltip_popup-radius_${state.radius}`,
            (state) => state.outlined && "sui_tooltip_popup-outlined",
            (state) => state.open && "sui_tooltip_popup-open",
            (state) => state.anchorHidden && "sui_tooltip_popup-anchor_hidden",
            (state) => state.instant && "sui_tooltip_popup-instant",
            (state) => `sui_tooltip_popup-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_tooltip_popup-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { TooltipPopup as Popup };

export namespace Popup {
  export type State = TooltipPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipPopupProps.Render;

    export type SuruUI = TooltipPopupProps.SuruUI;

    export type BaseUI = TooltipPopupProps.BaseUI;

    export type HTML = TooltipPopupProps.HTML;
  }
}
