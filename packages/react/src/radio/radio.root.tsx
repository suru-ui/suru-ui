import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Radio } from "@base-ui/react/radio";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { useRadioGroupContext } from "../radio-group/radio-group.context.js";
import type { IComponent } from "../types.js";

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
 */
export type RadioRootRadius = "none" | Size | "full";

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
export type RadioRootState = Radio.Root.State;

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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Radio.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NonNativeButtonProps:
      | keyof NonNativeButtonProps
      // RadioRootProps:
      | "id"
      | "value"
      | "disabled"
      | "required"
      | "readOnly"
      | "inputRef",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Radio.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link RadioRoot} に渡す props です。
 */
export type RadioRootProps = RadioRootProps.Render &
  RadioRootProps.SuruUI &
  RadioRootProps.BaseUI &
  RadioRootProps.HTML;

/**
 * ラジオボタンのルートコンポーネントです。
 */
export const RadioRoot: IComponent<RadioRootProps> = function SuiRadioRoot(props) {
  const group = useRadioGroupContext(true);
  const {
    size: sizeProp = "md",
    color: colorProp = "grey",
    radius: radiusProp = "full",
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
        outlined && "sui_radio-outlined",
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
      )}
      data-scope={dataScope}
    />
  );
};

export { RadioRoot as Root };

export namespace Root {
  export type State = RadioRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = RadioRootProps.Render;

    export type SuruUI = RadioRootProps.SuruUI;

    export type BaseUI = RadioRootProps.BaseUI;

    export type HTML = RadioRootProps.HTML;
  }

  export type Color = RadioRootColor;

  export type Radius = RadioRootRadius;

  export type Size = RadioRootSize;

  export type Variant = RadioRootVariant;
}
