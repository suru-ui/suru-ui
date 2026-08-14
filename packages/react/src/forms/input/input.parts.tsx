import { Input } from "@base-ui/react/input";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import { useActionGroupContext } from "../../layout/action-group/action-group.parts.jsx";
import type { Component } from "../../types.js";

import "./input.css";

// Root
// ----

/**
 * {@link InputRoot} の状態です。
 */
export type InputRootState = Input.State;

/**
 * {@link InputRoot} に渡すプロパティーです。
 */
export type InputRootProps = Omit<React.ComponentProps<typeof Input>, "size"> & {
  /**
   * フォーカス時に枠線へ適用する色を指定します。
   *
   * @default "grey"
   */
  color?: Color | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * テキスト入力欄の角丸を指定します。
   *
   * デフォルト値は {@link InputRootProps.size|size} です。
   *
   * - `"none"`: 角を直角にする
   * - `"sm"`: 小さい角丸
   * - `"md"`: 標準的な角丸
   * - `"lg"`: 大きい角丸
   * - `"full"`: 完全な丸形
   */
  radius?: "none" | Size | "full" | undefined;

  /**
   * テキスト入力欄のサイズを指定します。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * 入力項目です。
   *
   * @default "text"
   */
  type?:
    | Exclude<
        React.HTMLInputTypeAttribute,
        "button" | "checkbox" | "color" | "image" | "radio" | "range" | "reset" | "submit"
      >
    | undefined;

  /**
   * テキスト入力欄のスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないテキスト入力欄
   * - `"liquid"`: 薄い塗りつぶし
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;
};

/**
 * テキスト入力欄のルートコンポーネントです。
 *
 * @example
 * ```tsx
 * <InputParts.Root placeholder="田中 太郎" />
 * ```
 */
export const InputRoot: Component<InputRootProps> = function SuiInputRoot(props) {
  const actionGroupCtx = useActionGroupContext(true);
  const {
    size: sizeProp = "md",
    type = "text",
    color: colorProp = "grey",
    radius: radiusProp,
    variant: variantProp = "liquid",
    outlined: outlinedProp = false,
    className,
    ...otherProps
  } = props;
  const size = actionGroupCtx?.size ?? sizeProp;
  const color = actionGroupCtx?.color ?? colorProp;
  const radius = actionGroupCtx?.radius ?? radiusProp ?? size;
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
    />
  );
};

/**
 * {@link InputRoot} の状態とプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link InputRoot} の状態型です。
   */
  export type State = InputRootState;

  /**
   * {@link InputRoot} のプロパティー型です。
   */
  export type Props = InputRootProps;
}

/**
 * {@link InputRoot} です。
 */
export const Root: Component<Root.Props> = InputRoot;
