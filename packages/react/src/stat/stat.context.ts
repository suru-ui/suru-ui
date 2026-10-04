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
export type StatContextSize = Size;

/**
 * {@link StatRoot} が提供する状態です。
 */
export type StatContext = {
  /**
   * 統計の大きさです。
   */
  readonly size: StatContextSize;
};

/**
 * 統計の見た目を子パーツへ伝播するコンテキストです。
 */
export const StatContext: React.Context<StatContext | null> =
  React.createContext<StatContext | null>(null);

export type IUseStatContext = IUseContext<StatContext>;

/**
 * {@link StatContext} を読み取るフックです。
 */
export const useStatContext: IUseStatContext = function useSuiStatContext(optional?: boolean): any {
  const ctx = React.use(StatContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "StatContext",
      providerName: "StatRoot",
    });
  }

  return ctx;
};

export { StatContext as Context, useStatContext as useContext };

export namespace Context {
  export type Size = StatContextSize;
}
