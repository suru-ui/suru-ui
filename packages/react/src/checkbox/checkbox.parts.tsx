import { Checkbox } from "@base-ui/react/checkbox";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { useCheckboxGroupContext } from "../checkbox-group/checkbox-group.parts.jsx";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./checkbox.css";

// Root
// ----

/**
 * チェックボックスの選択状態が変更されたイベントの詳細です。
 */
export type CheckboxRootChangeEventDetails = Checkbox.Root.ChangeEventDetails;

/**
 * チェックボックスの選択状態が変更された理由です。
 */
export type CheckboxRootChangeEventReason = Checkbox.Root.ChangeEventReason;

/**
 * チェックボックスの配色です。
 */
export type CheckboxRootColor = Color;

/**
 * チェックボックスの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type CheckboxRootRadius = "none" | Size | "full";

/**
 * チェックボックスの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CheckboxRootSize = Size;

/**
 * チェックボックスの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type CheckboxRootVariant = "naked" | "liquid";

/**
 * {@link CheckboxRoot} が持つ状態です。
 */
export type CheckboxRootState = Checkbox.Root.State;

/**
 * {@link CheckboxRoot} に渡す props です。
 */
export type CheckboxRootProps = React.ComponentProps<typeof Checkbox.Root> & {
  /**
   * チェックボックスの配色を指定します。
   *
   * CheckboxGroup 内では、グループの値が優先されます。
   *
   * @default "grey"
   */
  color?: CheckboxRootColor | undefined;

  /**
   * チェックボックスに枠線を表示するかどうかを指定します。
   *
   * CheckboxGroup 内では、グループの値が優先されます。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * チェックボックスの角丸の大きさを指定します。
   *
   * CheckboxGroup 内では、グループの値が優先されます。
   *
   * 既定値は {@link CheckboxRootProps.size|size}
   */
  radius?: CheckboxRootRadius | undefined;

  /**
   * チェックボックスの大きさを指定します。
   *
   * CheckboxGroup 内では、グループの値が優先されます。
   *
   * @default "md"
   */
  size?: CheckboxRootSize | undefined;

  /**
   * チェックボックスの主な外観を指定します。
   *
   * CheckboxGroup 内では、グループの値が優先されます。
   *
   * @default "liquid"
   */
  variant?: CheckboxRootVariant | undefined;
};

/**
 * チェックボックスのルートコンポーネントです。
 */
export const CheckboxRoot: IComponent<CheckboxRootProps> = function SuiCheckboxRoot(props) {
  const group = useCheckboxGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = sizeProp,
    variant: variantProp = "liquid",
    disabled: disabledProp = false,
    outlined: outlinedProp = false,
    className,
    ...otherProps
  } = props;
  const size = group?.size ?? sizeProp;
  const color = group?.color ?? colorProp;
  const radius = group?.radius ?? radiusProp;
  const variant = group?.variant ?? variantProp;
  const outlined = group?.outlined ?? outlinedProp;
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
        outlined && "sui_checkbox-outlined",
        (state) => state.checked && "sui_checkbox-checked",
        (state) => state.indeterminate && "sui_checkbox-indeterminate",
        (state) => state.disabled && "sui_checkbox-disabled",
      )}
      data-scope=""
    />
  );
};

export { CheckboxRoot as Root };

export namespace Root {
  /**
   * {@link CheckboxRootState}
   */
  export type State = CheckboxRootState;

  /**
   * {@link CheckboxRootProps}
   */
  export type Props = CheckboxRootProps;

  /**
   * {@link CheckboxRootChangeEventDetails}
   */
  export type ChangeEventDetails = CheckboxRootChangeEventDetails;

  /**
   * {@link CheckboxRootChangeEventReason}
   */
  export type ChangeEventReason = CheckboxRootChangeEventReason;

  /**
   * {@link CheckboxRootColor}
   */
  export type Color = CheckboxRootColor;

  /**
   * {@link CheckboxRootRadius}
   */
  export type Radius = CheckboxRootRadius;

  /**
   * {@link CheckboxRootSize}
   */
  export type Size = CheckboxRootSize;

  /**
   * {@link CheckboxRootVariant}
   */
  export type Variant = CheckboxRootVariant;
}

// Indicator
// ---------

/**
 * {@link CheckboxIndicator} が持つ状態です。
 */
export type CheckboxIndicatorState = Checkbox.Indicator.State;

/**
 * {@link CheckboxIndicator} に渡す props です。
 */
export type CheckboxIndicatorProps = React.ComponentProps<typeof Checkbox.Indicator>;

/**
 * チェックボックスのインジケーターコンポーネントです。
 */
export const CheckboxIndicator: IComponent<CheckboxIndicatorProps> = function SuiCheckboxIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Checkbox.Indicator {...otherProps} className={cn(className, "sui_checkbox_indicator")} />;
};

export { CheckboxIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link CheckboxIndicatorState}
   */
  export type State = CheckboxIndicatorState;

  /**
   * {@link CheckboxIndicatorProps}
   */
  export type Props = CheckboxIndicatorProps;
}
