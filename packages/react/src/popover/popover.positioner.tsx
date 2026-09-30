import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type PopoverContext, usePopoverContext } from "./popover.context.js";

/**
 * {@link PopoverPositioner} が持つ状態です。
 */
export type PopoverPositionerState = Override<PopoverContext, Popover.Positioner.State>;

export namespace PopoverPositionerProps {
  export type Render = RenderProps<PopoverPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Positioner>,
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
    React.ComponentProps<typeof Popover.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverPositioner} に渡す props です。
 */
export type PopoverPositionerProps = PopoverPositionerProps.Render &
  PopoverPositionerProps.SuruUI &
  PopoverPositionerProps.BaseUI &
  PopoverPositionerProps.HTML;

export type IPopoverPositioner = IComponent<PopoverPositionerProps>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const PopoverPositioner: IPopoverPositioner = function SuiPopoverPositioner(props) {
  const ctx = usePopoverContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Positioner
      {...otherProps}
      {...proxyRenderProps<Popover.Positioner.State, PopoverPositionerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_popover_positioner"),
        },
      )}
    />
  );
};

export { PopoverPositioner as Positioner };

export namespace Positioner {
  export type State = PopoverPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverPositionerProps.Render;

    export type SuruUI = PopoverPositionerProps.SuruUI;

    export type BaseUI = PopoverPositionerProps.BaseUI;

    export type HTML = PopoverPositionerProps.HTML;
  }
}
