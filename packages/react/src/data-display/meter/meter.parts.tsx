import { Meter } from "@base-ui/react/meter";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./meter.css";

// Types
// -----

/**
 * メーターの色です。
 */
export type MeterColor = Color;

/**
 * メーターの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type MeterRadius = "none" | Size | "full";

/**
 * メーターの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type MeterSize = Size;

/**
 * メーターの主な外観の種類です。
 *
 * - `"naked"`: 背景のないトラック
 * - `"liquid"`: 薄い塗りつぶしのトラック
 */
export type MeterVariant = "naked" | "liquid";

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
  color?: MeterColor | undefined;

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
  radius?: MeterRadius | undefined;

  /**
   * メーターのサイズを指定します。
   *
   * @default "md"
   */
  size?: MeterSize | undefined;

  /**
   * メーターのスタイルバリエーションを指定します。
   *
   * @default "liquid"
   */
  variant?: MeterVariant | undefined;
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
    />
  );
};

/**
 * {@link MeterRoot} の状態やプロパティーをまとめた型名前空間です。
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
export const Root: IComponent<Root.Props> = MeterRoot;

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
 */
export const MeterLabel: IComponent<MeterLabelProps> = function SuiMeterLabel(props) {
  const { className, ...otherProps } = props;

  return <Meter.Label {...otherProps} className={cn(className, "sui_meter_label")} />;
};

/**
 * {@link MeterLabel} の状態やプロパティーをまとめた型名前空間です。
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
export const Label: IComponent<Label.Props> = MeterLabel;

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
 */
export const MeterValue: IComponent<MeterValueProps> = function SuiMeterValue(props) {
  const { className, ...otherProps } = props;

  return <Meter.Value {...otherProps} className={cn(className, "sui_meter_value")} />;
};

/**
 * {@link MeterValue} の状態やプロパティーをまとめた型名前空間です。
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
export const Value: IComponent<Value.Props> = MeterValue;

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
 */
export const MeterTrack: IComponent<MeterTrackProps> = function SuiMeterTrack(props) {
  const { className, ...otherProps } = props;

  return <Meter.Track {...otherProps} className={cn(className, "sui_meter_track")} />;
};

/**
 * {@link MeterTrack} の状態やプロパティーをまとめた型名前空間です。
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
export const Track: IComponent<Track.Props> = MeterTrack;

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
 */
export const MeterIndicator: IComponent<MeterIndicatorProps> = function SuiMeterIndicator(props) {
  const { className, ...otherProps } = props;

  return <Meter.Indicator {...otherProps} className={cn(className, "sui_meter_indicator")} />;
};

/**
 * {@link MeterIndicator} の状態やプロパティーをまとめた型名前空間です。
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
export const Indicator: IComponent<Indicator.Props> = MeterIndicator;
