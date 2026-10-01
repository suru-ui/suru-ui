import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PopoverContext, usePopoverContext } from "./popover.context.js";

/**
 * {@link PopoverContent} が持つ状態です。
 */
export type PopoverContentState = Override<PopoverContext, Popover.Popup.State>;

export namespace PopoverContentProps {
  export type Render = RenderProps<PopoverContentState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverContentProps:
      "initialFocus" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverContent} に渡す props です。
 */
export type PopoverContentProps = PopoverContentProps.Render &
  PopoverContentProps.SuruUI &
  PopoverContentProps.BaseUI &
  PopoverContentProps.HTML;

export type IPopoverContent = IComponent<PopoverContentProps>;

/**
 * ポップオーバーの内容を表示するポップアップ要素です。
 */
export const PopoverContent: IPopoverContent = function SuiPopoverContent(props) {
  const ctx = usePopoverContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Popup
      {...otherProps}
      {...proxyRenderProps<Popover.Popup.State, PopoverContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<PopoverContentState>(
            className,
            "sui_popover_content",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_popover_content-transition_status_${state.transitionStatus}`,
            (state) => `sui_popover_content-size_${state.size}`,
            (state) => `sui_popover_content-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_content-outlined",
          ),
        },
      )}
    />
  );
};

export { PopoverContent as Content };

export namespace Content {
  export type State = PopoverContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverContentProps.Render;

    export type SuruUI = PopoverContentProps.SuruUI;

    export type BaseUI = PopoverContentProps.BaseUI;

    export type HTML = PopoverContentProps.HTML;
  }
}
