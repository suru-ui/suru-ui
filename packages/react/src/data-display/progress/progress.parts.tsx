import { Progress } from "@base-ui/react/progress";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./progress.css";

// Root
// ----

/**
 * {@link ProgressRoot} の状態です。
 */
export type ProgressRootState = Progress.Root.State;

/**
 * 進捗の状態です。
 */
export type ProgressStatus = ProgressRootState["status"];

/**
 * {@link ProgressRoot} に渡すプロパティーです。
 */
export type ProgressRootProps = React.ComponentProps<typeof Progress.Root> & {
  /**
   * 進捗の色を指定します。
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
   * 進捗の角丸を指定します。
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
   * 進捗のサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * 進捗のスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないトラック
   * - `"liquid"`: 薄い塗りつぶしのトラック
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;
};

/**
 * 進捗のルートコンポーネントです。
 *
 * `value` に `null` を指定すると、不確定状態になります。
 *
 * @example
 * ```tsx
 * <ProgressParts.Root value={24} color="blue">
 *   <ProgressParts.Track>
 *     <ProgressParts.Indicator />
 *   </ProgressParts.Track>
 * </ProgressParts.Root>
 * ```
 */
export const ProgressRoot: Component<ProgressRootProps> = function SuiProgressRoot(props) {
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
 * {@link ProgressRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ProgressRoot} の状態型です。
   */
  export type State = ProgressRootState;

  /**
   * {@link ProgressRoot} のプロパティー型です。
   */
  export type Props = ProgressRootProps;
}

/**
 * {@link ProgressRoot} です。
 */
export const Root: Component<Root.Props> = ProgressRoot;

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
 *
 * @example
 * ```tsx
 * <ProgressParts.Root value={24}>
 *   <ProgressParts.Label>データを書き出しています</ProgressParts.Label>
 * </ProgressParts.Root>
 * ```
 */
export const ProgressLabel: Component<ProgressLabelProps> = function SuiProgressLabel(props) {
  const { className, ...otherProps } = props;

  return <Progress.Label {...otherProps} className={cn(className, "sui_progress_label")} />;
};

/**
 * {@link ProgressLabel} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Label {
  /**
   * {@link ProgressLabel} の状態型です。
   */
  export type State = ProgressLabelState;

  /**
   * {@link ProgressLabel} のプロパティー型です。
   */
  export type Props = ProgressLabelProps;
}

/**
 * {@link ProgressLabel} です。
 */
export const Label: Component<Label.Props> = ProgressLabel;

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
 *
 * @example
 * ```tsx
 * <ProgressParts.Root value={24}>
 *   <ProgressParts.Value />
 * </ProgressParts.Root>
 * ```
 */
export const ProgressValue: Component<ProgressValueProps> = function SuiProgressValue(props) {
  const { className, ...otherProps } = props;

  return <Progress.Value {...otherProps} className={cn(className, "sui_progress_value")} />;
};

/**
 * {@link ProgressValue} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  /**
   * {@link ProgressValue} の状態型です。
   */
  export type State = ProgressValueState;

  /**
   * {@link ProgressValue} のプロパティー型です。
   */
  export type Props = ProgressValueProps;
}

/**
 * {@link ProgressValue} です。
 */
export const Value: Component<Value.Props> = ProgressValue;

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
 *
 * @example
 * ```tsx
 * <ProgressParts.Root value={24}>
 *   <ProgressParts.Track>
 *     <ProgressParts.Indicator />
 *   </ProgressParts.Track>
 * </ProgressParts.Root>
 * ```
 */
export const ProgressTrack: Component<ProgressTrackProps> = function SuiProgressTrack(props) {
  const { className, ...otherProps } = props;

  return <Progress.Track {...otherProps} className={cn(className, "sui_progress_track")} />;
};

/**
 * {@link ProgressTrack} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Track {
  /**
   * {@link ProgressTrack} の状態型です。
   */
  export type State = ProgressTrackState;

  /**
   * {@link ProgressTrack} のプロパティー型です。
   */
  export type Props = ProgressTrackProps;
}

/**
 * {@link ProgressTrack} です。
 */
export const Track: Component<Track.Props> = ProgressTrack;

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
 *
 * @example
 * ```tsx
 * <ProgressParts.Root value={24}>
 *   <ProgressParts.Track>
 *     <ProgressParts.Indicator />
 *   </ProgressParts.Track>
 * </ProgressParts.Root>
 * ```
 */
export const ProgressIndicator: Component<ProgressIndicatorProps> = function SuiProgressIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Progress.Indicator {...otherProps} className={cn(className, "sui_progress_indicator")} />;
};

/**
 * {@link ProgressIndicator} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link ProgressIndicator} の状態型です。
   */
  export type State = ProgressIndicatorState;

  /**
   * {@link ProgressIndicator} のプロパティー型です。
   */
  export type Props = ProgressIndicatorProps;
}

/**
 * {@link ProgressIndicator} です。
 */
export const Indicator: Component<Indicator.Props> = ProgressIndicator;
