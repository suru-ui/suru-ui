import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * スイッチの配色です。
 */
export type SwitchContextColor = Color;

/**
 * スイッチの角丸の大きさです。
 */
export type SwitchContextRadius = "none" | Size | "full" | "circle";

/**
 * スイッチの大きさです。
 */
export type SwitchContextSize = Size;

/**
 * スイッチの主な外観です。
 */
export type SwitchContextVariant = "naked" | "liquid";

/**
 * {@link SwitchRoot} が子パーツへ提供するスタイルです。
 */
export type SwitchContext = {
  /**
   * スイッチの配色です。
   */
  readonly color: SwitchContextColor;

  /**
   * スイッチに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * スイッチの角丸の大きさです。
   */
  readonly radius: SwitchContextRadius;

  /**
   * スイッチの大きさです。
   */
  readonly size: SwitchContextSize;

  /**
   * スイッチの主な外観です。
   */
  readonly variant: SwitchContextVariant;
};

/**
 * Switch のスタイルを子パーツへ伝播するコンテキストです。
 */
export const SwitchContext: React.Context<SwitchContext | null> =
  React.createContext<SwitchContext | null>(null);

export type IUseSwitchContext = IUseContext<SwitchContext>;

/**
 * {@link SwitchContext} を読み取るフックです。
 */
export const useSwitchContext: IUseSwitchContext = function useSuiSwitchContext(
  optional?: boolean,
): any {
  const ctx = React.use(SwitchContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SwitchContext",
      providerName: "SwitchRoot",
    });
  }

  return ctx;
};

export { SwitchContext as Context, useSwitchContext as useContext };

export namespace Context {
  export type Color = SwitchContextColor;

  export type Radius = SwitchContextRadius;

  export type Size = SwitchContextSize;

  export type Variant = SwitchContextVariant;
}
