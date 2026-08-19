import { Radio } from "@base-ui/react/radio";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useRadioGroupContext } from "../radio-group/radio-group.parts.jsx";

import "./radio.css";

// Root
// ----

/**
 * ラジオボタンの色です。
 */
export type RadioRootColor = Color;

/**
 * ラジオボタンの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"rounded"`: 標準的な角丸
 * - `"full"`: 完全な丸形
 */
export type RadioRootRadius = "none" | "rounded" | "full";

/**
 * ラジオボタンの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type RadioRootSize = Size;

/**
 * ラジオボタンのスタイルバリエーションです。
 *
 * - `"naked"`: 背景のないインジケーターのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type RadioRootVariant = "naked" | "liquid";

/**
 * {@link RadioRoot} が公開するラジオボタンのルート要素の状態です。
 */
export type RadioRootState = Radio.Root.State;

/**
 * {@link RadioRoot} に渡すプロパティーです。
 *
 * {@link RadioGroupRoot} 内では、グループに指定したスタイル値が子要素の指定より優先されます。
 * グループまたは子要素の値を変更すると、対応するスタイルと無効状態が更新されます。
 */
export type RadioRootProps = React.ComponentProps<typeof Radio.Root> & {
  /**
   * ラジオボタンの色を指定します。
   *
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
   *
   * @default "grey"
   */
  color?: RadioRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * 未指定時は `variant` が `"naked"` の場合に表示します。
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   */
  outlined?: boolean | undefined;

  /**
   * ラジオボタンの角丸を指定します。
   *
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
   *
   * @default "full"
   */
  radius?: RadioRootRadius | undefined;

  /**
   * ラジオボタンのサイズを指定します。
   *
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
   *
   * @default "md"
   */
  size?: RadioRootSize | undefined;

  /**
   * ラジオボタンのスタイルバリエーションを指定します。
   *
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
   *
   * @default "naked"
   */
  variant?: RadioRootVariant | undefined;
};

/**
 * ラジオボタンのルート要素です。
 */
export const RadioRoot: IComponent<RadioRootProps> = function SuiRadioRoot(props) {
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

/**
 * {@link RadioRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link RadioRootState} です。
   */
  export type State = RadioRootState;

  /**
   * {@link RadioRootProps} です。
   */
  export type Props = RadioRootProps;

  /**
   * {@link RadioRootColor} です。
   */
  export type Color = RadioRootColor;

  /**
   * {@link RadioRootRadius} です。
   */
  export type Radius = RadioRootRadius;

  /**
   * {@link RadioRootSize} です。
   */
  export type Size = RadioRootSize;

  /**
   * {@link RadioRootVariant} です。
   */
  export type Variant = RadioRootVariant;
}

/**
 * {@link RadioRoot} です。
 */
export const Root: IComponent<Root.Props> = RadioRoot;

// Indicator
// ---------

/**
 * {@link RadioIndicator} の状態です。
 */
export type RadioIndicatorState = {};

/**
 * {@link RadioIndicator} に渡すプロパティーです。
 */
export type RadioIndicatorProps = React.ComponentProps<typeof Radio.Indicator>;

/**
 * ラジオボタンのインジケーター要素です。
 *
 * チェック状態に応じて子要素の表示と非表示を切り替えます。
 */
export const RadioIndicator: IComponent<RadioIndicatorProps> = function SuiRadioIndicator(props) {
  const { className, ...otherProps } = props;

  return <Radio.Indicator {...otherProps} className={cn(className, "sui_radio_indicator")} />;
};

/**
 * {@link RadioIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link RadioIndicatorState} です。
   */
  export type State = RadioIndicatorState;

  /**
   * {@link RadioIndicatorProps} です。
   */
  export type Props = RadioIndicatorProps;
}

/**
 * {@link RadioIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = RadioIndicator;
