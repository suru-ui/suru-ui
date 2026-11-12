import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopoverPositionerContext } from "../positioner/popover.positioner.context.js";
import { PopoverPopupContext } from "./popover.popup.context.js";

/**
 * {@link PopoverPopup} が持つ状態です。
 */
export type PopoverPopupState = PopoverPopupContext;

export namespace PopoverPopupProps {
  export type Render = RenderProps<PopoverPopupState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Popover.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PopoverPopupProps より :
      "initialFocus" | "finalFocus"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverPopup} に渡す props です。
 */
export type PopoverPopupProps = PopoverPopupProps.Render &
  PopoverPopupProps.SuruUI &
  PopoverPopupProps.BaseUI &
  PopoverPopupProps.HTML;

export type IPopoverPopup = IComponent<PopoverPopupProps>;

/** ポップオーバーの内容を表示するポップアップ要素です。 */
export const PopoverPopup: IPopoverPopup = (props) => {
  const ctx = usePopoverPositionerContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Popup
      {...otherProps}
      {...proxyRenderProps<Popover.Popup.State, PopoverPopupState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <PopoverPopupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </PopoverPopupContext>
          ),
          className: cn<PopoverPopupState>(
            className,
            "sui_popover_popup",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_popover_popup-transition_status_${state.transitionStatus}`,
            (state) => `sui_popover_popup-size_${state.size}`,
            (state) => `sui_popover_popup-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_popup-outlined",
            (state) => state.open && "sui_popover_popup-open",
            (state) => state.instant && "sui_popover_popup-instant",
            (state) => `sui_popover_popup-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_popover_popup-align_${state.align}`,
            (state) => state.anchorHidden && "sui_popover_popup-anchor_hidden",
          ),
        },
      )}
    />
  );
};

export { PopoverPopup as Popup };
export namespace Popup {
  export type State = PopoverPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverPopupProps.Render;

    export type SuruUI = PopoverPopupProps.SuruUI;

    export type BaseUI = PopoverPopupProps.BaseUI;

    export type HTML = PopoverPopupProps.HTML;
  }
}
