import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TabsListState } from "./tabs.list.jsx";

/**
 * {@link TabsList} が子パーツへ提供する状態です。
 */
export type TabsListContext = Readonly<TabsListState>;

/**
 * {@link TabsList} が子パーツへ提供するコンテキストです。
 */
export const TabsListContext: React.Context<TabsListContext | null> =
  React.createContext<TabsListContext | null>(null);

export type IUseTabsListContext = IUseContext<TabsListContext>;

/**
 * {@link TabsListContext} を読み取るフックです。
 */
export const useTabsListContext: IUseTabsListContext = function useSuiTabsListContext(
  optional,
): any {
  const ctx = React.use(TabsListContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TabsListContext",
      providerName: "TabsList",
    });
  }

  return ctx;
};

export { TabsListContext as ListContext, useTabsListContext as useListContext };
