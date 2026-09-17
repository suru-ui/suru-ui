import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * 数値入力欄の配色です。
 */
export type NumberFieldContextColor = Color;

/**
 * 数値入力欄の角丸です。
 */
export type NumberFieldContextRadius = "none" | Size | "full";

/**
 * 数値入力欄のサイズです。
 */
export type NumberFieldContextSize = Size;

/**
 * 数値入力欄の主な外観です。
 */
export type NumberFieldContextVariant = "naked" | "liquid";

/**
 * {@link NumberFieldRoot} が子パーツへ提供するスタイルです。
 */
export type NumberFieldContext = {
  /**
   * 数値入力欄の配色です。
   */
  readonly color: NumberFieldContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 数値入力欄の角丸です。
   */
  readonly radius: NumberFieldContextRadius;

  /**
   * 数値入力欄のサイズです。
   */
  readonly size: NumberFieldContextSize;

  /**
   * 数値入力欄の主な外観です。
   */
  readonly variant: NumberFieldContextVariant;
};

/**
 * NumberField のスタイルを子パーツへ伝播するコンテキストです。
 */
export const NumberFieldContext: React.Context<NumberFieldContext | null> =
  React.createContext<NumberFieldContext | null>(null);

function useSuiNumberFieldContext(optional?: false): NumberFieldContext;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null;
function useSuiNumberFieldContext(optional?: boolean): NumberFieldContext | null {
  const ctx = React.use(NumberFieldContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "NumberFieldContext",
      providerName: "NumberFieldRoot",
    });
  }

  return ctx;
}

/**
 * {@link NumberFieldContext} を読み取るフックです。
 */
export const useNumberFieldContext: IUseContext<NumberFieldContext> = useSuiNumberFieldContext;

export { NumberFieldContext as Context, useNumberFieldContext as useContext };

export namespace Context {
  export type Color = NumberFieldContextColor;

  export type Radius = NumberFieldContextRadius;

  export type Size = NumberFieldContextSize;

  export type Variant = NumberFieldContextVariant;
}
