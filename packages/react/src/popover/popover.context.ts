import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * ポップオーバーの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type PopoverContextRadius = "none" | Size;

/**
 * ポップオーバーの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type PopoverContextSize = Size;

/**
 * {@link PopoverRoot} が子パーツへ提供する状態です。
 */
export type PopoverContext = {
  /**
   * ポップオーバーに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップオーバーの角丸の大きさです。
   */
  readonly radius: PopoverContextRadius;

  /**
   * ポップオーバーの大きさです。
   */
  readonly size: PopoverContextSize;
};

/**
 * ポップオーバーの見た目を子パーツへ伝播するコンテキストです。
 */
export const PopoverContext: React.Context<PopoverContext | null> =
  React.createContext<PopoverContext | null>(null);

export type IUsePopoverContext = IUseContext<PopoverContext>;

/**
 * {@link PopoverContext} を読み取るフックです。
 */
export const usePopoverContext: IUsePopoverContext = function useSuiPopoverContext(
  optional?: boolean,
): any {
  const ctx = React.use(PopoverContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PopoverContext",
      providerName: "PopoverRoot",
    });
  }

  return ctx;
};

export { PopoverContext as Context, usePopoverContext as useContext };

export namespace Context {
  export type Radius = PopoverContextRadius;

  export type Size = PopoverContextSize;
}
