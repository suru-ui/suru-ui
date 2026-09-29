import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link TooltipPositioner} が持つ状態です。
 */
export type TooltipPositionerState = Tooltip.Positioner.State;

export namespace TooltipPositionerProps {
  export type Render = RenderProps<TooltipPositionerState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Tooltip.Positioner>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TooltipPositionerProps:
      | "side"
      // UseAnchorPositioningSharedParameters:
      | "align"
      | "anchor"
      | "sticky"
      | "sideOffset"
      | "alignOffset"
      | "arrowPadding"
      | "positionMethod"
      | "collisionPadding"
      | "collisionBoundary"
      | "collisionAvoidance"
      | "disableAnchorTracking",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Tooltip.Positioner>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TooltipPositioner} に渡す props です。
 */
export type TooltipPositionerProps = TooltipPositionerProps.Render &
  TooltipPositionerProps.SuruUI &
  TooltipPositionerProps.BaseUI &
  TooltipPositionerProps.HTML;

export type ITooltipPositioner = IComponent<TooltipPositionerProps>;

/**
 * トリガーを基準にポップアップを配置する要素です。
 */
export const TooltipPositioner: ITooltipPositioner = function SuiTooltipPositioner(props) {
  const { className, positionMethod = "fixed", ...otherProps } = props;

  return (
    <Tooltip.Positioner
      {...otherProps}
      className={cn(className, "sui_tooltip_positioner")}
      positionMethod={positionMethod}
    />
  );
};

export { TooltipPositioner as Positioner };

export namespace Positioner {
  export type State = TooltipPositionerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipPositionerProps.Render;

    export type SuruUI = TooltipPositionerProps.SuruUI;

    export type BaseUI = TooltipPositionerProps.BaseUI;

    export type HTML = TooltipPositionerProps.HTML;
  }
}
