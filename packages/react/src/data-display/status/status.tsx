import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type StatusRootSize,
  type StatusRootColor,
  type StatusRootProps,
  type StatusRootState,
  type StatusIndicatorProps,
  StatusRoot,
  StatusIndicator,
} from "./status.parts.jsx";

/**
 * {@link StatusRootColor} です。
 */
export type StatusColor = StatusRootColor;

/**
 * {@link StatusRootSize} です。
 */
export type StatusSize = StatusRootSize;

/**
 * {@link Status} の各パーツに渡すプロパティーです。
 */
export type StatusSlotProps = {
  /**
   * {@link StatusIndicator} に渡すプロパティーです。
   */
  readonly indicator?: StatusIndicatorProps | undefined;
};

/**
 * {@link Status} の各パーツに渡すプロパティーです。
 */
export type StatusPartsProps = {
  /**
   * {@link StatusIndicator} に渡すプロパティーです。
   */
  readonly indicator: StatusIndicatorProps;

  /**
   * {@link StatusRoot} に渡すプロパティーです。
   */
  readonly root: StatusRootProps;
};

/**
 * {@link Status} の状態です。
 */
export type StatusState = StatusRootState;

/**
 * {@link Status} コンポーネントのプロパティーです。
 */
export type StatusProps = Omit<StatusRootProps, "children"> & {
  /**
   * ステータスのラベルです。
   *
   * インジケーターの後に表示します。スクリーンリーダーの利用者にも状態が伝わるように、視覚的に隠したテキストを含めてください。
   */
  children?: React.ReactNode;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: StatusSlotProps | undefined;
};

/**
 * {@link Status} の各パーツに渡すプロパティーを作るフックです。
 */
export function useStatus(props: StatusProps): StatusPartsProps {
  const { slotProps: { indicator: indicatorProps = {} } = {}, ...rootProps } = props;

  return {
    root: rootProps,
    indicator: indicatorProps,
  };
}

/**
 * 状態を示すドットとラベルを並べて表示するステータスコンポーネントです。
 *
 * `color` プロパティーでドットの色を、`processing` プロパティーで処理中を示すアニメーションを指定できます。
 */
export const Status: IComponent<StatusProps> = function SuiStatus(props) {
  const { children } = props;
  const partsProps = useStatus(props);

  return (
    <StatusRoot {...partsProps.root}>
      <StatusIndicator {...partsProps.indicator} />
      {children}
    </StatusRoot>
  );
};

/**
 * {@link Status} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Status {
  /**
   * {@link StatusState} です。
   */
  export type State = StatusState;

  /**
   * {@link StatusProps} です。
   */
  export type Props = StatusProps;

  /**
   * {@link StatusSlotProps} です。
   */
  export type SlotProps = StatusSlotProps;

  /**
   * {@link StatusColor} です。
   */
  export type Color = StatusColor;

  /**
   * {@link StatusSize} です。
   */
  export type Size = StatusSize;
}
