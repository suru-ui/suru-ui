import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type MeterRootSize,
  type MeterRootColor,
  type MeterRootProps,
  type MeterRootState,
  type MeterLabelProps,
  type MeterRootRadius,
  type MeterTrackProps,
  type MeterValueProps,
  type MeterRootVariant,
  type MeterIndicatorProps,
  MeterRoot,
  MeterLabel,
  MeterTrack,
  MeterValue,
  MeterIndicator,
} from "./meter.parts.jsx";

/**
 * {@link MeterRootColor} です。
 */
export type MeterColor = MeterRootColor;

/**
 * {@link MeterRootRadius} です。
 */
export type MeterRadius = MeterRootRadius;

/**
 * {@link MeterRootSize} です。
 */
export type MeterSize = MeterRootSize;

/**
 * {@link MeterRootVariant} です。
 */
export type MeterVariant = MeterRootVariant;

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
 * {@link Meter} の各パーツに渡すプロパティーです。
 */
export type MeterPartsProps = {
  /**
   * {@link MeterIndicator} に渡すプロパティーです。
   */
  readonly indicator: MeterIndicatorProps;

  /**
   * {@link MeterLabel} に渡すプロパティーです。
   *
   * これを表示しないときは null になります。
   */
  readonly label: MeterLabelProps | null;

  /**
   * {@link MeterRoot} に渡すプロパティーです。
   */
  readonly root: MeterRootProps;

  /**
   * {@link MeterTrack} に渡すプロパティーです。
   */
  readonly track: MeterTrackProps;

  /**
   * {@link MeterValue} に渡すプロパティーです。
   *
   * ラベルを指定したときは値も同時に表示されます。`slotProps.value` だけを渡しても値は表示されず、表示はラベルの指定に従います。
   *
   * これを表示しないときは null になります。
   */
  readonly value: MeterValueProps | null;
};

/**
 * {@link Meter} の状態です。
 */
export type MeterState = MeterRootState;

/**
 * {@link Meter} コンポーネントのプロパティーです。
 */
export type MeterProps = Omit<MeterRootProps, "children"> & {
  /**
   * ラベルです。
   *
   * 指定すると {@link MeterValue} も表示されます。
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
 * {@link Meter} の各パーツに渡すプロパティーを作るフックです。
 */
export function useMeter(props: MeterProps): MeterPartsProps {
  const {
    label,
    slotProps: {
      label: labelProps,
      track: trackProps = {},
      value: valueProps,
      indicator: indicatorProps = {},
    } = {},
    ...rootProps
  } = props;

  return {
    root: rootProps,
    label: "label" in props || !!labelProps ? { children: label, ...labelProps } : null,
    value: "label" in props || !!labelProps || !!valueProps ? { ...valueProps } : null,
    track: trackProps,
    indicator: indicatorProps,
  };
}

/**
 * 数値の範囲内にある現在値を表示するメーターコンポーネントです。
 */
export const Meter: IComponent<MeterProps> = function SuiMeter(props) {
  const partsProps = useMeter(props);

  return (
    <MeterRoot {...partsProps.root}>
      {partsProps.label && <MeterLabel {...partsProps.label} />}
      {partsProps.value && <MeterValue {...partsProps.value} />}
      <MeterTrack {...partsProps.track}>
        <MeterIndicator {...partsProps.indicator} />
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

  /**
   * {@link MeterColor} です。
   */
  export type Color = MeterColor;

  /**
   * {@link MeterRadius} です。
   */
  export type Radius = MeterRadius;

  /**
   * {@link MeterSize} です。
   */
  export type Size = MeterSize;

  /**
   * {@link MeterVariant} です。
   */
  export type Variant = MeterVariant;
}
