import { Tooltip } from "@base-ui/react/tooltip";

import type { IComponent } from "../types.js";

// Root
// ----

/**
 * {@link TooltipGroupRoot} が持つ状態です。
 */
export type TooltipGroupRootState = Tooltip.Provider.State;

/**
 * {@link TooltipGroupRoot} に渡す props です。
 */
export type TooltipGroupRootProps = Tooltip.Provider.Props;

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
  /**
   * {@link TooltipGroupRootState}
   */
  export type State = TooltipGroupRootState;

  /**
   * {@link TooltipGroupRootProps}
   */
  export type Props = TooltipGroupRootProps;
}
