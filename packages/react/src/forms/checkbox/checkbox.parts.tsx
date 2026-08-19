import { Checkbox } from "@base-ui/react/checkbox";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useCheckboxGroupContext } from "../checkbox-group/checkbox-group.parts.jsx";

import "./checkbox.css";

// Root
// ----

/**
 * チェックボックスの色です。
 */
export type CheckboxRootColor = Color;

/**
 * チェックボックスの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type CheckboxRootRadius = "none" | Size | "full";

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type CheckboxRootSize = Size;

/**
 * チェックボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景のないチェックマークのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxRootVariant = "naked" | "liquid";

/**
 * {@link CheckboxRoot} の状態です。
 */
export type CheckboxRootState = Checkbox.Root.State;

/**
 * {@link CheckboxRoot} に渡すプロパティーです。
 */
export type CheckboxRootProps = React.ComponentProps<typeof Checkbox.Root> & {
  /**
   * チェックボックスの色を指定します。
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "grey"
   */
  color?: CheckboxRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * 未指定時は `variant` が `"naked"` の場合に表示します。
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   */
  outlined?: boolean | undefined;

  /**
   * チェックボックスの角丸を指定します。
   *
   * 既定値は {@link CheckboxRootProps.size|size} です。
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   */
  radius?: CheckboxRootRadius | undefined;

  /**
   * チェックボックスのサイズを指定します。
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "md"
   */
  size?: CheckboxRootSize | undefined;

  /**
   * チェックボックスのスタイルバリエーションを指定します。
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "naked"
   */
  variant?: CheckboxRootVariant | undefined;
};

/**
 * チェックボックスのルート要素です。
 */
export const CheckboxRoot: IComponent<CheckboxRootProps> = function SuiCheckboxRoot(props) {
  const group = useCheckboxGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = sizeProp,
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
    <Checkbox.Root
      {...otherProps}
      disabled={disabled}
      className={cn(
        className,
        "sui_checkbox",
        `sui_checkbox-size_${size}`,
        `sui_checkbox-color_${color}`,
        `sui_checkbox-radius_${radius}`,
        `sui_checkbox-variant_${variant}`,
        groupOutlined && "sui_checkbox-outlined",
        disabled && "sui_checkbox-disabled",
      )}
    />
  );
};

/**
 * {@link CheckboxRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link CheckboxRootState} です。
   */
  export type State = CheckboxRootState;

  /**
   * {@link CheckboxRootProps} です。
   */
  export type Props = CheckboxRootProps;

  /**
   * {@link CheckboxRootColor} です。
   */
  export type Color = CheckboxRootColor;

  /**
   * {@link CheckboxRootRadius} です。
   */
  export type Radius = CheckboxRootRadius;

  /**
   * {@link CheckboxRootSize} です。
   */
  export type Size = CheckboxRootSize;

  /**
   * {@link CheckboxRootVariant} です。
   */
  export type Variant = CheckboxRootVariant;
}

/**
 * {@link CheckboxRoot} です。
 */
export const Root: IComponent<Root.Props> = CheckboxRoot;

// Indicator
// ---------

/**
 * チェックボックスのインジケーター要素です。
 *
 * チェック状態に応じて子要素の表示・非表示を切り替えます。
 *
 * {@link CheckboxIndicator} の状態型として利用できます。
 */
export type CheckboxIndicatorState = {};

/**
 * {@link CheckboxIndicator} に渡すプロパティーです。
 */
export type CheckboxIndicatorProps = React.ComponentProps<typeof Checkbox.Indicator>;

/**
 * {@link CheckboxIndicator} のインジケーター要素を表示します。
 */
export const CheckboxIndicator: IComponent<CheckboxIndicatorProps> = function SuiCheckboxIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Checkbox.Indicator {...otherProps} className={cn(className, "sui_checkbox_indicator")} />;
};

/**
 * {@link CheckboxIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link CheckboxIndicatorState} です。
   */
  export type State = CheckboxIndicatorState;

  /**
   * {@link CheckboxIndicatorProps} です。
   */
  export type Props = CheckboxIndicatorProps;
}

/**
 * {@link CheckboxIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = CheckboxIndicator;
