import { Input } from "@base-ui/react/input";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./textarea.css";

// Root
// ----

/**
 * テキストエリアの色です。
 */
export type TextareaRootColor = Color;

/**
 * テキストエリアの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type TextareaRootRadius = "none" | Size | "full";

/**
 * テキストエリアの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type TextareaRootSize = Size;

/**
 * テキストエリアの主な外観の種類です。
 *
 * - `"naked"`: 背景のないテキストエリア
 * - `"liquid"`: 薄い塗りつぶし
 */
export type TextareaRootVariant = "naked" | "liquid";

/**
 * {@link TextareaRoot} の値が変更された理由です。
 */
export type TextareaRootChangeEventReason = Input.ChangeEventReason;

/**
 * {@link TextareaRoot} の値が変更されたイベントの詳細です。
 */
export type TextareaRootChangeEventDetails = Input.ChangeEventDetails;

/**
 * {@link TextareaRoot} の状態です。
 */
export type TextareaRootState = Input.State;

/**
 * {@link TextareaRoot} に渡すプロパティーです。
 */
export type TextareaRootProps = Omit<
  React.ComponentProps<typeof Input>,
  "children" | "render" | "size" | "type"
> & {
  /**
   * フォーカス時に枠線へ適用する色を指定します。
   *
   * @default "grey"
   */
  color?: TextareaRootColor | undefined;

  /**
   * 枠線を表示するかどうかを指定します。
   *
   * @default false
   */
  outlined?: boolean | undefined;

  /**
   * テキストエリアの角丸を指定します。
   *
   * 既定値は {@link TextareaRootProps.size|size} です。
   */
  radius?: TextareaRootRadius | undefined;

  /**
   * テキストエリアの表示行数を指定します。
   */
  rows?: number | undefined;

  /**
   * テキストエリアのサイズを指定します。
   *
   * @default "md"
   */
  size?: TextareaRootSize | undefined;

  /**
   * テキストエリアの主な外観を指定します。
   *
   * @default "liquid"
   */
  variant?: TextareaRootVariant | undefined;
};

/**
 * テキストエリアのルートコンポーネントです。
 */
export const TextareaRoot: IComponent<TextareaRootProps> = function SuiTextareaRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    outlined = false,
    className,
    ...otherProps
  } = props;

  return (
    <Input
      {...otherProps}
      render={<textarea />}
      className={cn(
        className,
        "sui_textarea",
        `sui_textarea-size_${size}`,
        `sui_textarea-color_${color}`,
        `sui_textarea-radius_${radius}`,
        `sui_textarea-variant_${variant}`,
        outlined && "sui_textarea-outlined",
        (state) => state.valid === true && "sui_textarea-valid",
        (state) => state.valid === false && "sui_textarea-invalid",
        (state) => state.valid === null && "sui_textarea-unverified",
        (state) => state.disabled && "sui_textarea-disabled",
      )}
    />
  );
};

/**
 * {@link TextareaRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link TextareaRootState} です。
   */
  export type State = TextareaRootState;

  /**
   * {@link TextareaRootProps} です。
   */
  export type Props = TextareaRootProps;

  /**
   * {@link TextareaRootChangeEventDetails} です。
   */
  export type ChangeEventDetails = TextareaRootChangeEventDetails;

  /**
   * {@link TextareaRootChangeEventReason} です。
   */
  export type ChangeEventReason = TextareaRootChangeEventReason;

  /**
   * {@link TextareaRootColor} です。
   */
  export type Color = TextareaRootColor;

  /**
   * {@link TextareaRootRadius} です。
   */
  export type Radius = TextareaRootRadius;

  /**
   * {@link TextareaRootSize} です。
   */
  export type Size = TextareaRootSize;

  /**
   * {@link TextareaRootVariant} です。
   */
  export type Variant = TextareaRootVariant;
}

/**
 * {@link TextareaRoot} です。
 */
export const Root: IComponent<Root.Props> = TextareaRoot;
