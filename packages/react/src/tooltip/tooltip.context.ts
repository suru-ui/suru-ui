import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * ツールチップの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TooltipContextRadius = "none" | Size;

/**
 * ツールチップの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TooltipContextSize = Size;

/**
 * {@link TooltipRoot} が子パーツへ提供する状態です。
 */
export type TooltipContext = {
  /**
   * ツールチップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ツールチップの角丸の大きさです。
   */
  readonly radius: TooltipContextRadius;

  /**
   * ツールチップの大きさです。
   */
  readonly size: TooltipContextSize;
};

/**
 * ツールチップの見た目を子パーツへ伝播するコンテキストです。
 */
export const TooltipContext: React.Context<TooltipContext | null> =
  React.createContext<TooltipContext | null>(null);

export interface IUseTooltipContext extends IUseContext<TooltipContext> {
  /**
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  (optional?: false): TooltipContext;
  (optional?: boolean): TooltipContext | null;
}

/**
 * {@link TooltipContext} を読み取るフックです。
 */
export const useTooltipContext: IUseTooltipContext = function useSuiTooltipContext(
  optional?: boolean,
): any {
  const ctx = React.use(TooltipContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TooltipContext",
      providerName: "TooltipRoot",
    });
  }

  return ctx;
};

export { TooltipContext as Context, useTooltipContext as useContext };

export namespace Context {
  export type Radius = TooltipContextRadius;

  export type Size = TooltipContextSize;
}
