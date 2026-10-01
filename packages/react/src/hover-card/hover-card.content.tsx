import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type HoverCardContext, useHoverCardContext } from "./hover-card.context.js";

/**
 * {@link HoverCardContent} が持つ状態です。
 */
export type HoverCardContentState = Override<HoverCardContext, PreviewCard.Popup.State>;

export namespace HoverCardContentProps {
  export type Render = RenderProps<HoverCardContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof PreviewCard.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PreviewCardPopupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardContent} に渡す props です。
 */
export type HoverCardContentProps = HoverCardContentProps.Render &
  HoverCardContentProps.SuruUI &
  HoverCardContentProps.BaseUI &
  HoverCardContentProps.HTML;

export type IHoverCardContent = IComponent<HoverCardContentProps>;

/**
 * ホバーカードの内容を表示するポップアップ要素です。
 */
export const HoverCardContent: IHoverCardContent = function SuiHoverCardContent(props) {
  const ctx = useHoverCardContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <PreviewCard.Popup
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Popup.State, HoverCardContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<HoverCardContentState>(
            className,
            "sui_hover_card_content",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_hover_card_content-transition_status_${state.transitionStatus}`,
            (state) => `sui_hover_card_content-size_${state.size}`,
            (state) => `sui_hover_card_content-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_content-outlined",
            (state) => state.open && "sui_hover_card_content-open",
            (state) => state.instant && "sui_hover_card_content-instant",
            (state) => `sui_hover_card_content-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_hover_card_content-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { HoverCardContent as Content };

export namespace Content {
  export type State = HoverCardContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardContentProps.Render;

    export type SuruUI = HoverCardContentProps.SuruUI;

    export type BaseUI = HoverCardContentProps.BaseUI;

    export type HTML = HoverCardContentProps.HTML;
  }
}
