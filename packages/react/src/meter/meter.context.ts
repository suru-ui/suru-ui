import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * メーターの配色です。
 */
export type MeterContextColor = Color;

/**
 * メーターの角丸の大きさです。
 */
export type MeterContextRadius = "none" | Size | "full";

/**
 * メーターの大きさです。
 */
export type MeterContextSize = Size;

/**
 * メーターの主な外観です。
 */
export type MeterContextVariant = "naked" | "liquid";

/**
 * {@link MeterRoot} が子パーツへ提供するスタイルです。
 */
export type MeterContext = {
  /**
   * メーターの配色です。
   */
  readonly color: MeterContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * メーターの角丸の大きさです。
   */
  readonly radius: MeterContextRadius;

  /**
   * メーターの大きさです。
   */
  readonly size: MeterContextSize;

  /**
   * メーターの主な外観です。
   */
  readonly variant: MeterContextVariant;
};

/**
 * Meter のスタイルを子パーツへ伝播するコンテキストです。
 */
export const MeterContext: React.Context<MeterContext | null> =
  React.createContext<MeterContext | null>(null);

export type IUseMeterContext = IUseContext<MeterContext>;

/**
 * {@link MeterContext} を読み取るフックです。
 */
export const useMeterContext: IUseMeterContext = function useSuiMeterContext(
  optional?: boolean,
): any {
  const ctx = React.use(MeterContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MeterContext",
      providerName: "MeterRoot",
    });
  }

  return ctx;
};

export { MeterContext as Context, useMeterContext as useContext };

export namespace Context {
  export type Color = MeterContextColor;

  export type Radius = MeterContextRadius;

  export type Size = MeterContextSize;

  export type Variant = MeterContextVariant;
}
