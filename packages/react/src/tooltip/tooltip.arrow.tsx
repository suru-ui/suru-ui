import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link TooltipArrow} が持つ状態です。
 */
export type TooltipArrowState = Tooltip.Arrow.State;

export namespace TooltipArrowProps {
  export type Render = RenderProps<TooltipArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Tooltip.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TooltipArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Tooltip.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TooltipArrow} に渡す props です。
 */
export type TooltipArrowProps = TooltipArrowProps.Render &
  TooltipArrowProps.SuruUI &
  TooltipArrowProps.BaseUI &
  TooltipArrowProps.HTML;

export type ITooltipArrow = IComponent<TooltipArrowProps>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const TooltipArrow: ITooltipArrow = function SuiTooltipArrow(props) {
  const { className, ...otherProps } = props;

  return (
    <Tooltip.Arrow
      {...otherProps}
      className={cn(
        className,
        "sui_tooltip_arrow",
        (state) => `sui_tooltip_arrow-side_${state.side}`,
      )}
    />
  );
};

export { TooltipArrow as Arrow };

export namespace Arrow {
  export type State = TooltipArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipArrowProps.Render;

    export type SuruUI = TooltipArrowProps.SuruUI;

    export type BaseUI = TooltipArrowProps.BaseUI;

    export type HTML = TooltipArrowProps.HTML;
  }
}
