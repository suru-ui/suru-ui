import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TabsContext } from "../root/tabs.root.context.js";

/**
 * {@link TabsList} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type TabsListContext<TItem = any> = Readonly<
  Override<TabsContext<TItem>, BaseTabs.List.State>
>;

/**
 * {@link TabsList} が子パーツへ提供するコンテキストです。
 */
export const TabsListContext: React.Context<TabsListContext | null> =
  React.createContext<TabsListContext | null>(null);

export type IUseTabsListContext = IUseContext<TabsListContext>;

/**
 * {@link TabsListContext} を読み取るフックです。
 */
export const useTabsListContext: IUseTabsListContext = (optional): any => {
  const ctx = React.use(TabsListContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "TabsListContext",
      providerName: "TabsList",
    });
  }

  return ctx;
};

export { TabsListContext as ListContext, useTabsListContext as useListContext };
