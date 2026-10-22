import { Input } from "@base-ui/react/input";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type TextareaContextSize,
  type TextareaContextColor,
  type TextareaContextRadius,
  type TextareaContextVariant,
  TextareaContext,
} from "./textarea.root.context.js";

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
export type TextareaRootColor = TextareaContextColor;

/**
 * テキストエリアの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 */
export type TextareaRootRadius = TextareaContextRadius;

/**
 * テキストエリアの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type TextareaRootSize = TextareaContextSize;

/**
 * テキストエリアの主な外観の種類です。
 *
 * - `"naked"`: 背景のないテキストエリア
 * - `"liquid"`: 薄い塗りつぶし
 */
export type TextareaRootVariant = TextareaContextVariant;

/**
 * {@link TextareaRoot} が持つ状態です。
 */
export type TextareaRootState = Override<TextareaContext, Input.State>;

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
     * @default true
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
     *
     * 指定しないときはブラウザーの既定行数になります。
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
     * @default "naked"
     */
    variant?: TextareaRootVariant | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Input>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // InputProps より:
      "value" | "defaultValue" | "onValueChange"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Input>,
    // `<textarea>` に存在しない `type` を除きます。
    keyof Render | keyof SuruUI | keyof BaseUI | "type"
  >;
}

/**
 * {@link TextareaRoot} に渡す props です。
 */
export type TextareaRootProps = TextareaRootProps.Render &
  TextareaRootProps.SuruUI &
  TextareaRootProps.BaseUI &
  TextareaRootProps.HTML;

export type ITextareaRoot = IComponent<TextareaRootProps>;

/**
 * テキストエリアのルートコンポーネントです。
 */
export const TextareaRoot: ITextareaRoot = function SuiTextareaRoot(props) {
  const {
    size = "md",
    color = "grey",
    style,
    radius = size,
    render = <textarea />,
    variant = "naked",
    outlined = true,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;
  const ctx = React.useMemo<TextareaContext>(
    () => ({ size, color, radius, variant, outlined }),
    [size, color, radius, variant, outlined],
  );

  return (
    <TextareaContext value={ctx}>
      <Input
        {...otherProps}
        {...proxyRenderProps<Input.State, TextareaRootState>((state) => ({ ...ctx, ...state }), {
          style,
          render,
          className: cn<TextareaRootState>(
            className,
            "sui_textarea",
            (state) => `sui_textarea-size_${state.size}`,
            (state) => `sui_textarea-color_${state.color}`,
            (state) => `sui_textarea-radius_${state.radius}`,
            (state) => `sui_textarea-variant_${state.variant}`,
            (state) => state.outlined && "sui_textarea-outlined",
            (state) => state.valid === true && "sui_textarea-valid",
            (state) => state.valid === false && "sui_textarea-invalid",
            (state) => state.valid === null && "sui_textarea-unverified",
            (state) => state.disabled && "sui_textarea-disabled",
            (state) => state.touched && "sui_textarea-touched",
            (state) => state.dirty && "sui_textarea-dirty",
            (state) => state.filled && "sui_textarea-filled",
            (state) => state.focused && "sui_textarea-focused",
          ),
        })}
        data-scope={dataScope}
      />
    </TextareaContext>
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
