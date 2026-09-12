import { Meter } from "@base-ui/react/meter";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
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
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type MeterRootRadius = "none" | Size | "full";

/**
 * メーターの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MeterRootSize = Size;

/**
 * メーターの主な外観の種類です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MeterRootVariant = "naked" | "liquid";

/**
 * {@link MeterRoot} が持つ状態です。
 */
export type MeterRootState = Meter.Root.State;

export namespace MeterRootProps {
  export type Render = RenderProps<MeterRootState>;

  export type SuruUI = {
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterRootProps:
      "aria-valuetext" | "format" | "getAriaValueText" | "locale" | "max" | "min" | "value",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterRoot} に渡す props です。
 */
export type MeterRootProps = MeterRootProps.Render &
  MeterRootProps.SuruUI &
  MeterRootProps.BaseUI &
  MeterRootProps.HTML;

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
    // @ts-expect-error
    "data-scope": dataScope = "",
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
      data-scope={dataScope}
    />
  );
};

export { MeterRoot as Root };

export namespace Root {
  export type State = MeterRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterRootProps.Render;

    export type SuruUI = MeterRootProps.SuruUI;

    export type BaseUI = MeterRootProps.BaseUI;

    export type HTML = MeterRootProps.HTML;
  }

  export type Color = MeterRootColor;

  export type Radius = MeterRootRadius;

  export type Size = MeterRootSize;

  export type Variant = MeterRootVariant;
}

// Label
// -----

/**
 * {@link MeterLabel} が持つ状態です。
 */
export type MeterLabelState = Meter.Label.State;

export namespace MeterLabelProps {
  export type Render = RenderProps<MeterLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterLabel} に渡す props です。
 */
export type MeterLabelProps = MeterLabelProps.Render &
  MeterLabelProps.SuruUI &
  MeterLabelProps.BaseUI &
  MeterLabelProps.HTML;

/**
 * メーターのラベルコンポーネントです。
 */
export const MeterLabel: IComponent<MeterLabelProps> = function SuiMeterLabel(props) {
  const { className, ...otherProps } = props;

  return <Meter.Label {...otherProps} className={cn(className, "sui_meter_label")} />;
};

export { MeterLabel as Label };

export namespace Label {
  export type State = MeterLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterLabelProps.Render;

    export type SuruUI = MeterLabelProps.SuruUI;

    export type BaseUI = MeterLabelProps.BaseUI;

    export type HTML = MeterLabelProps.HTML;
  }
}

// Value
// -----

/**
 * {@link MeterValue} が持つ状態です。
 */
export type MeterValueState = Meter.Value.State;

export namespace MeterValueProps {
  export type Render = RenderProps<MeterValueState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Value>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterValueProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterValue} に渡す props です。
 */
export type MeterValueProps = MeterValueProps.Render &
  MeterValueProps.SuruUI &
  MeterValueProps.BaseUI &
  MeterValueProps.HTML;

/**
 * メーターの現在値を表示するコンポーネントです。
 */
export const MeterValue: IComponent<MeterValueProps> = function SuiMeterValue(props) {
  const { className, ...otherProps } = props;

  return <Meter.Value {...otherProps} className={cn(className, "sui_meter_value")} />;
};

export { MeterValue as Value };

export namespace Value {
  export type State = MeterValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterValueProps.Render;

    export type SuruUI = MeterValueProps.SuruUI;

    export type BaseUI = MeterValueProps.BaseUI;

    export type HTML = MeterValueProps.HTML;
  }
}

// Track
// -----

/**
 * {@link MeterTrack} が持つ状態です。
 */
export type MeterTrackState = Meter.Track.State;

export namespace MeterTrackProps {
  export type Render = RenderProps<MeterTrackState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Track>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterTrackProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Track>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterTrack} に渡す props です。
 */
export type MeterTrackProps = MeterTrackProps.Render &
  MeterTrackProps.SuruUI &
  MeterTrackProps.BaseUI &
  MeterTrackProps.HTML;

/**
 * メーターの全範囲を表すトラックコンポーネントです。
 */
export const MeterTrack: IComponent<MeterTrackProps> = function SuiMeterTrack(props) {
  const { className, ...otherProps } = props;

  return <Meter.Track {...otherProps} className={cn(className, "sui_meter_track")} />;
};

export { MeterTrack as Track };

export namespace Track {
  export type State = MeterTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterTrackProps.Render;

    export type SuruUI = MeterTrackProps.SuruUI;

    export type BaseUI = MeterTrackProps.BaseUI;

    export type HTML = MeterTrackProps.HTML;
  }
}

// Indicator
// ---------

/**
 * {@link MeterIndicator} が持つ状態です。
 */
export type MeterIndicatorState = Meter.Indicator.State;

export namespace MeterIndicatorProps {
  export type Render = RenderProps<MeterIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterIndicatorProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterIndicator} に渡す props です。
 */
export type MeterIndicatorProps = MeterIndicatorProps.Render &
  MeterIndicatorProps.SuruUI &
  MeterIndicatorProps.BaseUI &
  MeterIndicatorProps.HTML;

/**
 * メーターの現在値を示すインジケーターコンポーネントです。
 */
export const MeterIndicator: IComponent<MeterIndicatorProps> = function SuiMeterIndicator(props) {
  const { className, ...otherProps } = props;

  return <Meter.Indicator {...otherProps} className={cn(className, "sui_meter_indicator")} />;
};

export { MeterIndicator as Indicator };

export namespace Indicator {
  export type State = MeterIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterIndicatorProps.Render;

    export type SuruUI = MeterIndicatorProps.SuruUI;

    export type BaseUI = MeterIndicatorProps.BaseUI;

    export type HTML = MeterIndicatorProps.HTML;
  }
}
