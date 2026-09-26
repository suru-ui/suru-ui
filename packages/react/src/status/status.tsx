import * as React from "react";

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
} from "./status.parts.js";

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
  readonly indicator?: StatusIndicatorProps | undefined;
};

/**
 * {@link Status} が持つ状態です。
 */
export type StatusState = StatusRootState;

namespace StatusProps {
  export type Root = Omit<StatusRootProps, keyof Status>;

  export type Status = {
    /**
     * ステータスに表示するラベルです。
     */
    children?: React.ReactNode | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: StatusSlotProps | undefined;
  };
}

/**
 * {@link Status} に渡す props です。
 */
export type StatusProps = StatusProps.Status & StatusProps.Root;

// API
// ---

/**
 * {@link Status} を構成する各パーツの props を作成するための API です。
 */
export class StatusAPI {
  private readonly rootProps: StatusProps.Root;

  private readonly slotProps: StatusSlotProps;

  private readonly statusProps: Required<Omit<StatusProps.Status, "slotProps">>;

  /**
   * @param props {@link Status} の props です。
   * @internal
   */
  public constructor(props: StatusProps) {
    const { children, slotProps = {}, ...rootProps } = props;
    this.statusProps = { children };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link StatusIndicator} に渡す props を取得します。
   */
  public getIndicatorProps(): StatusIndicatorProps {
    const { indicator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * ラベルとして表示する内容を取得します。
   */
  public getLabel(): React.ReactNode {
    return this.statusProps.children;
  }

  /**
   * {@link StatusRoot} に渡す props を取得します。
   */
  public getRootProps(): StatusProps.Root {
    return this.rootProps;
  }
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
  return new StatusAPI(props);
};

export { StatusAPI as API, useStatusAPI as useAPI };

// Component
// ---------

/**
 * 状態を示すドットとラベルを並べて表示するコンポーネントです。
 */
export const Status: IComponent<StatusProps> = function SuiStatus(props) {
  const api = useStatusAPI(props);

  return (
    <StatusRoot {...api.getRootProps()}>
      <StatusIndicator {...api.getIndicatorProps()} />
      {api.getLabel()}
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
