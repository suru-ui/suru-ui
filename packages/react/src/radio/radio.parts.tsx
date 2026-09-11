import { Radio } from "@base-ui/react/radio";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { useRadioGroupContext } from "../radio-group/radio-group.parts.jsx";
import type { IComponent } from "../types.js";

import "./radio.css";

// Root
// ----

/**
 * ラジオボタンの配色です。
 */
export type RadioRootColor = Color;

/**
 * ラジオボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type RadioRootRadius = "none" | Size | "full";

/**
 * ラジオボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type RadioRootSize = Size;

/**
 * ラジオボタンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type RadioRootVariant = "naked" | "liquid";

/**
 * {@link RadioRoot} が持つ状態です。
 */
export type RadioRootState = Radio.Root.State;

export namespace RadioRootProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Radio.Root>, keyof Render | keyof SuruUI>;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof SuruUI | keyof React.ComponentProps<typeof Radio.Root>
  >;

  export type Render = RenderProps<RadioRootState>;

  export type SuruUI = {
    /**
     * ラジオボタンの配色を指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "grey"
     */
    color?: RadioRootColor | undefined;

    /**
     * ラジオボタンに枠線を表示するかどうかを指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ラジオボタンの角丸の大きさを指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "full"
     */
    radius?: RadioRootRadius | undefined;

    /**
     * ラジオボタンの大きさを指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "md"
     */
    size?: RadioRootSize | undefined;

    /**
     * ラジオボタンの主な外観を指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "naked"
     */
    variant?: RadioRootVariant | undefined;
  };
}

/**
 * {@link RadioRoot} に渡す props です。
 */
export type RadioRootProps = RadioRootProps.Render &
  RadioRootProps.SuruUI &
  RadioRootProps.BaseUI &
  RadioRootProps.HTML;

/**
 * ラジオボタンのルートコンポーネントです。
 */
export const RadioRoot: IComponent<RadioRootProps> = function SuiRadioRoot(props) {
  const group = useRadioGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "full",
    variant: variantProp = "naked",
    disabled: disabledProp,
    outlined: outlinedProp = false,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;
  const color = group?.color ?? colorProp;
  const radius = group?.radius ?? radiusProp;
  const variant = group?.variant ?? variantProp;
  const outlined = group?.outlined ?? outlinedProp;
  const disabled = (group?.disabled || disabledProp) ?? undefined;

  return (
    <Radio.Root
      {...otherProps}
      disabled={disabled}
      className={cn(
        className,
        "sui_radio",
        `sui_radio-size_${size}`,
        `sui_radio-color_${color}`,
        `sui_radio-radius_${radius}`,
        `sui_radio-variant_${variant}`,
        outlined && "sui_radio-outlined",
        (state) => state.checked && "sui_radio-checked",
        (state) => state.disabled && "sui_radio-disabled",
      )}
      data-scope={dataScope}
    />
  );
};

export { RadioRoot as Root };

export namespace Root {
  /**
   * {@link RadioRootState}
   */
  export type State = RadioRootState;

  /**
   * {@link RadioRootProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = RadioRootProps.BaseUI;
    export type HTML = RadioRootProps.HTML;
    export type Render = RadioRootProps.Render;
    export type SuruUI = RadioRootProps.SuruUI;
  }

  /**
   * {@link RadioRootColor}
   */
  export type Color = RadioRootColor;

  /**
   * {@link RadioRootRadius}
   */
  export type Radius = RadioRootRadius;

  /**
   * {@link RadioRootSize}
   */
  export type Size = RadioRootSize;

  /**
   * {@link RadioRootVariant}
   */
  export type Variant = RadioRootVariant;
}

// Indicator
// ---------

/**
 * {@link RadioIndicator} が持つ状態です。
 */
export type RadioIndicatorState = Radio.Indicator.State;

export namespace RadioIndicatorProps {
  export type BaseUI = Omit<React.ComponentProps<typeof Radio.Indicator>, keyof Render>;

  export type HTML = Omit<
    React.ComponentProps<"span">,
    keyof Render | keyof React.ComponentProps<typeof Radio.Indicator>
  >;

  export type Render = RenderProps<RadioIndicatorState>;

  export type SuruUI = {};
}

/**
 * {@link RadioIndicator} に渡す props です。
 */
export type RadioIndicatorProps = RadioIndicatorProps.Render &
  RadioIndicatorProps.SuruUI &
  RadioIndicatorProps.BaseUI &
  RadioIndicatorProps.HTML;

/**
 * ラジオボタンのインジケーターコンポーネントです。
 */
export const RadioIndicator: IComponent<RadioIndicatorProps> = function SuiRadioIndicator(props) {
  const { className, ...otherProps } = props;

  return <Radio.Indicator {...otherProps} className={cn(className, "sui_radio_indicator")} />;
};

export { RadioIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link RadioIndicatorState}
   */
  export type State = RadioIndicatorState;

  /**
   * {@link RadioIndicatorProps}
   */
  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type BaseUI = RadioIndicatorProps.BaseUI;
    export type HTML = RadioIndicatorProps.HTML;
    export type Render = RadioIndicatorProps.Render;
    export type SuruUI = RadioIndicatorProps.SuruUI;
  }
}
