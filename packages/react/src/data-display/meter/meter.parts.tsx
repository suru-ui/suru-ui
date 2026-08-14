import { Meter } from "@base-ui/react/meter";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./meter.css";

// Root
// ----

/**
 * {@link MeterRoot} の状態です。
 */
export type MeterRootState = Meter.Root.State;

/**
 * {@link MeterRoot} に渡すプロパティーです。
 */
export type MeterRootProps = React.ComponentProps<typeof Meter.Root> & {
  /**
   * メーターの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * メーターの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸
   * - `"md"`: 標準的な角丸
   * - `"lg"`: 大きい角丸
   * - `"full"`: 完全な丸形
   *
   * @default "full"
   */
  radius?: "none" | Size | "full" | undefined;

  /**
   * メーターのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * メーターのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないトラック
   * - `"liquid"`: 薄い塗りつぶしのトラック
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;
};

/**
 * メーターのルートコンポーネントです。
 *
 * @example
 * ```tsx
 * <MeterParts.Root value={24} color="blue">
 *   <MeterParts.Track>
 *     <MeterParts.Indicator />
 *   </MeterParts.Track>
 * </MeterParts.Root>
 * ```
 */
export const MeterRoot: Component<MeterRootProps> = function SuiMeterRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = "full",
    variant = "liquid",
    outlined = false,
    className,
    ...otherProps
  } = props;

  return (
    <Meter.Root
      {...otherProps}
      className={cn(
        className,
        "sui_meter",
        `sui_meter-size_${size}`,
        `sui_meter-color_${color}`,
        `sui_meter-radius_${radius}`,
        `sui_meter-variant_${variant}`,
        outlined && "sui_meter-outlined",
      )}
    />
  );
};

/**
 * {@link MeterRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link MeterRoot} の状態型です。
   */
  export type State = MeterRootState;

  /**
   * {@link MeterRoot} のプロパティー型です。
   */
  export type Props = MeterRootProps;
}

/**
 * {@link MeterRoot} です。
 */
export const Root: Component<Root.Props> = MeterRoot;

// Label
// -----

/**
 * {@link MeterLabel} の状態です。
 */
export type MeterLabelState = Meter.Label.State;

/**
 * {@link MeterLabel} に渡すプロパティーです。
 */
export type MeterLabelProps = React.ComponentProps<typeof Meter.Label>;

/**
 * メーターのラベルコンポーネントです。
 *
 * @example
 * ```tsx
 * <MeterParts.Root value={24}>
 *   <MeterParts.Label>ストレージ使用量</MeterParts.Label>
 * </MeterParts.Root>
 * ```
 */
export const MeterLabel: Component<MeterLabelProps> = function SuiMeterLabel(props) {
  const { className, ...otherProps } = props;

  return <Meter.Label {...otherProps} className={cn(className, "sui_meter_label")} />;
};

/**
 * {@link MeterLabel} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link MeterLabel} の状態型です。
   */
  export type State = MeterLabelState;

  /**
   * {@link MeterLabel} のプロパティー型です。
   */
  export type Props = MeterLabelProps;
}

/**
 * {@link MeterLabel} です。
 */
export const Label: Component<Label.Props> = MeterLabel;

// Value
// -----

/**
 * {@link MeterValue} の状態です。
 */
export type MeterValueState = Meter.Value.State;

/**
 * {@link MeterValue} に渡すプロパティーです。
 */
export type MeterValueProps = React.ComponentProps<typeof Meter.Value>;

/**
 * メーターの現在値を表示するコンポーネントです。
 *
 * @example
 * ```tsx
 * <MeterParts.Root value={24}>
 *   <MeterParts.Value />
 * </MeterParts.Root>
 * ```
 */
export const MeterValue: Component<MeterValueProps> = function SuiMeterValue(props) {
  const { className, ...otherProps } = props;

  return <Meter.Value {...otherProps} className={cn(className, "sui_meter_value")} />;
};

/**
 * {@link MeterValue} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link MeterValue} の状態型です。
   */
  export type State = MeterValueState;

  /**
   * {@link MeterValue} のプロパティー型です。
   */
  export type Props = MeterValueProps;
}

/**
 * {@link MeterValue} です。
 */
export const Value: Component<Value.Props> = MeterValue;

// Track
// -----

/**
 * {@link MeterTrack} の状態です。
 */
export type MeterTrackState = Meter.Track.State;

/**
 * {@link MeterTrack} に渡すプロパティーです。
 */
export type MeterTrackProps = React.ComponentProps<typeof Meter.Track>;

/**
 * メーターの全範囲を表すトラックコンポーネントです。
 *
 * @example
 * ```tsx
 * <MeterParts.Root value={24}>
 *   <MeterParts.Track>
 *     <MeterParts.Indicator />
 *   </MeterParts.Track>
 * </MeterParts.Root>
 * ```
 */
export const MeterTrack: Component<MeterTrackProps> = function SuiMeterTrack(props) {
  const { className, ...otherProps } = props;

  return <Meter.Track {...otherProps} className={cn(className, "sui_meter_track")} />;
};

/**
 * {@link MeterTrack} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Track {
  /**
   * {@link MeterTrack} の状態型です。
   */
  export type State = MeterTrackState;

  /**
   * {@link MeterTrack} のプロパティー型です。
   */
  export type Props = MeterTrackProps;
}

/**
 * {@link MeterTrack} です。
 */
export const Track: Component<Track.Props> = MeterTrack;

// Indicator
// ---------

/**
 * {@link MeterIndicator} の状態です。
 */
export type MeterIndicatorState = Meter.Indicator.State;

/**
 * {@link MeterIndicator} に渡すプロパティーです。
 */
export type MeterIndicatorProps = React.ComponentProps<typeof Meter.Indicator>;

/**
 * メーターの現在値を示すインジケーターコンポーネントです。
 *
 * @example
 * ```tsx
 * <MeterParts.Root value={24}>
 *   <MeterParts.Track>
 *     <MeterParts.Indicator />
 *   </MeterParts.Track>
 * </MeterParts.Root>
 * ```
 */
export const MeterIndicator: Component<MeterIndicatorProps> = function SuiMeterIndicator(props) {
  const { className, ...otherProps } = props;

  return <Meter.Indicator {...otherProps} className={cn(className, "sui_meter_indicator")} />;
};

/**
 * {@link MeterIndicator} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link MeterIndicator} の状態型です。
   */
  export type State = MeterIndicatorState;

  /**
   * {@link MeterIndicator} のプロパティー型です。
   */
  export type Props = MeterIndicatorProps;
}

/**
 * {@link MeterIndicator} です。
 */
export const Indicator: Component<Indicator.Props> = MeterIndicator;
