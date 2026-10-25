import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * テキスト入力欄の配色です。
 */
export type InputContextColor = Color;

/**
 * テキスト入力欄の角丸です。
 */
export type InputContextRadius = "none" | Size | "full" | "circle";

/**
 * テキスト入力欄の大きさです。
 */
export type InputContextSize = Size;

/**
 * テキスト入力欄の主な外観です。
 */
export type InputContextVariant = "naked" | "liquid";

/**
 * {@link InputRoot} が子パーツへ提供するスタイルです。
 */
export type InputContext = {
  /**
   * テキスト入力欄の配色です。
   */
  readonly color: InputContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * テキスト入力欄の角丸です。
   */
  readonly radius: InputContextRadius;

  /**
   * テキスト入力欄の大きさです。
   */
  readonly size: InputContextSize;

  /**
   * テキスト入力欄の主な外観です。
   */
  readonly variant: InputContextVariant;
};

/**
 * Input のスタイルを子パーツへ伝播するコンテキストです。
 */
export const InputContext: React.Context<InputContext | null> =
  React.createContext<InputContext | null>(null);

export type IUseInputContext = IUseContext<InputContext>;

/**
 * {@link InputContext} を読み取るフックです。
 */
export const useInputContext: IUseInputContext = function useSuiInputContext(
  optional?: boolean,
): any {
  const ctx = React.use(InputContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "InputContext",
      providerName: "InputRoot",
    });
  }

  return ctx;
};

export { InputContext as Context, useInputContext as useContext };

export namespace Context {
  export type Color = InputContextColor;

  export type Radius = InputContextRadius;

  export type Size = InputContextSize;

  export type Variant = InputContextVariant;
}
