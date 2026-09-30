import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type HoverCardContext, useHoverCardContext } from "./hover-card.context.js";

/**
 * {@link HoverCardPositioner} が持つ状態です。
 */
export type HoverCardPositionerState = Override<HoverCardContext, PreviewCard.Positioner.State>;

export namespace HoverCardPositionerProps {
  export type Render = RenderProps<HoverCardPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // UseAnchorPositioningSharedParameters:
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
      | "collisionAvoidance",
      keyof Render | keyof SuruUI
    >
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
          render,
          className: cn(className, "sui_hover_card_positioner"),
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
