import { Progress } from "@base-ui/react/progress";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./progress.css";

// Root
// ----

/**
 * 進捗の色です。
 */
export type ProgressRootColor = Color;

/**
 * 進捗の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ProgressRootRadius = "none" | Size | "full";

/**
 * 進捗の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ProgressRootSize = Size;

/**
 * 進捗の主な外観の種類です。
 *
 * - `"naked"`: 背景のないトラック
 * - `"liquid"`: 薄い塗りつぶしのトラック
 */
export type ProgressRootVariant = "naked" | "liquid";

/**
 * {@link ProgressRoot} の状態です。
 */
export type ProgressRootState = Progress.Root.State;

/**
 * {@link ProgressRoot} に渡すプロパティーです。
 */
export type ProgressRootProps = React.ComponentProps<typeof Progress.Root> & {
  /**
   * 進捗の色を指定します。
   *
   * @default "grey"
   */
  color?: ProgressRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * 進捗の角丸を指定します。
   *
   * @default "full"
   */
  radius?: ProgressRootRadius | undefined;

  /**
   * 進捗のサイズを指定します。
   *
   * @default "md"
   */
  size?: ProgressRootSize | undefined;

  /**
   * 進捗の主な外観を指定します。
   *
   * @default "liquid"
   */
  variant?: ProgressRootVariant | undefined;
};

/**
 * 進捗のルートコンポーネントです。
 *
 * `value` に `null` を指定すると、不確定状態になります。
 */
export const ProgressRoot: IComponent<ProgressRootProps> = function SuiProgressRoot(props) {
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
    <Progress.Root
      {...otherProps}
      className={cn(
        className,
        "sui_progress",
        `sui_progress-size_${size}`,
        `sui_progress-color_${color}`,
        `sui_progress-radius_${radius}`,
        `sui_progress-variant_${variant}`,
        outlined && "sui_progress-outlined",
      )}
    />
  );
};

/**
 * {@link ProgressRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ProgressRootState} です。
   */
  export type State = ProgressRootState;

  /**
   * {@link ProgressRootProps} です。
   */
  export type Props = ProgressRootProps;

  /**
   * {@link ProgressRootColor} です。
   */
  export type Color = ProgressRootColor;

  /**
   * {@link ProgressRootRadius} です。
   */
  export type Radius = ProgressRootRadius;

  /**
   * {@link ProgressRootSize} です。
   */
  export type Size = ProgressRootSize;

  /**
   * {@link ProgressRootVariant} です。
   */
  export type Variant = ProgressRootVariant;
}

/**
 * {@link ProgressRoot} です。
 */
export const Root: IComponent<Root.Props> = ProgressRoot;

// Label
// -----

/**
 * {@link ProgressLabel} の状態です。
 */
export type ProgressLabelState = Progress.Label.State;

/**
 * {@link ProgressLabel} に渡すプロパティーです。
 */
export type ProgressLabelProps = React.ComponentProps<typeof Progress.Label>;

/**
 * 進捗のラベルコンポーネントです。
 */
export const ProgressLabel: IComponent<ProgressLabelProps> = function SuiProgressLabel(props) {
  const { className, ...otherProps } = props;

  return <Progress.Label {...otherProps} className={cn(className, "sui_progress_label")} />;
};

/**
 * {@link ProgressLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link ProgressLabelState} です。
   */
  export type State = ProgressLabelState;

  /**
   * {@link ProgressLabelProps} です。
   */
  export type Props = ProgressLabelProps;
}

/**
 * {@link ProgressLabel} です。
 */
export const Label: IComponent<Label.Props> = ProgressLabel;

// Value
// -----

/**
 * {@link ProgressValue} の状態です。
 */
export type ProgressValueState = Progress.Value.State;

/**
 * {@link ProgressValue} に渡すプロパティーです。
 */
export type ProgressValueProps = React.ComponentProps<typeof Progress.Value>;

/**
 * 進捗の現在値を表示するコンポーネントです。
 *
 * 不確定状態では既定の表示が空になります。
 */
export const ProgressValue: IComponent<ProgressValueProps> = function SuiProgressValue(props) {
  const { className, ...otherProps } = props;

  return <Progress.Value {...otherProps} className={cn(className, "sui_progress_value")} />;
};

/**
 * {@link ProgressValue} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link ProgressValueState} です。
   */
  export type State = ProgressValueState;

  /**
   * {@link ProgressValueProps} です。
   */
  export type Props = ProgressValueProps;
}

/**
 * {@link ProgressValue} です。
 */
export const Value: IComponent<Value.Props> = ProgressValue;

// Track
// -----

/**
 * {@link ProgressTrack} の状態です。
 */
export type ProgressTrackState = Progress.Track.State;

/**
 * {@link ProgressTrack} に渡すプロパティーです。
 */
export type ProgressTrackProps = React.ComponentProps<typeof Progress.Track>;

/**
 * 進捗の全範囲を表すトラックコンポーネントです。
 */
export const ProgressTrack: IComponent<ProgressTrackProps> = function SuiProgressTrack(props) {
  const { className, ...otherProps } = props;

  return <Progress.Track {...otherProps} className={cn(className, "sui_progress_track")} />;
};

/**
 * {@link ProgressTrack} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Track {
  /**
   * {@link ProgressTrackState} です。
   */
  export type State = ProgressTrackState;

  /**
   * {@link ProgressTrackProps} です。
   */
  export type Props = ProgressTrackProps;
}

/**
 * {@link ProgressTrack} です。
 */
export const Track: IComponent<Track.Props> = ProgressTrack;

// Indicator
// ---------

/**
 * {@link ProgressIndicator} の状態です。
 */
export type ProgressIndicatorState = Progress.Indicator.State;

/**
 * {@link ProgressIndicator} に渡すプロパティーです。
 */
export type ProgressIndicatorProps = React.ComponentProps<typeof Progress.Indicator>;

/**
 * 進捗の現在値を示すインジケーターコンポーネントです。
 */
export const ProgressIndicator: IComponent<ProgressIndicatorProps> = function SuiProgressIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Progress.Indicator {...otherProps} className={cn(className, "sui_progress_indicator")} />;
};

/**
 * {@link ProgressIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link ProgressIndicatorState} です。
   */
  export type State = ProgressIndicatorState;

  /**
   * {@link ProgressIndicatorProps} です。
   */
  export type Props = ProgressIndicatorProps;
}

/**
 * {@link ProgressIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = ProgressIndicator;
