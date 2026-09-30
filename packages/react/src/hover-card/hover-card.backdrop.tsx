import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type HoverCardContext, useHoverCardContext } from "./hover-card.context.js";

/**
 * {@link HoverCardBackdrop} が持つ状態です。
 */
export type HoverCardBackdropState = Override<HoverCardContext, PreviewCard.Backdrop.State>;

export namespace HoverCardBackdropProps {
  export type Render = RenderProps<HoverCardBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 */
export const HoverCardBackdrop: IHoverCardBackdrop = function SuiHoverCardBackdrop(props) {
  const ctx = useHoverCardContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <PreviewCard.Backdrop
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Backdrop.State, HoverCardBackdropState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<HoverCardBackdropState>(
            className,
            "sui_hover_card_backdrop",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_hover_card_backdrop-transition_status_${state.transitionStatus}`,
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
