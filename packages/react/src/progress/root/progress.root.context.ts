import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/** 進捗の配色です。 */
export type ProgressContextColor = Color;

/** 進捗の角丸の大きさです。 */
export type ProgressContextRadius = "none" | Size | "full";

/** 進捗の大きさです。 */
export type ProgressContextSize = Size;

/** 進捗の主な外観です。 */
export type ProgressContextVariant = "naked" | "liquid";

/**
 * {@link ProgressRoot} が子パーツへ提供するスタイルです。
 */
export type ProgressContext = {
  /** 進捗の配色です。 */
  readonly color: ProgressContextColor;

  /** 枠線を表示するかどうかです。 */
  readonly outlined: boolean;

  /** 進捗の角丸の大きさです。 */
  readonly radius: ProgressContextRadius;

  /** 進捗の大きさです。 */
  readonly size: ProgressContextSize;

  /** 進捗の主な外観です。 */
  readonly variant: ProgressContextVariant;
};

/** Progress のスタイルを子パーツへ伝播するコンテキストです。 */
export const ProgressContext: React.Context<ProgressContext | null> =
  React.createContext<ProgressContext | null>(null);

export type IUseProgressContext = IUseContext<ProgressContext>;

/**
 * {@link ProgressContext} を読み取るフックです。
 */
export const useProgressContext: IUseProgressContext = (optional?: boolean): any => {
  const ctx = React.use(ProgressContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ProgressContext",
      providerName: "ProgressRoot",
    });
  }

  return ctx;
};

export { ProgressContext as Context, useProgressContext as useContext };
export namespace Context {
  export type Color = ProgressContextColor;

  export type Radius = ProgressContextRadius;

  export type Size = ProgressContextSize;

  export type Variant = ProgressContextVariant;
}
