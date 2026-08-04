import { Radio } from "@base-ui/react/radio";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import { useRadioGroupContext } from "../radio-group/radio-group.parts.jsx";

import "./radio.css";

/**
 * ラジオボタンのルート要素の状態です。
 */
export type RadioRootState = Radio.Root.State;

export type RadioRootProps = React.ComponentProps<typeof Radio.Root> & {
  /**
   * ラジオボタンのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * ラジオボタンの色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * ラジオボタンのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないインジケーターのみ、枠線なし
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * ラジオボタンの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * @default "full"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * ラジオボタンのルート要素です。
 *
 * @example
 * ```tsx
 * <Radio.Root value="option-a">
 *   <Radio.Indicator />
 * </Radio.Root>
 * ```
 */
export const RadioRoot: Component<RadioRootProps> = function SuiRadioRoot(props) {
  const group = useRadioGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "full",
    variant: variantProp = "naked",
    disabled: disabledProp = false,
    outlined = variantProp === "naked",
    className,
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;
  const color = group?.color ?? colorProp;
  const radius = group?.radius ?? radiusProp;
  const variant = group?.variant ?? variantProp;
  const groupOutlined = group?.outlined ?? outlined;
  const disabled = group?.disabled || disabledProp;

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
        groupOutlined && "sui_radio-outlined",
        disabled && "sui_radio-disabled",
      )}
    />
  );
};

export namespace Root {
  export type State = RadioRootState;
  export type Props = RadioRootProps;
}

export const Root: Component<Root.Props> = RadioRoot;

/**
 * ラジオボタンのインジケーター要素です。
 *
 * チェック状態に応じて子要素の表示・非表示を切り替えます。
 *
 * @example
 * ```tsx
 * <Radio.Indicator />
 * ```
 */
export type RadioIndicatorState = {};

export type RadioIndicatorProps = React.ComponentProps<typeof Radio.Indicator>;

export const RadioIndicator: Component<RadioIndicatorProps> = function SuiRadioIndicator(props) {
  const { className, ...otherProps } = props;

  return <Radio.Indicator {...otherProps} className={cn(className, "sui_radio_indicator")} />;
};

export namespace Indicator {
  export type State = RadioIndicatorState;
  export type Props = RadioIndicatorProps;
}

export const Indicator: Component<Indicator.Props> = RadioIndicator;
