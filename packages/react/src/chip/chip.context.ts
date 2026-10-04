import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * チップの配色です。
 */
export type ChipContextColor = Color;

/**
 * チップの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ChipContextRadius = "none" | Size | "full";

/**
 * チップの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ChipContextSize = Size;

/**
 * チップの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ChipContextVariant = ColorTemplate;

/**
 * {@link ChipRoot} が提供する状態です。
 */
export type ChipContext = {
  /**
   * チップの色です。
   */
  readonly color: ChipContextColor;

  /**
   * チップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * チップの角丸の大きさです。
   */
  readonly radius: ChipContextRadius;

  /**
   * チップの大きさです。
   */
  readonly size: ChipContextSize;

  /**
   * チップの主な外観です。
   */
  readonly variant: ChipContextVariant;
};

/**
 * チップの見た目を子孫へ伝播するコンテキストです。
 */
export const ChipContext: React.Context<ChipContext | null> =
  React.createContext<ChipContext | null>(null);

export type IUseChipContext = IUseContext<ChipContext>;

/**
 * {@link ChipContext} を読み取るフックです。
 */
export const useChipContext: IUseChipContext = function useSuiChipContext(optional?: boolean): any {
  const ctx = React.use(ChipContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ChipContext",
      providerName: "ChipRoot",
    });
  }

  return ctx;
};

export { ChipContext as Context, useChipContext as useContext };

export namespace Context {
  export type Color = ChipContextColor;

  export type Radius = ChipContextRadius;

  export type Size = ChipContextSize;

  export type Variant = ChipContextVariant;
}
