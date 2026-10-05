import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type PopoverContext, usePopoverContext } from "../root/popover.root.context.js";

/**
 * {@link PopoverBackdrop} が持つ状態です。
 */
export type PopoverBackdropState = Override<PopoverContext, Popover.Backdrop.State>;

export namespace PopoverBackdropProps {
  export type Render = RenderProps<PopoverBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverBackdrop} に渡す props です。
 */
export type PopoverBackdropProps = PopoverBackdropProps.Render &
  PopoverBackdropProps.SuruUI &
  PopoverBackdropProps.BaseUI &
  PopoverBackdropProps.HTML;

export type IPopoverBackdrop = IComponent<PopoverBackdropProps>;

/**
 * ポップアップの背後に表示されるオーバーレイ要素です。
 */
export const PopoverBackdrop: IPopoverBackdrop = function SuiPopoverBackdrop(props) {
  const ctx = usePopoverContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Backdrop
      {...otherProps}
      {...proxyRenderProps<Popover.Backdrop.State, PopoverBackdropState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<PopoverBackdropState>(
            className,
            "sui_popover_backdrop",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_popover_backdrop-transition_status_${state.transitionStatus}`,
            (state) => `sui_popover_backdrop-size_${state.size}`,
            (state) => `sui_popover_backdrop-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_backdrop-outlined",
            (state) => state.open && "sui_popover_backdrop-open",
          ),
        },
      )}
    />
  );
};

export { PopoverBackdrop as Backdrop };

export namespace Backdrop {
  export type State = PopoverBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverBackdropProps.Render;

    export type SuruUI = PopoverBackdropProps.SuruUI;

    export type BaseUI = PopoverBackdropProps.BaseUI;

    export type HTML = PopoverBackdropProps.HTML;
  }
}
