import { Tooltip } from "@base-ui/react/tooltip";
import type * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

// Root
// ----

/**
 * {@link TooltipGroupRoot} が持つ状態です。
 */
export type TooltipGroupRootState = Tooltip.Provider.State;

export namespace TooltipGroupRootProps {
  export type Render = RenderProps<TooltipGroupRootState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Tooltip.Provider.Props,
    keyof Render | keyof React.ComponentProps<"div">
  >;

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render>;
}

/**
 * {@link TooltipGroupRoot} に渡す props です。
 */
export type TooltipGroupRootProps = TooltipGroupRootProps.Render &
  TooltipGroupRootProps.SuruUI &
  TooltipGroupRootProps.BaseUI &
  TooltipGroupRootProps.HTML;

/**
 * 複数のツールチップで開閉の遅延を共有するルートです。
 *
 * 近接したツールチップを続けて表示するとき、先に表示したツールチップが閉じてから一定時間内であれば、次のツールチップをすぐに表示します。
 */
export const TooltipGroupRoot: IComponent<TooltipGroupRootProps> = function SuiTooltipGroupRoot(
  props,
) {
  return <Tooltip.Provider {...props} />;
};

export { TooltipGroupRoot as Root };

export namespace Root {
  export type State = TooltipGroupRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TooltipGroupRootProps.Render;

    export type SuruUI = TooltipGroupRootProps.SuruUI;

    export type BaseUI = TooltipGroupRootProps.BaseUI;

    export type HTML = TooltipGroupRootProps.HTML;
  }
}
