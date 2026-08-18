import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type MeterRootProps,
  type MeterRootState,
  type MeterLabelProps,
  type MeterTrackProps,
  type MeterValueProps,
  type MeterIndicatorProps,
  MeterRoot,
  MeterLabel,
  MeterTrack,
  MeterValue,
  MeterIndicator,
} from "./meter.parts.jsx";

/**
 * {@link Meter} の各パーツに渡すプロパティーです。
 */
export type MeterSlotProps = {
  /**
   * {@link MeterIndicator} に渡すプロパティーです。
   */
  readonly indicator?: MeterIndicatorProps | undefined;

  /**
   * {@link MeterLabel} に渡すプロパティーです。
   */
  readonly label?: MeterLabelProps | undefined;

  /**
   * {@link MeterTrack} に渡すプロパティーです。
   */
  readonly track?: MeterTrackProps | undefined;

  /**
   * {@link MeterValue} に渡すプロパティーです。
   */
  readonly value?: MeterValueProps | undefined;
};

/**
 * {@link Meter} の状態です。
 */
export type MeterState = MeterRootState;

/**
 * {@link Meter} コンポーネントのプロパティーです。
 */
export type MeterProps = MeterRootProps & {
  /**
   * ラベルです。
   */
  label?: MeterLabelProps["children"];

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: MeterSlotProps | undefined;
};

/**
 * 数値の範囲内にある現在値を表示するメーターコンテキストです。
 */
export const Meter: IComponent<MeterProps> = function SuiMeter(props) {
  const {
    label,
    slotProps: {
      label: labelProps,
      track: trackProps,
      value: valueProps,
      indicator: indicatorProps,
    } = {},
    ...rootProps
  } = props;

  return (
    <MeterRoot {...rootProps}>
      {("label" in props || !!labelProps) && <MeterLabel {...{ children: label, ...labelProps }} />}
      {("label" in props || !!valueProps) && <MeterValue {...valueProps} />}
      <MeterTrack {...trackProps}>
        <MeterIndicator {...indicatorProps} />
      </MeterTrack>
    </MeterRoot>
  );
};

/**
 * {@link Meter} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Meter {
  /**
   * {@link MeterState} です。
   */
  export type State = MeterState;

  /**
   * {@link MeterProps} です。
   */
  export type Props = MeterProps;

  /**
   * {@link MeterSlotProps} です。
   */
  export type SlotProps = MeterSlotProps;
}
