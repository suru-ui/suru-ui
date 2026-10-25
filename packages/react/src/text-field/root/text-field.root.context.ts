import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * 文字入力欄の配色です。
 */
export type TextFieldContextColor = Color;

/**
 * 文字入力欄の角丸です。
 */
export type TextFieldContextRadius = "none" | Size | "full" | "circle";

/**
 * 文字入力欄のサイズです。
 */
export type TextFieldContextSize = Size;

/**
 * 文字入力欄の主な外観です。
 */
export type TextFieldContextVariant = "naked" | "liquid";

/**
 * {@link TextFieldRoot} が子パーツへ提供するスタイルです。
 */
export type TextFieldContext = {
  /**
   * 文字入力欄の配色です。
   */
  readonly color: TextFieldContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 文字入力欄の角丸です。
   */
  readonly radius: TextFieldContextRadius;

  /**
   * 文字入力欄のサイズです。
   */
  readonly size: TextFieldContextSize;

  /**
   * 文字入力欄の主な外観です。
   */
  readonly variant: TextFieldContextVariant;
};

/**
 * TextField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const TextFieldContext: React.Context<TextFieldContext | null> =
  React.createContext<TextFieldContext | null>(null);

export type IUseTextFieldContext = IUseContext<TextFieldContext>;

/**
 * {@link TextFieldContext} を読み取るフックです。
 */
export const useTextFieldContext: IUseTextFieldContext = function useSuiTextFieldContext(
  optional?: boolean,
): any {
  const ctx = React.use(TextFieldContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TextFieldContext",
      providerName: "TextFieldRoot",
    });
  }

  return ctx;
};

export { TextFieldContext as Context, useTextFieldContext as useContext };

export namespace Context {
  export type Color = TextFieldContextColor;

  export type Radius = TextFieldContextRadius;

  export type Size = TextFieldContextSize;

  export type Variant = TextFieldContextVariant;
}
