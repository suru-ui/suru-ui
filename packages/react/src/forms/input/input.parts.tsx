import { Input } from "@base-ui/react/input";
import type { Color, Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import useFocusType from "../../hooks/use-focus-type.js";
import type { Component } from "../../types.js";

import "./input.css";

/**
 * テキスト入力欄のルート要素の状態です。
 *
 * {@link InputRoot} が公開する状態型の別名です。
 */
export type InputRootState = Input.State;

/**
 * {@link InputRoot} に渡すプロパティーです。
 */
export type InputRootProps = Omit<React.ComponentProps<typeof Input>, "size"> & {
  /**
   * フォーカス時に枠線へ適用するアクセントカラーを指定します。
   *
   * 指定可能な値はテーマの {@link Color} です。
   *
   * `accentColor` はフォーカス中の枠線にだけ適用されます。
   *
   * @default "grey"
   */
  accentColor?: Color | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * 未指定時は `variant` が `"naked"` の場合に表示します。
   * `outlined` を指定した場合は、この値が `variant` による既定値より優先されます。
   */
  outlined?: boolean | undefined;

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
   * @default "naked"
   */
  variant?: "naked" | "liquid" | undefined;

  /**
   * テキスト入力欄の角丸を指定します。
   *
   * - `"none"`: 角を直角にする
   * - `"rounded"`: 標準的な角丸
   * - `"full"`: 完全な丸形
   *
   * 指定値は角丸の見た目だけを変更し、入力値やフォーカス状態は変更しません。
   *
   * @default "rounded"
   */
  radius?: "none" | "rounded" | "full" | undefined;
};

/**
 * テキスト入力欄のルート要素です。
 *
 * Base UI の {@link Input} をラップし、テーマに基づくスタイルクラスを適用します。
 * Field に組み込むと、検証状態が `data-*` 属性として自動的に付与されます。
 *
 * @example
 * ```tsx
 * <InputParts.Root placeholder="e.g. Colm Tuite" />
 * ```
 */
export const InputRoot: Component<InputRootProps> = function SuiInputRoot(props) {
  const {
    size: sizeProp = "md",
    radius: radiusProp = "rounded",
    variant: variantProp = "naked",
    outlined: outlinedProp = variantProp === "naked",
    accentColor: accentColorProp = "grey",
    className,
    onBlur,
    onFocus,
    onPointerDown,
    ...otherProps
  } = props;
  const { focusType, ...focusProps } = useFocusType({ onBlur, onFocus, onPointerDown });

  return (
    <Input
      {...otherProps}
      className={cn(
        className,
        "sui_input",
        `sui_input-size_${sizeProp}`,
        `sui_input-radius_${radiusProp}`,
        `sui_input-variant_${variantProp}`,
        `sui_input-accent_color_${accentColorProp}`,
        outlinedProp && "sui_input-outlined",
        (state) => state.disabled && "sui_input-disabled",
      )}
      {...focusProps}
      data-focus-type={focusType}
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
