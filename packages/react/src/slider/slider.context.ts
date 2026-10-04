import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * スライダーの配色です。
 */
export type SliderContextColor = Color;

/**
 * スライダーの角丸です。
 */
export type SliderContextRadius = "none" | Size | "full";

/**
 * スライダーの大きさです。
 */
export type SliderContextSize = Size;

/**
 * スライダーの主な外観です。
 */
export type SliderContextVariant = "naked" | "liquid";

/**
 * {@link SliderRoot} が子パーツへ提供するスタイルです。
 */
export type SliderContext = {
  /**
   * スライダーの配色です。
   */
  readonly color: SliderContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * スライダーの角丸です。
   */
  readonly radius: SliderContextRadius;

  /**
   * スライダーの大きさです。
   */
  readonly size: SliderContextSize;

  /**
   * スライダーの主な外観です。
   */
  readonly variant: SliderContextVariant;
};

/**
 * Slider のスタイルを子パーツへ伝播するコンテキストです。
 */
export const SliderContext: React.Context<SliderContext | null> =
  React.createContext<SliderContext | null>(null);

export type IUseSliderContext = IUseContext<SliderContext>;

/**
 * {@link SliderContext} を読み取るフックです。
 */
export const useSliderContext: IUseSliderContext = function useSuiSliderContext(
  optional?: boolean,
): any {
  const ctx = React.use(SliderContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SliderContext",
      providerName: "SliderRoot",
    });
  }

  return ctx;
};

export { SliderContext as Context, useSliderContext as useContext };

export namespace Context {
  export type Color = SliderContextColor;

  export type Radius = SliderContextRadius;

  export type Size = SliderContextSize;

  export type Variant = SliderContextVariant;
}
