import { Input } from "@base-ui/react/input";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./input.css";

/**
 * テキスト入力欄のルート要素の状態です。
 */
export type InputRootState = Input.State;

/**
 * テキスト入力欄のルート要素のプロパティーです。
 */
export type InputRootProps = Omit<React.ComponentProps<typeof Input>, "size"> & {
  /**
   * 枠線を表示するかどうかを指定します。
   */
  outlined?: boolean | undefined;

  /**
   * テキスト入力欄のサイズを指定します。
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
    variant: variantProp = "naked",
    radius: radiusProp = "rounded",
    outlined: outlinedProp = variantProp === "naked",
    className,
    ...otherProps
  } = props;

  return (
    <Input
      {...otherProps}
      className={cn(
        className,
        "sui_input",
        `sui_input-size_${sizeProp}`,
        `sui_input-variant_${variantProp}`,
        `sui_input-radius_${radiusProp}`,
        outlinedProp && "sui_input-outlined",
        (state) => state.disabled && "sui_input-disabled",
      )}
    />
  );
};

export namespace Root {
  export type State = InputRootState;
  export type Props = InputRootProps;
}

export const Root: Component<Root.Props> = InputRoot;
