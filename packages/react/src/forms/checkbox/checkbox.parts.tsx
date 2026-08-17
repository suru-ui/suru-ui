import { Checkbox } from "@base-ui/react/checkbox";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import { useCheckboxGroupContext } from "../checkbox-group/checkbox-group.parts.jsx";

import "./checkbox.css";

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
  size?: Size | undefined;

  /**
   * チェックボックスの色を指定します。
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * チェックボックスのスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないチェックマークのみ、枠線なし
   * - `"liquid"`: 薄い塗りつぶし
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

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
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * {@link CheckboxGroupRoot} 内では、グループの値が優先されます。
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * チェックボックスのルート要素です。
 *
 * @example
 * ```tsx
 * <CheckboxParts.Root color="blue">
 *   <CheckboxParts.Indicator>
 *     <CheckIcon />
 *   </CheckboxParts.Indicator>
 * </CheckboxParts.Root>
 * ```
 */
export const CheckboxRoot: Component<CheckboxRootProps> = function SuiCheckboxRoot(props) {
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
export const Root: Component<Root.Props> = CheckboxRoot;

/**
 * チェックボックスのインジケーター要素です。
 *
 * チェック状態に応じて子要素の表示・非表示を切り替えます。
 *
 * {@link CheckboxIndicator} の状態型として利用できます。
 *
 * @example
 * ```tsx
 * <CheckboxParts.Indicator>
 *   <CheckIcon />
 * </CheckboxParts.Indicator>
 * ```
 */
export type CheckboxIndicatorState = {};

/**
 * {@link CheckboxIndicator} に渡すプロパティーです。
 */
export type CheckboxIndicatorProps = React.ComponentProps<typeof Checkbox.Indicator>;

/**
 * {@link CheckboxIndicator} のインジケーター要素を表示します。
 */
export const CheckboxIndicator: Component<CheckboxIndicatorProps> = function SuiCheckboxIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Checkbox.Indicator {...otherProps} className={cn(className, "sui_checkbox_indicator")} />;
};

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
export const Indicator: Component<Indicator.Props> = CheckboxIndicator;
