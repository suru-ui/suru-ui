import type { IComponent } from "../types.js";
import {
  type TooltipGroupRootProps,
  type TooltipGroupRootState,
  TooltipGroupRoot,
} from "./tooltip-group.parts.jsx";

// Types
// -----

/**
 * {@link TooltipGroup} が持つ状態です。
 */
export type TooltipGroupState = TooltipGroupRootState;

/**
 * {@link TooltipGroup} に渡す props です。
 */
export type TooltipGroupProps = TooltipGroupRootProps;

// API
// ---

/**
 * {@link TooltipGroup} を構成する各パーツの props を作成するための API です。
 */
export interface TooltipGroupAPI {
  /**
   * {@link TooltipGroupRoot} に渡す props を取得します。
   */
  getRootProps(): TooltipGroupRootProps;
}

interface IUseTooltipGroupAPI {
  /**
   * {@link TooltipGroupAPI} を作成します。
   *
   * @param props {@link TooltipGroup} の props です。
   * @returns ツールチップグループの API です
   */
  (props: TooltipGroupProps): TooltipGroupAPI;
}

/**
 * {@link TooltipGroupAPI} を作成するフックです。
 */
export const useTooltipGroupAPI: IUseTooltipGroupAPI = function useSuiTooltipGroupAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type TooltipGroupAPI as API, useTooltipGroupAPI as useAPI };

// Component
// ---------

/**
 * 複数のツールチップで開閉の遅延を共有するグループです。
 *
 * 近接したツールチップを続けて表示するとき、先に表示したツールチップが閉じてから一定時間内であれば、次のツールチップをすぐに表示します。
 */
export const TooltipGroup: IComponent<TooltipGroupProps> = function SuiTooltipGroup(props) {
  const api = useTooltipGroupAPI(props);

  return <TooltipGroupRoot {...api.getRootProps()} />;
};

export namespace TooltipGroup {
  export type State = TooltipGroupState;

  export type Props = TooltipGroupProps;
}
