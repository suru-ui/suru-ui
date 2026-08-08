import { Radio } from "@base-ui/react/radio";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import { useRadioGroupContext } from "../radio-group/radio-group.parts.jsx";

import "./radio.css";

/**
 * ラジオボタンのスタイルバリエーションです。
 *
 * {@link RadioRootProps} と {@link RadioGroupRootProps} で指定できます。
 */
export type RadioVariant = "naked" | "liquid";

/**
 * ラジオボタンの角丸です。
 *
 * {@link RadioRootProps} と {@link RadioGroupRootProps} で指定できます。
 */
export type RadioRadius = "none" | "rounded" | "full";

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
   * ラジオボタンのサイズを指定します。
   *
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * ラジオボタンの色を指定します。
   *
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
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
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
   *
   * @default "naked"
   */
  variant?: RadioVariant | undefined;

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
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * {@link RadioGroupRoot} 内では、グループの値が優先されます。
   * 値を変更すると、ラジオボタンのクラスが更新されます。
   *
   * @default "full"
   */
  radius?: RadioRadius | undefined;
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
  /**
   * {@link RadioRoot} の状態型です。
   */
  export type State = RadioRootState;

  /**
   * {@link RadioRoot} のプロパティー型です。
   */
  export type Props = RadioRootProps;
}

/**
 * {@link RadioRoot} の別名です。
 */
export const Root: Component<Root.Props> = RadioRoot;

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
 *
 * @example
 * ```tsx
 * <Radio.Indicator />
 * ```
 */
export const RadioIndicator: Component<RadioIndicatorProps> = function SuiRadioIndicator(props) {
  const { className, ...otherProps } = props;

  return <Radio.Indicator {...otherProps} className={cn(className, "sui_radio_indicator")} />;
};

export namespace Indicator {
  /**
   * {@link RadioIndicator} の状態型です。
   */
  export type State = RadioIndicatorState;

  /**
   * {@link RadioIndicator} のプロパティー型です。
   */
  export type Props = RadioIndicatorProps;
}

/**
 * {@link RadioIndicator} の別名です。
 */
export const Indicator: Component<Indicator.Props> = RadioIndicator;
