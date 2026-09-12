import { Input } from "@base-ui/react/input";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./textarea.css";

// Root
// ----

/**
 * {@link TextareaRoot} の値が変更されたイベントの詳細です。
 */
export type TextareaRootChangeEventDetails = Input.ChangeEventDetails;

/**
 * {@link TextareaRoot} の値が変更された理由です。
 */
export type TextareaRootChangeEventReason = Input.ChangeEventReason;

/**
 * テキストエリアの配色です。
 */
export type TextareaRootColor = Color;

/**
 * テキストエリアの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type TextareaRootRadius = "none" | Size;

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
 * {@link TextareaRoot} が持つ状態です。
 */
export type TextareaRootState = Input.State;

export namespace TextareaRootProps {
  export type Render = RenderProps<TextareaRootState>;

  export type SuruUI = {
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
     * 既定値は {@link TextareaRootProps.size|size}
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // InputProps:
      "value" | "defaultValue" | "onValueChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TextareaRoot} に渡す props です。
 */
export type TextareaRootProps = TextareaRootProps.Render &
  TextareaRootProps.SuruUI &
  TextareaRootProps.BaseUI &
  TextareaRootProps.HTML;

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
    // @ts-expect-error
    "data-scope": dataScope = "",
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
      data-scope={dataScope}
    />
  );
};

export { TextareaRoot as Root };

export namespace Root {
  export type State = TextareaRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TextareaRootProps.Render;

    export type SuruUI = TextareaRootProps.SuruUI;

    export type BaseUI = TextareaRootProps.BaseUI;

    export type HTML = TextareaRootProps.HTML;
  }

  export type ChangeEventDetails = TextareaRootChangeEventDetails;

  export type ChangeEventReason = TextareaRootChangeEventReason;

  export type Color = TextareaRootColor;

  export type Radius = TextareaRootRadius;

  export type Size = TextareaRootSize;

  export type Variant = TextareaRootVariant;
}
