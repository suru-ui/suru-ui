import { Radio } from "@base-ui/react/radio";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

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

/**
 * {@link RadioRoot} に渡す props です。
 */
export type RadioRootProps = React.ComponentProps<typeof Radio.Root> & {
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
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;
  const color = group?.color ?? colorProp;
  const radius = group?.radius ?? radiusProp;
  const variant = group?.variant ?? variantProp;
  const outlined = group?.outlined ?? outlinedProp;
  const disabled = group?.disabled ?? disabledProp;

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
      data-scope=""
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
  export type Props = RadioRootProps;

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

/**
 * {@link RadioIndicator} に渡す props です。
 */
export type RadioIndicatorProps = React.ComponentProps<typeof Radio.Indicator>;

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
  export type Props = RadioIndicatorProps;
}
