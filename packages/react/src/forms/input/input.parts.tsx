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
   * 指定可能な値はテーマの {@link Size} です。
   *
   * @default "md"
   */
  size?: Size | undefined;

  /**
   * テキスト入力欄のスタイルバリエーションを指定します。
   *
   * - `"naked"`: 背景のないテキスト入力欄
   * - `"liquid"`: 薄い塗りつぶし
   *
   * `outlined` を指定しない場合は、`"naked"` のときだけ枠線を表示します。
   *
   * @default "liquid"
   */
  variant?: "naked" | "liquid" | undefined;
};

/**
 * テキスト入力欄のルート要素です。
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
    color: colorProp = "grey",
    radius: radiusProp = "rounded",
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
      className={cn(
        className,
        "sui_input",
        "sui_action_group_item",
        `sui_input-size_${size}`,
        `sui_input-color_${color}`,
        `sui_input-radius_${radius}`,
        `sui_input-variant_${variant}`,
        outlined && "sui_input-outlined",
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
 * {@link InputRoot} の別名です。
 */
export const Root: Component<Root.Props> = InputRoot;
