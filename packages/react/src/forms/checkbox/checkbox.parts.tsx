import { Checkbox } from "@base-ui/react/checkbox";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useCheckboxGroupContext } from "../checkbox-group/checkbox-group.parts.jsx";

import "./checkbox.css";

// Types
// -----

/**
 * チェックボックスの色です。
 */
export type CheckboxColor = Color;

/**
 * チェックボックスの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"rounded"`: 標準的な角丸
 * - `"full"`: 完全な丸形
 */
export type CheckboxRadius = "none" | "rounded" | "full";

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type CheckboxSize = Size;

/**
 * チェックボックスの主な外観の種類です。
 *
 * - `"naked"`: 背景のないチェックマークのみ、枠線なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxVariant = "naked" | "liquid";

// Root
// ----

/**
 * チェックボックスのルート要素の状態です。
 *
 * {@link CheckboxRoot} が公開する状態型の別名です。
 */
export type CheckboxRootState = Checkbox.Root.State;

/**
 * {@link CheckboxRoot} に渡すプロパティーです。
 */
export type CheckboxRootProps = React.ComponentProps<typeof Checkbox.Root> & {
  /**
   * チェックボックスのサイズを指定します。
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "md"
   */
  size?: CheckboxSize | undefined;

  /**
   * チェックボックスの色を指定します。
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "grey"
   */
  color?: CheckboxColor | undefined;

  /**
   * チェックボックスのスタイルバリエーションを指定します。
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "naked"
   */
  variant?: CheckboxVariant | undefined;

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
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "rounded"
   */
  radius?: CheckboxRadius | undefined;
};

/**
 * チェックボックスのルート要素です。
 */
export const CheckboxRoot: IComponent<CheckboxRootProps> = function SuiCheckboxRoot(props) {
  const group = useCheckboxGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "rounded",
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
   * {@link CheckboxRoot} の状態型です。
   */
  export type State = CheckboxRootState;

  /**
   * {@link CheckboxRoot} のプロパティー型です。
   */
  export type Props = CheckboxRootProps;
}

/**
 * {@link CheckboxRoot} の別名です。
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
   * {@link CheckboxIndicator} の状態型です。
   */
  export type State = CheckboxIndicatorState;

  /**
   * {@link CheckboxIndicator} のプロパティー型です。
   */
  export type Props = CheckboxIndicatorProps;
}

/**
 * {@link CheckboxIndicator} の別名です。
 */
export const Indicator: IComponent<Indicator.Props> = CheckboxIndicator;
