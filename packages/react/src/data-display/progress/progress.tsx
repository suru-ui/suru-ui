import * as React from "react";

import type { Component } from "../../types.js";
import * as ProgressParts from "./progress.parts.jsx";

/**
 * {@link Progress} の各パーツに渡すプロパティーです。
 *
 * `label` または `value` を指定した場合だけ、対応するパーツが表示されます。
 */
export type ProgressSlotProps = {
  /**
   * {@link ProgressParts.Label|Label} に渡すプロパティーです。
   */
  readonly label?: ProgressParts.Label.Props | undefined;

  /**
   * {@link ProgressParts.Value|Value} に渡すプロパティーです。
   */
  readonly value?: ProgressParts.Value.Props | undefined;

  /**
   * {@link ProgressParts.Track|Track} に渡すプロパティーです。
   */
  readonly track?: ProgressParts.Track.Props | undefined;

  /**
   * {@link ProgressParts.Indicator|Indicator} に渡すプロパティーです。
   */
  readonly indicator?: ProgressParts.Indicator.Props | undefined;
};

/**
 * {@link Progress} コンポーネントのプロパティーです。
 */
export type ProgressProps = ProgressParts.Root.Props & {
  /**
   * ラベルです。
   */
  label?: React.ReactNode | undefined;

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: ProgressSlotProps | undefined;
};

/**
 * 時間のかかる処理の進捗を表示します。
 *
 * `value` に `null` を指定すると、不確定状態になります。
 * `Label` と `Value` は `slotProps` を渡したときだけ表示します。
 *
 * @example 基本
 * ```tsx
 * <Progress value={24} />
 * ```
 *
 * @example 不確定状態
 * ```tsx
 * <Progress value={null} />
 * ```
 *
 * @example ラベルと現在値の表示
 * ```tsx
 * <Progress
 *   label="データを書き出しています"
 *   value={24}
 * />
 * ```
 */
export const Progress: Component<ProgressProps> = function SuiProgress(props) {
  const {
    label,
    slotProps: {
      label: labelProps,
      value: valueProps,
      track: trackProps,
      indicator: indicatorProps,
    } = {},
    ...rootProps
  } = props;

  return (
    <ProgressParts.Root {...rootProps}>
      {("label" in props || !!labelProps) && (
        <ProgressParts.Label {...{ children: label, ...labelProps }} />
      )}
      {("label" in props || !!valueProps) && <ProgressParts.Value {...valueProps} />}
      <ProgressParts.Track {...trackProps}>
        <ProgressParts.Indicator {...indicatorProps} />
      </ProgressParts.Track>
    </ProgressParts.Root>
  );
};
