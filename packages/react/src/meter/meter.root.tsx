import { Meter } from "@base-ui/react/meter";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * メーターの配色です。
 */
export type MeterRootColor = Color;

/**
 * メーターの角丸の大きさです。
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
