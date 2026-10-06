import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useHoverCardContext } from "../root/hover-card.root.context.js";
import { HoverCardViewportContext } from "./hover-card.viewport.context.js";

/**
 * {@link HoverCardViewport} が持つ状態です。
 */
export type HoverCardViewportState = HoverCardViewportContext;

export namespace HoverCardViewportProps {
  export type Render = RenderProps<HoverCardViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof PreviewCard.Viewport>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PreviewCardViewportProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardViewport} に渡す props です。
 */
export type HoverCardViewportProps = HoverCardViewportProps.Render &
  HoverCardViewportProps.SuruUI &
  HoverCardViewportProps.BaseUI &
  HoverCardViewportProps.HTML;

export type IHoverCardViewport = IComponent<HoverCardViewportProps>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのホバーカードを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const HoverCardViewport: IHoverCardViewport = function SuiHoverCardViewport(props) {
  const ctx = useHoverCardContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <PreviewCard.Viewport
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Viewport.State, HoverCardViewportState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <HoverCardViewportContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </HoverCardViewportContext>
          ),
          className: cn<HoverCardViewportState>(
            className,
            "sui_hover_card_viewport",
            (state) => `sui_hover_card_viewport-size_${state.size}`,
            (state) => `sui_hover_card_viewport-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_viewport-outlined",
            (state) => state.instant && "sui_hover_card_viewport-instant",
            (state) => state.transitioning && "sui_hover_card_viewport-transitioning",
            (state) =>
              state.activationDirection !== undefined &&
              `sui_hover_card_viewport-activation_direction_${state.activationDirection}`,
          ),
        },
      )}
    />
  );
};

export { HoverCardViewport as Viewport };

export namespace Viewport {
  export type State = HoverCardViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardViewportProps.Render;

    export type SuruUI = HoverCardViewportProps.SuruUI;

    export type BaseUI = HoverCardViewportProps.BaseUI;

    export type HTML = HoverCardViewportProps.HTML;
  }
}
