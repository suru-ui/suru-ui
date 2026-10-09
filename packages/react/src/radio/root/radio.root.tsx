import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Radio } from "@base-ui/react/radio";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import {
  type RadioGroupContext,
  useRadioGroupContext,
} from "../../radio-group/root/radio-group.root.context.js";
import type { Override, IComponent } from "../../types.js";
import { RadioRootContext } from "./radio.root.context.js";

/**
 * ラジオボタンの配色です。
 */
export type RadioRootColor = Color;

/**
 * ラジオボタンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type RadioRootRadius = "none" | Size | "full" | "circle";

/**
 * ラジオボタンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type RadioRootSize = Size;

/**
 * ラジオボタンの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type RadioRootVariant = "naked" | "liquid";

/**
 * {@link RadioRoot} が持つ状態です。
 */
export type RadioRootState = Override<RadioGroupContext, Radio.Root.State>;

export namespace RadioRootProps {
  export type Render = RenderProps<RadioRootState>;

  export type SuruUI = {
    /**
     * ラジオボタンの配色を指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "grey"
     */
    color?: RadioRootColor | undefined;

    /**
     * ラジオボタンに枠線を表示するかどうかを指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ラジオボタンの角丸の大きさを指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "full"
     */
    radius?: RadioRootRadius | undefined;

    /**
     * ラジオボタンの大きさを指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "md"
     */
    size?: RadioRootSize | undefined;

    /**
     * ラジオボタンの主な外観を指定します。
     *
     * RadioGroup 内では、グループの値が優先されます。
     *
     * @default "liquid"
     */
    variant?: RadioRootVariant | undefined;
  };

  export type BaseUI<TValue = any> = Omit<
    Pick<
      React.ComponentProps<typeof Radio.Root<TValue>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NonNativeButtonProps より:
      | keyof NonNativeButtonProps
      // RadioRootProps より:
      | "id"
      | "value"
      | "disabled"
      | "required"
      | "readOnly"
      | "inputRef"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML<TValue = any> = Omit<
    React.ComponentProps<typeof Radio.Root<TValue>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link RadioRoot} に渡す props です。
 *
 * @template TValue 項目の値の型です。
 */
export type RadioRootProps<TValue = any> = RadioRootProps.Render &
  RadioRootProps.SuruUI &
  RadioRootProps.BaseUI<TValue> &
  RadioRootProps.HTML<TValue>;

/**
 * {@link RadioRoot} のコンポーネント型です。
 */
export interface IRadioRoot extends IComponent<RadioRootProps> {
  /**
   * @template TValue 項目の値の型です。
   */
  <TValue = any>(props: RadioRootProps<TValue>): IComponent.Return;
}

/**
 * ラジオボタンのルートコンポーネントです。
 */
export const RadioRoot: IRadioRoot = function SuiRadioRoot(props: RadioRootProps) {
  const ctx = useRadioGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    style,
    radius: radiusProp = "full",
    render,
    variant: variantProp = "liquid",
    disabled: disabledProp,
    outlined: outlinedProp = false,
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
    <Radio.Root
      {...otherProps}
      disabled={disabled}
      {...proxyRenderProps<Radio.Root.State, RadioRootState>(
        (state) => ({ ...styleState, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <RadioRootContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </RadioRootContext>
          ),
          className: cn<RadioRootState>(
            className,
            "sui_radio",
            (state) => `sui_radio-size_${state.size}`,
            (state) => `sui_radio-color_${state.color}`,
            (state) => `sui_radio-radius_${state.radius}`,
            (state) => `sui_radio-variant_${state.variant}`,
            (state) => state.outlined && "sui_radio-outlined",
            (state) => `sui_radio-orientation_${state.orientation}`,
            (state) => state.dirty && "sui_radio-dirty",
            (state) => state.valid === null && "sui_radio-unverified",
            (state) => state.valid === true && "sui_radio-valid",
            (state) => state.valid === false && "sui_radio-invalid",
            (state) => state.filled && "sui_radio-filled",
            (state) => state.checked && "sui_radio-checked",
            (state) => state.focused && "sui_radio-focused",
            (state) => state.touched && "sui_radio-touched",
            (state) => state.disabled && "sui_radio-disabled",
            (state) => state.readOnly && "sui_radio-readonly",
            (state) => state.required && "sui_radio-required",
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { RadioRoot as Root };

export namespace Root {
  export type State = RadioRootState;

  export type Props<TValue = any> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TValue> &
    Props.HTML<TValue>;

  export namespace Props {
    export type Render = RadioRootProps.Render;

    export type SuruUI = RadioRootProps.SuruUI;

    export type BaseUI<TValue = any> = RadioRootProps.BaseUI<TValue>;

    export type HTML<TValue = any> = RadioRootProps.HTML<TValue>;
  }

  export type Color = RadioRootColor;

  export type Radius = RadioRootRadius;

  export type Size = RadioRootSize;

  export type Variant = RadioRootVariant;
}
