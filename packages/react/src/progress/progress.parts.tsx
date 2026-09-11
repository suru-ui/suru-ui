import { Progress } from "@base-ui/react/progress";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./progress.css";

// Root
// ----

/**
 * 進捗の状態です。
 *
 * - `"indeterminate"`: 不確定状態
 * - `"progressing"`: 進行中
 * - `"complete"`: 完了
 */
export type ProgressRootStatus = Progress.Status;

/**
 * 進捗の配色です。
 */
export type ProgressRootColor = Color;

/**
 * 進捗の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ProgressRootRadius = "none" | Size | "full";

/**
 * 進捗の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ProgressRootSize = Size;

/**
 * 進捗の主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ProgressRootVariant = "naked" | "liquid";

/**
 * {@link ProgressRoot} が持つ状態です。
 */
export type ProgressRootState = Progress.Root.State;

export namespace ProgressRootProps {
  export type BaseUI = Omit<
    React.ComponentProps<typeof Progress.Root>,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Progress.Root>
  >;

  export type Render = RenderProps<ProgressRootState>;

  export type SuruUI = {
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
}

/**
 * {@link ProgressRoot} に渡す props です。
 */
export type ProgressRootProps = ProgressRootProps.Render &
  ProgressRootProps.SuruUI &
  ProgressRootProps.BaseUI &
  ProgressRootProps.HTML;

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
    // @ts-expect-error
    "data-scope": dataScope = "",
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
        (state) => `sui_progress-status_${state.status}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { ProgressRoot as Root };

export namespace Root {
  /**
   * {@link ProgressRootState}
   */
  export type State = ProgressRootState;

  /**
   * {@link ProgressRootProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ProgressRootProps.BaseUI;
    export type HTML = ProgressRootProps.HTML;
    export type Render = ProgressRootProps.Render;
    export type SuruUI = ProgressRootProps.SuruUI;
  }

  /**
   * {@link ProgressRootColor}
   */
  export type Color = ProgressRootColor;

  /**
   * {@link ProgressRootRadius}
   */
  export type Radius = ProgressRootRadius;

  /**
   * {@link ProgressRootSize}
   */
  export type Size = ProgressRootSize;

  /**
   * {@link ProgressRootStatus}
   */
  export type Status = ProgressRootStatus;

  /**
   * {@link ProgressRootVariant}
   */
  export type Variant = ProgressRootVariant;
}

// Label
// -----

/**
 * {@link ProgressLabel} が持つ状態です。
 */
export type ProgressLabelState = Progress.Label.State;

export namespace ProgressLabelProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Progress.Label>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof React.ComponentProps<typeof Progress.Label>
  >;

  export type Render = RenderProps<ProgressLabelState>;

  export type SuruUI = {};
}

/**
 * {@link ProgressLabel} に渡す props です。
 */
export type ProgressLabelProps = ProgressLabelProps.Render &
  ProgressLabelProps.SuruUI &
  ProgressLabelProps.BaseUI &
  ProgressLabelProps.HTML;

/**
 * 進捗のラベルコンポーネントです。
 */
export const ProgressLabel: IComponent<ProgressLabelProps> = function SuiProgressLabel(props) {
  const { className, ...otherProps } = props;

  return <Progress.Label {...otherProps} className={cn(className, "sui_progress_label")} />;
};

export { ProgressLabel as Label };

export namespace Label {
  /**
   * {@link ProgressLabelState}
   */
  export type State = ProgressLabelState;

  /**
   * {@link ProgressLabelProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ProgressLabelProps.BaseUI;
    export type HTML = ProgressLabelProps.HTML;
    export type Render = ProgressLabelProps.Render;
    export type SuruUI = ProgressLabelProps.SuruUI;
  }
}

// Value
// -----

/**
 * {@link ProgressValue} が持つ状態です。
 */
export type ProgressValueState = Progress.Value.State;

export namespace ProgressValueProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Progress.Value>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof React.ComponentProps<typeof Progress.Value>
  >;

  export type Render = RenderProps<ProgressValueState>;

  export type SuruUI = {};
}

/**
 * {@link ProgressValue} に渡す props です。
 */
export type ProgressValueProps = ProgressValueProps.Render &
  ProgressValueProps.SuruUI &
  ProgressValueProps.BaseUI &
  ProgressValueProps.HTML;

/**
 * 進捗の現在値を表示するコンポーネントです。
 *
 * 不確定状態では既定の表示が空になります。
 */
export const ProgressValue: IComponent<ProgressValueProps> = function SuiProgressValue(props) {
  const { className, ...otherProps } = props;

  return <Progress.Value {...otherProps} className={cn(className, "sui_progress_value")} />;
};

export { ProgressValue as Value };

export namespace Value {
  /**
   * {@link ProgressValueState}
   */
  export type State = ProgressValueState;

  /**
   * {@link ProgressValueProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ProgressValueProps.BaseUI;
    export type HTML = ProgressValueProps.HTML;
    export type Render = ProgressValueProps.Render;
    export type SuruUI = ProgressValueProps.SuruUI;
  }
}

// Track
// -----

/**
 * {@link ProgressTrack} が持つ状態です。
 */
export type ProgressTrackState = Progress.Track.State;

export namespace ProgressTrackProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Progress.Track>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Progress.Track>
  >;

  export type Render = RenderProps<ProgressTrackState>;

  export type SuruUI = {};
}

/**
 * {@link ProgressTrack} に渡す props です。
 */
export type ProgressTrackProps = ProgressTrackProps.Render &
  ProgressTrackProps.SuruUI &
  ProgressTrackProps.BaseUI &
  ProgressTrackProps.HTML;

/**
 * 進捗の全範囲を表すトラックコンポーネントです。
 */
export const ProgressTrack: IComponent<ProgressTrackProps> = function SuiProgressTrack(props) {
  const { className, ...otherProps } = props;

  return <Progress.Track {...otherProps} className={cn(className, "sui_progress_track")} />;
};

export { ProgressTrack as Track };

export namespace Track {
  /**
   * {@link ProgressTrackState}
   */
  export type State = ProgressTrackState;

  /**
   * {@link ProgressTrackProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ProgressTrackProps.BaseUI;
    export type HTML = ProgressTrackProps.HTML;
    export type Render = ProgressTrackProps.Render;
    export type SuruUI = ProgressTrackProps.SuruUI;
  }
}

// Indicator
// ---------

/**
 * {@link ProgressIndicator} が持つ状態です。
 */
export type ProgressIndicatorState = Progress.Indicator.State;

export namespace ProgressIndicatorProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Progress.Indicator>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"div">,
    keyof Render | keyof React.ComponentProps<typeof Progress.Indicator>
  >;

  export type Render = RenderProps<ProgressIndicatorState>;

  export type SuruUI = {};
}

/**
 * {@link ProgressIndicator} に渡す props です。
 */
export type ProgressIndicatorProps = ProgressIndicatorProps.Render &
  ProgressIndicatorProps.SuruUI &
  ProgressIndicatorProps.BaseUI &
  ProgressIndicatorProps.HTML;

/**
 * 進捗の現在値を示すインジケーターコンポーネントです。
 */
export const ProgressIndicator: IComponent<ProgressIndicatorProps> = function SuiProgressIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Progress.Indicator {...otherProps} className={cn(className, "sui_progress_indicator")} />;
};

export { ProgressIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link ProgressIndicatorState}
   */
  export type State = ProgressIndicatorState;

  /**
   * {@link ProgressIndicatorProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = ProgressIndicatorProps.BaseUI;
    export type HTML = ProgressIndicatorProps.HTML;
    export type Render = ProgressIndicatorProps.Render;
    export type SuruUI = ProgressIndicatorProps.SuruUI;
  }
}
