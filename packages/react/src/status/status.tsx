import type * as React from "react";

import type { IComponent } from "../types.js";
import {
  type StatusRootSize,
  type StatusRootColor,
  type StatusRootProps,
  type StatusRootState,
  type StatusIndicatorProps,
  StatusRoot,
  StatusIndicator,
} from "./status.parts.jsx";

// Types
// -----

/**
 * {@link StatusRootColor}
 */
export type StatusColor = StatusRootColor;

/**
 * {@link StatusRootSize}
 */
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
   *
   * 各パーツの props が優先されます。
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
  /**
   * {@link StatusState}
   */
  export type State = StatusState;

  /**
   * {@link StatusProps}
   */
  export type Props = StatusProps;

  /**
   * {@link StatusSlotProps}
   */
  export type SlotProps = StatusSlotProps;

  /**
   * {@link StatusColor}
   */
  export type Color = StatusColor;

  /**
   * {@link StatusSize}
   */
  export type Size = StatusSize;
}
