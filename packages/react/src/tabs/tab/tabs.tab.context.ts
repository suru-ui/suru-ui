import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TabsContext } from "../root/tabs.root.context.js";

/**
 * {@link TabsTab} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type TabsTabContext<TItem = any> = Readonly<
  Override<TabsContext<TItem>, BaseTabs.Tab.State>
>;

/**
 * {@link TabsTab} が子パーツへ提供するコンテキストです。
 */
export const TabsTabContext: React.Context<TabsTabContext | null> =
  React.createContext<TabsTabContext | null>(null);

export type IUseTabsTabContext = IUseContext<TabsTabContext>;

/**
 * {@link TabsTabContext} を読み取るフックです。
 */
export const useTabsTabContext: IUseTabsTabContext = (optional): any => {
  const ctx = React.use(TabsTabContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "TabsTabContext",
      providerName: "TabsTab",
    });
  }

  return ctx;
};

export { TabsTabContext as TabContext, useTabsTabContext as useTabContext };
