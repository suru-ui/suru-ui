import { Checkbox } from "@base-ui/react/checkbox";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";
import { useCheckboxGroupContext } from "../checkbox-group/checkbox-group.parts.jsx";

import "./checkbox.css";

/**
 * チェックボックスのルート要素の状態です。
 */
export type CheckboxRootState = Checkbox.Root.State;

export type CheckboxRootProps = React.ComponentProps<typeof Checkbox.Root> & {
  /**
   * チェックボックスのサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * チェックボックスの色を指定します。
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
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * チェックボックスの角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
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

export namespace Root {
  export type State = CheckboxRootState;
  export type Props = CheckboxRootProps;
}

export const Root: Component<Root.Props> = CheckboxRoot;

/**
 * チェックボックスのインジケーター要素です。
 *
 * チェック状態に応じて子要素の表示・非表示を切り替えます。
 *
 * @example
 * ```tsx
 * <CheckboxParts.Indicator>
 *   <CheckIcon />
 * </CheckboxParts.Indicator>
 * ```
 */
export type CheckboxIndicatorState = {};

export type CheckboxIndicatorProps = React.ComponentProps<typeof Checkbox.Indicator>;

export const CheckboxIndicator: Component<CheckboxIndicatorProps> = function SuiCheckboxIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Checkbox.Indicator {...otherProps} className={cn(className, "sui_checkbox_indicator")} />;
};

export namespace Indicator {
  export type State = CheckboxIndicatorState;
  export type Props = CheckboxIndicatorProps;
}

export const Indicator: Component<Indicator.Props> = CheckboxIndicator;
