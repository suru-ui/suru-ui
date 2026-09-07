import { Meter } from "@base-ui/react/meter";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./meter.css";

// Root
// ----

/**
 * メーターの配色です。
 */
export type MeterRootColor = Color;

/**
 * メーターの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type MeterRootRadius = "none" | Size | "full";

/**
 * メーターの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type MeterRootSize = Size;

/**
 * メーターの主な外観の種類です。
 *
 * - `"naked"`: 背景のないトラック
 * - `"liquid"`: 薄い塗りつぶしのトラック
 */
export type MeterRootVariant = "naked" | "liquid";

/**
 * {@link MeterRoot} が持つ状態です。
 */
export type MeterRootState = Meter.Root.State;

/**
 * {@link MeterRoot} に渡す props です。
 */
export type MeterRootProps = React.ComponentProps<typeof Meter.Root> & {
  /**
   * メーターの色を指定します。
   *
   * @default "grey"
   */
  color?: MeterRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * メーターの角丸を指定します。
   *
   * @default "full"
   */
  radius?: MeterRootRadius | undefined;

  /**
   * メーターのサイズを指定します。
   *
   * @default "md"
   */
  size?: MeterRootSize | undefined;

  /**
   * メーターの主な外観を指定します。
   *
   * @default "liquid"
   */
  variant?: MeterRootVariant | undefined;
};

/**
 * メーターのルートコンポーネントです。
 */
export const MeterRoot: IComponent<MeterRootProps> = function SuiMeterRoot(props) {
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
      data-scope=""
    />
  );
};

/**
 * {@link MeterRoot}
 */
export { MeterRoot as Root };

/**
 * {@link MeterRoot} の状態や props をまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link MeterRootState}
   */
  export type State = MeterRootState;

  /**
   * {@link MeterRootProps}
   */
  export type Props = MeterRootProps;

  /**
   * {@link MeterRootColor}
   */
  export type Color = MeterRootColor;

  /**
   * {@link MeterRootRadius}
   */
  export type Radius = MeterRootRadius;

  /**
   * {@link MeterRootSize}
   */
  export type Size = MeterRootSize;

  /**
   * {@link MeterRootVariant}
   */
  export type Variant = MeterRootVariant;
}

// Label
// -----

/**
 * {@link MeterLabel} が持つ状態です。
 */
export type MeterLabelState = Meter.Label.State;

/**
 * {@link MeterLabel} に渡す props です。
 */
export type MeterLabelProps = React.ComponentProps<typeof Meter.Label>;

/**
 * メーターのラベルコンポーネントです。
 */
export const MeterLabel: IComponent<MeterLabelProps> = function SuiMeterLabel(props) {
  const { className, ...otherProps } = props;

  return <Meter.Label {...otherProps} className={cn(className, "sui_meter_label")} />;
};

/**
 * {@link MeterLabel}
 */
export { MeterLabel as Label };

/**
 * {@link MeterLabel} の状態や props をまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link MeterLabelState}
   */
  export type State = MeterLabelState;

  /**
   * {@link MeterLabelProps}
   */
  export type Props = MeterLabelProps;
}

// Value
// -----

/**
 * {@link MeterValue} が持つ状態です。
 */
export type MeterValueState = Meter.Value.State;

/**
 * {@link MeterValue} に渡す props です。
 */
export type MeterValueProps = React.ComponentProps<typeof Meter.Value>;

/**
 * メーターの現在値を表示するコンポーネントです。
 */
export const MeterValue: IComponent<MeterValueProps> = function SuiMeterValue(props) {
  const { className, ...otherProps } = props;

  return <Meter.Value {...otherProps} className={cn(className, "sui_meter_value")} />;
};

/**
 * {@link MeterValue}
 */
export { MeterValue as Value };

/**
 * {@link MeterValue} の状態や props をまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link MeterValueState}
   */
  export type State = MeterValueState;

  /**
   * {@link MeterValueProps}
   */
  export type Props = MeterValueProps;
}

// Track
// -----

/**
 * {@link MeterTrack} が持つ状態です。
 */
export type MeterTrackState = Meter.Track.State;

/**
 * {@link MeterTrack} に渡す props です。
 */
export type MeterTrackProps = React.ComponentProps<typeof Meter.Track>;

/**
 * メーターの全範囲を表すトラックコンポーネントです。
 */
export const MeterTrack: IComponent<MeterTrackProps> = function SuiMeterTrack(props) {
  const { className, ...otherProps } = props;

  return <Meter.Track {...otherProps} className={cn(className, "sui_meter_track")} />;
};

/**
 * {@link MeterTrack}
 */
export { MeterTrack as Track };

/**
 * {@link MeterTrack} の状態や props をまとめた型名前空間です。
 */
export namespace Track {
  /**
   * {@link MeterTrackState}
   */
  export type State = MeterTrackState;

  /**
   * {@link MeterTrackProps}
   */
  export type Props = MeterTrackProps;
}

// Indicator
// ---------

/**
 * {@link MeterIndicator} が持つ状態です。
 */
export type MeterIndicatorState = Meter.Indicator.State;

/**
 * {@link MeterIndicator} に渡す props です。
 */
export type MeterIndicatorProps = React.ComponentProps<typeof Meter.Indicator>;

/**
 * メーターの現在値を示すインジケーターコンポーネントです。
 */
export const MeterIndicator: IComponent<MeterIndicatorProps> = function SuiMeterIndicator(props) {
  const { className, ...otherProps } = props;

  return <Meter.Indicator {...otherProps} className={cn(className, "sui_meter_indicator")} />;
};

/**
 * {@link MeterIndicator}
 */
export { MeterIndicator as Indicator };

/**
 * {@link MeterIndicator} の状態や props をまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link MeterIndicatorState}
   */
  export type State = MeterIndicatorState;

  /**
   * {@link MeterIndicatorProps}
   */
  export type Props = MeterIndicatorProps;
}
