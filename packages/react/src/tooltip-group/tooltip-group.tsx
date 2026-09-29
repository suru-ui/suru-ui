import type { IComponent } from "../types.js";
import {
  type TooltipGroupRootProps,
  type TooltipGroupRootState,
  TooltipGroupRoot,
} from "./tooltip-group.parts.js";

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

export type ITooltipGroup = IComponent<TooltipGroupProps>;

// API
// ---

/**
 * {@link TooltipGroup} を構成する各パーツの props を作成するための API です。
 */
export class TooltipGroupAPI {
  private readonly rootProps: TooltipGroupRootProps;

  /**
   * @param props {@link TooltipGroup} の props です。
   * @internal
   */
  public constructor(props: TooltipGroupProps) {
    this.rootProps = props;
  }

  /**
   * {@link TooltipGroupRoot} に渡す props を取得します。
   */
  public getRootProps(): TooltipGroupRootProps {
    return this.rootProps;
  }
}

export interface IUseTooltipGroupAPI {
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
  return new TooltipGroupAPI(props);
};

export { TooltipGroupAPI as API, useTooltipGroupAPI as useAPI };

// Component
// ---------

/**
 * 複数のツールチップで開閉の遅延を共有するグループです。
 *
 * 近接したツールチップを続けて表示するとき、先に表示したツールチップが閉じてから一定時間内であれば、次のツールチップをすぐに表示します。それ自身は HTML 要素をレンダリングしません。
 */
export const TooltipGroup: ITooltipGroup = function SuiTooltipGroup(props) {
  const api = useTooltipGroupAPI(props);

  return <TooltipGroupRoot {...api.getRootProps()} />;
};

export namespace TooltipGroup {
  export type State = TooltipGroupState;

  export type Props = TooltipGroupProps;
}
