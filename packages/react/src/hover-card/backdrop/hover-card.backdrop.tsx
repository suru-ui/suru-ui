import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useHoverCardContext } from "../root/hover-card.root.context.js";
import { HoverCardBackdropContext } from "./hover-card.backdrop.context.js";

/**
 * {@link HoverCardBackdrop} が持つ状態です。
 */
export type HoverCardBackdropState = HoverCardBackdropContext;

export namespace HoverCardBackdropProps {
  export type Render = RenderProps<HoverCardBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof PreviewCard.Backdrop>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PreviewCardBackdropProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Backdrop>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link HoverCardBackdrop} に渡す props です。
 */
export type HoverCardBackdropProps = HoverCardBackdropProps.Render &
  HoverCardBackdropProps.SuruUI &
  HoverCardBackdropProps.BaseUI &
  HoverCardBackdropProps.HTML;

export type IHoverCardBackdrop = IComponent<HoverCardBackdropProps>;

/** ポップアップの背後に表示されるオーバーレイ要素です。 */
export const HoverCardBackdrop: IHoverCardBackdrop = (props) => {
  const ctx = useHoverCardContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <PreviewCard.Backdrop
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Backdrop.State, HoverCardBackdropState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <HoverCardBackdropContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </HoverCardBackdropContext>
          ),
          className: cn<HoverCardBackdropState>(
            className,
            "sui_hover_card_backdrop",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_hover_card_backdrop-transition_status_${state.transitionStatus}`,
            (state) => `sui_hover_card_backdrop-size_${state.size}`,
            (state) => `sui_hover_card_backdrop-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_backdrop-outlined",
            (state) => state.open && "sui_hover_card_backdrop-open",
          ),
        },
      )}
    />
  );
};

export { HoverCardBackdrop as Backdrop };
export namespace Backdrop {
  export type State = HoverCardBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardBackdropProps.Render;

    export type SuruUI = HoverCardBackdropProps.SuruUI;

    export type BaseUI = HoverCardBackdropProps.BaseUI;

    export type HTML = HoverCardBackdropProps.HTML;
  }
}
