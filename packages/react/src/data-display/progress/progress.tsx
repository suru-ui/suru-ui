import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type ProgressRootSize,
  type ProgressRootColor,
  type ProgressRootProps,
  type ProgressRootState,
  type ProgressLabelProps,
  type ProgressRootRadius,
  type ProgressTrackProps,
  type ProgressValueProps,
  type ProgressRootVariant,
  type ProgressIndicatorProps,
  ProgressRoot,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
  ProgressIndicator,
} from "./progress.parts.jsx";

/**
 * {@link ProgressRootColor} です。
 */
export type ProgressColor = ProgressRootColor;

/**
 * {@link ProgressRootRadius} です。
 */
export type ProgressRadius = ProgressRootRadius;

/**
 * {@link ProgressRootSize} です。
 */
export type ProgressSize = ProgressRootSize;

/**
 * {@link ProgressRootVariant} です。
 */
export type ProgressVariant = ProgressRootVariant;

/**
 * {@link Progress} の各パーツに渡すプロパティーです。
 */
export type ProgressSlotProps = {
  /**
   * {@link ProgressIndicator} に渡すプロパティーです。
   */
  readonly indicator?: ProgressIndicatorProps | undefined;

  /**
   * {@link ProgressLabel} に渡すプロパティーです。
   */
  readonly label?: ProgressLabelProps | undefined;

  /**
   * {@link ProgressTrack} に渡すプロパティーです。
   */
  readonly track?: ProgressTrackProps | undefined;

  /**
   * {@link ProgressValue} に渡すプロパティーです。
   */
  readonly value?: ProgressValueProps | undefined;
};

/**
 * {@link Progress} の状態です。
 */
export type ProgressState = ProgressRootState;

/**
 * {@link Progress} コンポーネントのプロパティーです。
 */
export type ProgressProps = Omit<ProgressRootProps, "children"> & {
  /**
   * ラベルです。
   */
  label?: ProgressLabelProps["children"];

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: ProgressSlotProps | undefined;
};

/**
 * 時間のかかる処理の進捗を表示するコンポーネントです。
 */
export const Progress: IComponent<ProgressProps> = function SuiProgress(props) {
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
    <ProgressRoot {...rootProps}>
      {("label" in props || !!labelProps) && <ProgressLabel children={label} {...labelProps} />}
      {("label" in props || !!valueProps) && <ProgressValue {...valueProps} />}
      <ProgressTrack {...trackProps}>
        <ProgressIndicator {...indicatorProps} />
      </ProgressTrack>
    </ProgressRoot>
  );
};

/**
 * {@link Progress} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Progress {
  /**
   * {@link ProgressState} です。
   */
  export type State = ProgressState;

  /**
   * {@link ProgressProps} です。
   */
  export type Props = ProgressProps;

  /**
   * {@link ProgressSlotProps} です。
   */
  export type SlotProps = ProgressSlotProps;

  /**
   * {@link ProgressColor} です。
   */
  export type Color = ProgressColor;

  /**
   * {@link ProgressRadius} です。
   */
  export type Radius = ProgressRadius;

  /**
   * {@link ProgressSize} です。
   */
  export type Size = ProgressSize;

  /**
   * {@link ProgressVariant} です。
   */
  export type Variant = ProgressVariant;
}
