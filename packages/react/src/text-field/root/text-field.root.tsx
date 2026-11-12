import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { DISABLE_FOCUS_ON_CLICK_DATA } from "../_text-field.jsx";
import {
  type TextFieldContextSize,
  type TextFieldContextColor,
  type TextFieldContextRadius,
  type TextFieldContextVariant,
  TextFieldContext,
} from "./text-field.root.context.js";

/** 文字入力欄の配色です。 */
export type TextFieldRootColor = TextFieldContextColor;

/**
 * 文字入力欄の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 * - `"circle"`: 完全な円形
 */
export type TextFieldRootRadius = TextFieldContextRadius;

/**
 * 文字入力欄の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type TextFieldRootSize = TextFieldContextSize;

/**
 * 文字入力欄の主な外観の種類です。
 *
 * - `"naked"`: 背景のない文字入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type TextFieldRootVariant = TextFieldContextVariant;

/**
 * {@link TextFieldRoot} が持つ状態です。
 */
export type TextFieldRootState = TextFieldContext;

export namespace TextFieldRootProps {
  export type Render = RenderProps<TextFieldRootState>;

  export type SuruUI = {
    /**
     * フォーカス時に枠線へ適用する色を指定します。
     *
     * @default "grey"
     */
    color?: TextFieldRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default true
     */
    outlined?: boolean | undefined;

    /**
     * 文字入力欄の角丸を指定します。
     *
     * 既定値は {@link TextFieldRootProps.size|size}。
     */
    radius?: TextFieldRootRadius | undefined;

    /**
     * 文字入力欄のサイズを指定します。
     *
     * @default "md"
     */
    size?: TextFieldRootSize | undefined;

    /**
     * 文字入力欄の主な外観を指定します。
     *
     * @default "naked"
     */
    variant?: TextFieldRootVariant | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TextFieldRoot} に渡す props です。
 */
export type TextFieldRootProps = TextFieldRootProps.Render &
  TextFieldRootProps.SuruUI &
  TextFieldRootProps.BaseUI &
  TextFieldRootProps.HTML;

export type ITextFieldRoot = IComponent<TextFieldRootProps>;

/**
 * 文字入力欄の入力欄と Addon をまとめるルート要素です。
 *
 * 指定したスタイルプロパティーは、子パーツへ継承されます。
 */
export const TextFieldRoot: ITextFieldRoot = (props) => {
  const {
    size = "md",
    color = "grey",
    radius = size,
    onClick,
    variant = "naked",
    outlined = true,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const handleClick: NonNullable<TextFieldRootProps["onClick"]> = (evt) => {
    onClick?.(evt);
    if (evt.defaultPrevented || !(evt.target instanceof Element)) {
      return;
    }

    if (
      evt.target.closest(".sui_text_field_input") !== null ||
      evt.target.closest(`[${DISABLE_FOCUS_ON_CLICK_DATA}="true"]`) !== null
    ) {
      return;
    }

    const input = evt.currentTarget.querySelector<HTMLInputElement>(".sui_text_field_input");

    if (input !== null && !input.disabled) {
      input.focus();
    }
  };
  const ctx = React.useMemo<TextFieldContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      outlined,
    }),
    [size, color, radius, variant, outlined],
  );
  const element = useRender({
    props: [
      otherDivProps,
      {
        onClick: handleClick,
        className: cn<TextFieldRootState>(
          "sui_text_field",
          (state) => `sui_text_field-size_${state.size}`,
          (state) => `sui_text_field-color_${state.color}`,
          (state) => `sui_text_field-radius_${state.radius}`,
          (state) => `sui_text_field-variant_${state.variant}`,
          (state) => state.outlined && "sui_text_field-outlined",
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "div",
  });

  return <TextFieldContext value={ctx}>{element}</TextFieldContext>;
};

export { TextFieldRoot as Root };
export namespace Root {
  export type State = TextFieldRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TextFieldRootProps.Render;

    export type SuruUI = TextFieldRootProps.SuruUI;

    export type BaseUI = TextFieldRootProps.BaseUI;

    export type HTML = TextFieldRootProps.HTML;
  }

  export type Color = TextFieldRootColor;

  export type Radius = TextFieldRootRadius;

  export type Size = TextFieldRootSize;

  export type Variant = TextFieldRootVariant;
}
