import * as React from "react";

import type { Component } from "../../types.js";
import * as MeterParts from "./meter.parts.jsx";

/**
 * {@link Meter} の各パーツに渡すプロパティーです。
 *
 * `label` または `value` を指定した場合だけ、対応するパーツが表示されます。
 */
export type MeterSlotProps = {
  /**
   * {@link MeterParts.Label|Label} に渡すプロパティーです。
   */
  readonly label?: MeterParts.Label.Props | undefined;

  /**
   * {@link MeterParts.Value|Value} に渡すプロパティーです。
   */
  readonly value?: MeterParts.Value.Props | undefined;

  /**
   * {@link MeterParts.Track|Track} に渡すプロパティーです。
   */
  readonly track?: MeterParts.Track.Props | undefined;

  /**
   * {@link MeterParts.Indicator|Indicator} に渡すプロパティーです。
   */
  readonly indicator?: MeterParts.Indicator.Props | undefined;
};

/**
 * {@link Meter} コンポーネントのプロパティーです。
 */
export type MeterProps = MeterParts.Root.Props & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   */
  slotProps?: MeterSlotProps | undefined;
};

/**
 * 数値の範囲内にある現在値を表示するメーターです。
 *
 * `Label` と `Value` は `slotProps` を渡したときだけ表示します。
 *
 * @example 基本
 * ```tsx
 * <Meter value={24} />
 * ```
 *
 * @example ラベルと現在値の表示
 * ```tsx
 * <Meter
 *   value={24}
 *   slotProps={{
 *     label: { children: "ストレージ使用量" },
 *     value: {},
 *   }}
 * />
 * ```
 */
export const Meter: Component<MeterProps> = function SuiMeter(props) {
  const {
    slotProps: {
      label: labelProps,
      value: valueProps,
      track: trackProps,
      indicator: indicatorProps,
    } = {},
    ...rootProps
  } = props;

  return (
    <MeterParts.Root {...rootProps}>
      {labelProps ? <MeterParts.Label {...labelProps} /> : null}
      {valueProps ? <MeterParts.Value {...valueProps} /> : null}
      <MeterParts.Track {...trackProps}>
        <MeterParts.Indicator {...indicatorProps} />
      </MeterParts.Track>
    </MeterParts.Root>
  );
};
