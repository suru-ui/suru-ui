import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopoverContentContext } from "../content/popover.content.context.js";
import { PopoverViewportContext } from "./popover.viewport.context.js";

/**
 * {@link PopoverViewport} が持つ状態です。
 */
export type PopoverViewportState = PopoverViewportContext;

export namespace PopoverViewportProps {
  export type Render = RenderProps<PopoverViewportState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Popover.Viewport>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // PopoverViewportProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverViewport} に渡す props です。
 */
export type PopoverViewportProps = PopoverViewportProps.Render &
  PopoverViewportProps.SuruUI &
  PopoverViewportProps.BaseUI &
  PopoverViewportProps.HTML;

export type IPopoverViewport = IComponent<PopoverViewportProps>;

/**
 * 複数のトリガー間で内容を切り替えるときのアニメーション領域です。
 *
 * 1 つのポップオーバーを複数のトリガーで共有し、内容をトリガーごとに変える場合に使います。
 */
export const PopoverViewport: IPopoverViewport = function SuiPopoverViewport(props) {
  const ctx = usePopoverContentContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Viewport
      {...otherProps}
      {...proxyRenderProps<Popover.Viewport.State, PopoverViewportState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <PopoverViewportContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </PopoverViewportContext>
          ),
          className: cn<PopoverViewportState>(
            className,
            "sui_popover_viewport",
            (state) => `sui_popover_viewport-size_${state.size}`,
            (state) => `sui_popover_viewport-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_viewport-outlined",
            (state) => state.open && "sui_popover_viewport-open",
            (state) => state.anchorHidden && "sui_popover_viewport-anchor_hidden",
            (state) => `sui_popover_viewport-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_popover_viewport-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_popover_viewport-transition_status_${state.transitionStatus}`,
            (state) => state.instant && "sui_popover_viewport-instant",
            (state) => state.transitioning && "sui_popover_viewport-transitioning",
            (state) =>
              state.activationDirection !== undefined &&
              `sui_popover_viewport-activation_direction_${state.activationDirection}`,
          ),
        },
      )}
    />
  );
};

export { PopoverViewport as Viewport };

export namespace Viewport {
  export type State = PopoverViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverViewportProps.Render;

    export type SuruUI = PopoverViewportProps.SuruUI;

    export type BaseUI = PopoverViewportProps.BaseUI;

    export type HTML = PopoverViewportProps.HTML;
  }
}
