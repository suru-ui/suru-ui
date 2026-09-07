import { Input } from "@base-ui/react/input";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { useActionGroupContext } from "../action-group/action-group.parts.jsx";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./input.css";

// Root
// ----

/**
 * {@link InputRoot} の値が変更されたイベントの詳細です。
 */
export type InputRootChangeEventDetails = Input.ChangeEventDetails;

/**
 * {@link InputRoot} の値が変更された理由です。
 */
export type InputRootChangeEventReason = Input.ChangeEventReason;

/**
 * テキスト入力欄の配色です。
 */
export type InputRootColor = Color;

/**
 * テキスト入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type InputRootRadius = "none" | Size | "full";

/**
 * テキスト入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type InputRootSize = Size;

/**
 * 入力欄で使用できる入力項目の種類です。
 *
 * ボタンや選択系 (`"button"`、`"checkbox"`、`"radio"` など) は除きます。
 */
export type InputRootType = Exclude<
  React.HTMLInputTypeAttribute,
  "button" | "checkbox" | "color" | "image" | "radio" | "range" | "reset" | "submit"
>;

/**
 * テキスト入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のないテキスト入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type InputRootVariant = "naked" | "liquid";

/**
 * {@link InputRoot} の状態です。
 */
export type InputRootState = Input.State;

/**
 * {@link InputRoot} に渡すプロパティーです。
 */
export type InputRootProps = Omit<
  React.ComponentProps<typeof Input>,
  "children" | "size" | "type"
> & {
  /**
   * フォーカス時に枠線へ適用する色を指定します。
   *
   * @default "grey"
   */
  color?: InputRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * テキスト入力欄の角丸を指定します。
   *
   * 既定値は {@link InputRootProps.size|size}
   */
  radius?: InputRootRadius | undefined;

  /**
   * テキスト入力欄のサイズを指定します。
   *
   * @default "md"
   */
  size?: InputRootSize | undefined;

  /**
   * 入力項目です。
   *
   * @default "text"
   */
  type?: InputRootType | undefined;

  /**
   * テキスト入力欄の主な外観を指定します。
   *
   * @default "liquid"
   */
  variant?: InputRootVariant | undefined;
};

/**
 * テキスト入力欄のルートコンポーネントです。
 */
export const InputRoot: IComponent<InputRootProps> = function SuiInputRoot(props) {
  const actionGroupCtx = useActionGroupContext(true);
  const {
    size: sizeProp = "md",
    type = "text",
    color: colorProp = "grey",
    radius: radiusProp = sizeProp,
    variant: variantProp = "liquid",
    outlined: outlinedProp = false,
    className,
    ...otherProps
  } = props;
  const size = actionGroupCtx?.size ?? sizeProp;
  const color = actionGroupCtx?.color ?? colorProp;
  const radius = actionGroupCtx?.radius ?? radiusProp;
  const variant = actionGroupCtx?.variant ?? variantProp;
  const outlined = actionGroupCtx?.outlined ?? outlinedProp;

  return (
    <Input
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_input",
        "sui_action_group_item",
        `sui_input-size_${size}`,
        `sui_input-color_${color}`,
        `sui_input-radius_${radius}`,
        `sui_input-variant_${variant}`,
        outlined && "sui_input-outlined",
        (state) => state.valid === true && "sui_input-valid",
        (state) => state.valid === false && "sui_input-invalid",
        (state) => state.valid === null && "sui_input-unverified",
        (state) => state.disabled && "sui_input-disabled",
      )}
      data-scope=""
    />
  );
};

export { InputRoot as Root };

export namespace Root {
  /**
   * {@link InputRootState}
   */
  export type State = InputRootState;

  /**
   * {@link InputRootProps}
   */
  export type Props = InputRootProps;

  /**
   * {@link InputRootChangeEventDetails}
   */
  export type ChangeEventDetails = InputRootChangeEventDetails;

  /**
   * {@link InputRootChangeEventReason}
   */
  export type ChangeEventReason = InputRootChangeEventReason;

  /**
   * {@link InputRootColor}
   */
  export type Color = InputRootColor;

  /**
   * {@link InputRootRadius}
   */
  export type Radius = InputRootRadius;

  /**
   * {@link InputRootSize}
   */
  export type Size = InputRootSize;

  /**
   * {@link InputRootType}
   */
  export type Type = InputRootType;

  /**
   * {@link InputRootVariant}
   */
  export type Variant = InputRootVariant;
}
