import { Checkbox } from "@base-ui/react/checkbox";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import {
  type CheckboxGroupContext,
  useCheckboxGroupContext,
} from "../../checkbox-group/root/checkbox-group.root.context.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { CheckboxRootContext } from "./checkbox.root.context.js";

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
export type CheckboxRootState = Override<CheckboxGroupContext, Checkbox.Root.State>;

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
     * @default true
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
     * @default "naked"
     */
    variant?: CheckboxRootVariant | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Checkbox.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NonNativeButtonProps より:
      | keyof NonNativeButtonProps
      // CheckboxRootProps より:
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
      | "value"
    >,
    keyof Render | keyof SuruUI
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

export type ICheckboxRoot = IComponent<CheckboxRootProps>;

/**
 * チェックボックスのルートコンポーネントです。
 */
export const CheckboxRoot: ICheckboxRoot = function SuiCheckboxRoot(props) {
  const ctx = useCheckboxGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    style,
    radius: radiusProp = sizeProp,
    render,
    variant: variantProp = "naked",
    disabled: disabledProp,
    outlined: outlinedProp = true,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const size = ctx?.size ?? sizeProp;
  const color = ctx?.color ?? colorProp;
  const radius = ctx?.radius ?? radiusProp;
  const variant = ctx?.variant ?? variantProp;
  const outlined = ctx?.outlined ?? outlinedProp;
  const disabled = ctx?.disabled || disabledProp;
  const orientation = ctx?.orientation ?? "vertical";
  const styleState = React.useMemo(
    () => ({ size, color, radius, variant, outlined, orientation }),
    [color, orientation, outlined, radius, size, variant],
  );

  return (
    <Checkbox.Root
      {...otherProps}
      disabled={disabled}
      {...proxyRenderProps<Checkbox.Root.State, CheckboxRootState>(
        (state) => ({ ...styleState, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <CheckboxRootContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </CheckboxRootContext>
          ),
          className: cn<CheckboxRootState>(
            className,
            "sui_checkbox",
            (state) => `sui_checkbox-size_${state.size}`,
            (state) => `sui_checkbox-color_${state.color}`,
            (state) => `sui_checkbox-radius_${state.radius}`,
            (state) => `sui_checkbox-variant_${state.variant}`,
            (state) => state.outlined && "sui_checkbox-outlined",
            (state) => `sui_checkbox-orientation_${state.orientation}`,
            (state) => state.checked && "sui_checkbox-checked",
            (state) => state.indeterminate && "sui_checkbox-indeterminate",
            (state) => state.disabled && "sui_checkbox-disabled",
            (state) => state.readOnly && "sui_checkbox-readonly",
            (state) => state.required && "sui_checkbox-required",
            (state) => state.touched && "sui_checkbox-touched",
            (state) => state.dirty && "sui_checkbox-dirty",
            (state) => state.filled && "sui_checkbox-filled",
            (state) => state.focused && "sui_checkbox-focused",
            (state) => state.valid === false && "sui_checkbox-invalid",
            (state) => state.valid === true && "sui_checkbox-valid",
            (state) => state.valid === null && "sui_checkbox-unverified",
          ),
        },
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
