import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TabsContext } from "../root/tabs.root.context.js";

/**
 * {@link TabsPanel} が子パーツへ提供する状態です。
 */
export type TabsPanelContext = Readonly<Override<TabsContext, BaseTabs.Panel.State>>;

/**
 * {@link TabsPanel} が子パーツへ提供するコンテキストです。
 */
export const TabsPanelContext: React.Context<TabsPanelContext | null> =
  React.createContext<TabsPanelContext | null>(null);

export type IUseTabsPanelContext = IUseContext<TabsPanelContext>;

/**
 * {@link TabsPanelContext} を読み取るフックです。
 */
export const useTabsPanelContext: IUseTabsPanelContext = function useSuiTabsPanelContext(
  optional,
): any {
  const ctx = React.use(TabsPanelContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TabsPanelContext",
      providerName: "TabsPanel",
    });
  }

  return ctx;
};

export { TabsPanelContext as PanelContext, useTabsPanelContext as usePanelContext };
