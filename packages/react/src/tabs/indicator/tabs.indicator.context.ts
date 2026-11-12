import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TabsContext } from "../root/tabs.root.context.js";

/**
 * {@link TabsIndicator} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type TabsIndicatorContext<TItem = any> = Readonly<
  Override<TabsContext<TItem>, BaseTabs.Indicator.State>
>;

/**
 * {@link TabsIndicator} が子パーツへ提供するコンテキストです。
 */
export const TabsIndicatorContext: React.Context<TabsIndicatorContext | null> =
  React.createContext<TabsIndicatorContext | null>(null);

export type IUseTabsIndicatorContext = IUseContext<TabsIndicatorContext>;

/**
 * {@link TabsIndicatorContext} を読み取るフックです。
 */
export const useTabsIndicatorContext: IUseTabsIndicatorContext = (optional): any => {
  const ctx = React.use(TabsIndicatorContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "TabsIndicatorContext",
      providerName: "TabsIndicator",
    });
  }

  return ctx;
};

export { TabsIndicatorContext as IndicatorContext, useTabsIndicatorContext as useIndicatorContext };
