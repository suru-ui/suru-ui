import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * リストの大きさです。
 */
export type ListContextSize = Size;

/**
 * {@link ListRoot} が子パーツへ提供するコンテキストです。
 */
export type ListContext = {
  /**
   * リストの大きさです。
   */
  readonly size: ListContextSize;
};

/**
 * {@link ListRoot} が子パーツへ提供するコンテキストです。
 */
export const ListContext: React.Context<ListContext | null> =
  React.createContext<ListContext | null>(null);

function useSuiListContext(optional?: false): ListContext;
function useSuiListContext(optional?: boolean): ListContext | null;
function useSuiListContext(optional?: boolean): ListContext | null {
  const ctx = React.use(ListContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ListContext",
      providerName: "ListRoot",
    });
  }

  return ctx;
}

/**
 * {@link ListContext} を読み取るフックです。
 */
export const useListContext: IUseContext<ListContext> = useSuiListContext;

export { ListContext as Context, useListContext as useContext };

export namespace Context {
  export type Size = ListContextSize;
}
