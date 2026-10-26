import { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopupContext } from "../popup/hover-card.popup.context.js";
import { HoverCardArrowContext } from "./hover-card.arrow.context.js";

/**
 * {@link HoverCardArrow} が持つ状態です。
 */
export type HoverCardArrowState = HoverCardArrowContext;

export namespace HoverCardArrowProps {
  export type Render = RenderProps<HoverCardArrowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof PreviewCard.Arrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PreviewCardArrowProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof PreviewCard.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link HoverCardArrow} に渡す props です。
 */
export type HoverCardArrowProps = HoverCardArrowProps.Render &
  HoverCardArrowProps.SuruUI &
  HoverCardArrowProps.BaseUI &
  HoverCardArrowProps.HTML;

export type IHoverCardArrow = IComponent<HoverCardArrowProps>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const HoverCardArrow: IHoverCardArrow = function SuiHoverCardArrow(props) {
  const ctx = usePopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <PreviewCard.Arrow
      {...otherProps}
      {...proxyRenderProps<PreviewCard.Arrow.State, HoverCardArrowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <HoverCardArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </HoverCardArrowContext>
          ),
          className: cn<HoverCardArrowState>(
            className,
            "sui_hover_card_arrow",
            (state) => `sui_hover_card_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_hover_card_arrow-size_${state.size}`,
            (state) => `sui_hover_card_arrow-radius_${state.radius}`,
            (state) => state.outlined && "sui_hover_card_arrow-outlined",
            (state) => state.open && "sui_hover_card_arrow-open",
            (state) => state.uncentered && "sui_hover_card_arrow-uncentered",
            (state) => `sui_hover_card_arrow-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { HoverCardArrow as Arrow };

export namespace Arrow {
  export type State = HoverCardArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = HoverCardArrowProps.Render;

    export type SuruUI = HoverCardArrowProps.SuruUI;

    export type BaseUI = HoverCardArrowProps.BaseUI;

    export type HTML = HoverCardArrowProps.HTML;
  }
}
