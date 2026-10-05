import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * テキストエリアの配色です。
 */
export type TextareaContextColor = Color;

/**
 * テキストエリアの角丸です。
 */
export type TextareaContextRadius = "none" | Size;

/**
 * テキストエリアの大きさです。
 */
export type TextareaContextSize = Size;

/**
 * テキストエリアの主な外観です。
 */
export type TextareaContextVariant = "naked" | "liquid";

/**
 * {@link TextareaRoot} が子パーツへ提供するスタイルです。
 */
export type TextareaContext = {
  /**
   * テキストエリアの配色です。
   */
  readonly color: TextareaContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * テキストエリアの角丸です。
   */
  readonly radius: TextareaContextRadius;

  /**
   * テキストエリアの大きさです。
   */
  readonly size: TextareaContextSize;

  /**
   * テキストエリアの主な外観です。
   */
  readonly variant: TextareaContextVariant;
};

/**
 * Textarea のスタイルを子パーツへ伝播するコンテキストです。
 */
export const TextareaContext: React.Context<TextareaContext | null> =
  React.createContext<TextareaContext | null>(null);

export type IUseTextareaContext = IUseContext<TextareaContext>;

/**
 * {@link TextareaContext} を読み取るフックです。
 */
export const useTextareaContext: IUseTextareaContext = function useSuiTextareaContext(
  optional?: boolean,
): any {
  const ctx = React.use(TextareaContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TextareaContext",
      providerName: "TextareaRoot",
    });
  }

  return ctx;
};

export { TextareaContext as Context, useTextareaContext as useContext };

export namespace Context {
  export type Color = TextareaContextColor;

  export type Radius = TextareaContextRadius;

  export type Size = TextareaContextSize;

  export type Variant = TextareaContextVariant;
}
