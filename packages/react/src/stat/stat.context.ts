import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * 統計の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type StatContextSize = Size;

/**
 * {@link StatRoot} が子パーツへ提供するコンテキストです。
 */
export type StatContext = {
  /**
   * 統計の大きさです。
   */
  readonly size: StatContextSize;
};

/**
 * {@link StatRoot} が子パーツへ提供するコンテキストです。
 */
export const StatContext: React.Context<StatContext | null> =
  React.createContext<StatContext | null>(null);

function useSuiStatContext(optional?: false): StatContext;
function useSuiStatContext(optional?: boolean): StatContext | null;
function useSuiStatContext(optional?: boolean): StatContext | null {
  const ctx = React.use(StatContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "StatContext",
      providerName: "StatRoot",
    });
  }

  return ctx;
}

/**
 * {@link StatContext} を読み取るフックです。
 */
export const useStatContext: IUseContext<StatContext> = useSuiStatContext;

export { StatContext as Context, useStatContext as useContext };

export namespace Context {
  export type Size = StatContextSize;
}
