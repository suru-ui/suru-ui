import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePositionerContext } from "../positioner/hover-card.positioner.context.js";
import { HoverCardPopupContext } from "./hover-card.popup.context.js";

/**
 * {@link HoverCardPopup} が持つ状態です。
 */
export type HoverCardPopupState = HoverCardPopupContext;

export namespace HoverCardPopupProps {
  export type Render = RenderProps<HoverCardPopupState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof PreviewCard.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PreviewCardPopupProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Popup>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link HoverCardPopup} に渡す props です。
 */
export type HoverCardPopupProps = HoverCardPopupProps.Render &
  HoverCardPopupProps.SuruUI &
  HoverCardPopupProps.BaseUI &
  HoverCardPopupProps.HTML;

export type IHoverCardPopup = IComponent<HoverCardPopupProps>;

/** ホバーカードの内容を表示するポップアップ要素です。 */
export const HoverCardPopup: IHoverCardPopup = (props) => {
  const ctx = usePositionerContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <PreviewCard.Popup
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Popup.State, HoverCardPopupState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <HoverCardPopupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </HoverCardPopupContext>
          ),
          className: cn<HoverCardPopupState>(
            className,
            "sui_hover_card_popup",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_hover_card_popup-transition_status_${state.transitionStatus}`,
            (state) => `sui_hover_card_popup-size_${state.size}`,
            (state) => `sui_hover_card_popup-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_popup-outlined",
            (state) => state.open && "sui_hover_card_popup-open",
            (state) => state.instant && "sui_hover_card_popup-instant",
            (state) => `sui_hover_card_popup-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_hover_card_popup-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { HoverCardPopup as Popup };
export namespace Popup {
  export type State = HoverCardPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardPopupProps.Render;

    export type SuruUI = HoverCardPopupProps.SuruUI;

    export type BaseUI = HoverCardPopupProps.BaseUI;

    export type HTML = HoverCardPopupProps.HTML;
  }
}
