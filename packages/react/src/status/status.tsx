import type { IComponent } from "../types.js";
import {
  type StatusRootSize,
  type StatusRootColor,
  type StatusRootProps,
  type StatusRootState,
  type StatusIndicatorProps,
  type StatusRootRippleSize,
  StatusRoot,
  StatusIndicator,
} from "./status.parts.jsx";

// Types
// -----

export type StatusColor = StatusRootColor;

export type StatusRippleSize = StatusRootRippleSize;

export type StatusSize = StatusRootSize;

/**
 * {@link Status} の各パーツに渡す props です。
 */
export type StatusSlotProps = {
  /**
   * {@link StatusIndicator} に渡す props です。
   */
  readonly indicator?: Omit<StatusIndicatorProps, "children"> | undefined;
};

/**
 * {@link Status} が持つ状態です。
 */
export type StatusState = StatusRootState;

/**
 * {@link Status} に渡す props です。
 */
export type StatusProps = StatusRootProps & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: StatusSlotProps | undefined;
};

// API
// ---

/**
 * {@link Status} を構成する各パーツの props を作成するための API です。
 */
export interface StatusAPI {
  /**
   * {@link StatusIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): StatusIndicatorProps;

  /**
   * {@link StatusRoot} に渡す props を取得します。
   */
  getRootProps(): StatusRootProps;
}

interface IUseStatusAPI {
  /**
   * {@link StatusAPI} を作成します。
   *
   * @param props {@link Status} の props です。
   * @returns ステータスの API です
   */
  (props: StatusProps): StatusAPI;
}

/**
 * {@link StatusAPI} を作成するフックです。
 */
export const useStatusAPI: IUseStatusAPI = function useSuiStatusAPI(props) {
  const { slotProps: { indicator: indicatorProps = {} } = {}, ...rootProps } = props;

  return {
    getRootProps() {
      return rootProps;
    },
    getIndicatorProps() {
      return indicatorProps;
    },
  };
};

export { type StatusAPI as API, useStatusAPI as useAPI };

// Component
// ---------

/**
 * 状態を示すドットとラベルを並べて表示するコンポーネントです。
 */
export const Status: IComponent<StatusProps> = function SuiStatus(props) {
  const api = useStatusAPI(props);
  const rootProps = api.getRootProps();

  return (
    <StatusRoot {...rootProps}>
      <StatusIndicator {...api.getIndicatorProps()} />
      {rootProps.children}
    </StatusRoot>
  );
};

export namespace Status {
  export type State = StatusState;

  export type Props = StatusProps;

  export type SlotProps = StatusSlotProps;

  export type Color = StatusColor;

  export type RippleSize = StatusRippleSize;

  export type Size = StatusSize;
}
