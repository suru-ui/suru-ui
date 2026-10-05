import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TabsTabState } from "./tabs.tab.jsx";

/**
 * {@link TabsTab} が子パーツへ提供する状態です。
 */
export type TabsTabContext = Readonly<TabsTabState>;

/**
 * {@link TabsTab} が子パーツへ提供するコンテキストです。
 */
export const TabsTabContext: React.Context<TabsTabContext | null> =
  React.createContext<TabsTabContext | null>(null);

export type IUseTabsTabContext = IUseContext<TabsTabContext>;

/**
 * {@link TabsTabContext} を読み取るフックです。
 */
export const useTabsTabContext: IUseTabsTabContext = function useSuiTabsTabContext(optional): any {
  const ctx = React.use(TabsTabContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TabsTabContext",
      providerName: "TabsTab",
    });
  }

  return ctx;
};

export { TabsTabContext as TabContext, useTabsTabContext as useTabContext };
