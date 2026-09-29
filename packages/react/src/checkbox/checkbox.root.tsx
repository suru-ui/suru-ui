import { Checkbox } from "@base-ui/react/checkbox";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import { useCheckboxGroupContext } from "../checkbox-group/checkbox-group.context.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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
 * - `"circle"`: 完全な丸形
 */
export type CheckboxRootRadius = "none" | Size | "full" | "circle";

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

export namespace CheckboxRootProps {
  export type Render = RenderProps<CheckboxRootState>;

  export type SuruUI = {
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
     * 既定値は {@link CheckboxRootProps.size|size} です。
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Checkbox.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NonNativeButtonProps:
      | keyof NonNativeButtonProps
      // CheckboxRootProps:
      | "id"
      | "name"
      | "form"
      | "checked"
      | "defaultChecked"
      | "disabled"
      | "onCheckedChange"
      | "readOnly"
      | "required"
      | "indeterminate"
      | "inputRef"
      | "parent"
      | "uncheckedValue"
      | "value",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Checkbox.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link CheckboxRoot} に渡す props です。
 */
export type CheckboxRootProps = CheckboxRootProps.Render &
  CheckboxRootProps.SuruUI &
  CheckboxRootProps.BaseUI &
  CheckboxRootProps.HTML;

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
      data-scope={dataScope}
    />
  );
};

export { CheckboxRoot as Root };

export namespace Root {
  export type State = CheckboxRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = CheckboxRootProps.Render;

    export type SuruUI = CheckboxRootProps.SuruUI;

    export type BaseUI = CheckboxRootProps.BaseUI;

    export type HTML = CheckboxRootProps.HTML;
  }

  export type ChangeEventDetails = CheckboxRootChangeEventDetails;

  export type ChangeEventReason = CheckboxRootChangeEventReason;

  export type Color = CheckboxRootColor;

  export type Radius = CheckboxRootRadius;

  export type Size = CheckboxRootSize;

  export type Variant = CheckboxRootVariant;
}
