import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useHoverCardContext } from "../root/hover-card.root.context.js";
import { HoverCardPositionerContext } from "./hover-card.positioner.context.js";

/**
 * {@link HoverCardPositioner} が持つ状態です。
 */
export type HoverCardPositionerState = HoverCardPositionerContext;

export namespace HoverCardPositionerProps {
  export type Render = RenderProps<HoverCardPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof PreviewCard.Positioner>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters より:
      | "anchor"
      | "positionMethod"
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "collisionBoundary"
      | "collisionPadding"
      | "sticky"
      | "arrowPadding"
      | "disableAnchorTracking"
      | "collisionAvoidance"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardPositioner} に渡す props です。
 */
export type HoverCardPositionerProps = HoverCardPositionerProps.Render &
  HoverCardPositionerProps.SuruUI &
  HoverCardPositionerProps.BaseUI &
  HoverCardPositionerProps.HTML;

export type IHoverCardPositioner = IComponent<HoverCardPositionerProps>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const HoverCardPositioner: IHoverCardPositioner = function SuiHoverCardPositioner(props) {
  const ctx = useHoverCardContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <PreviewCard.Positioner
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Positioner.State, HoverCardPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <HoverCardPositionerContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </HoverCardPositionerContext>
          ),
          className: cn<HoverCardPositionerState>(
            className,
            "sui_hover_card_positioner",
            (state) => `sui_hover_card_positioner-size_${state.size}`,
            (state) => `sui_hover_card_positioner-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_positioner-outlined",
            (state) => state.open && "sui_hover_card_positioner-open",
            (state) => state.anchorHidden && "sui_hover_card_positioner-anchor_hidden",
            (state) => state.instant && "sui_hover_card_positioner-instant",
            (state) => `sui_hover_card_positioner-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_hover_card_positioner-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { HoverCardPositioner as Positioner };

export namespace Positioner {
  export type State = HoverCardPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardPositionerProps.Render;

    export type SuruUI = HoverCardPositionerProps.SuruUI;

    export type BaseUI = HoverCardPositionerProps.BaseUI;

    export type HTML = HoverCardPositionerProps.HTML;
  }
}
