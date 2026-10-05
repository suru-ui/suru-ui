import type { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TabsContext } from "../root/tabs.root.context.js";

/**
 * {@link TabsIndicator} が子パーツへ提供する状態です。
 */
export type TabsIndicatorContext = Readonly<Override<TabsContext, BaseTabs.Indicator.State>>;

/**
 * {@link TabsIndicator} が子パーツへ提供するコンテキストです。
 */
export const TabsIndicatorContext: React.Context<TabsIndicatorContext | null> =
  React.createContext<TabsIndicatorContext | null>(null);

export type IUseTabsIndicatorContext = IUseContext<TabsIndicatorContext>;

/**
 * {@link TabsIndicatorContext} を読み取るフックです。
 */
export const useTabsIndicatorContext: IUseTabsIndicatorContext =
  function useSuiTabsIndicatorContext(optional): any {
    const ctx = React.use(TabsIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "TabsIndicatorContext",
        providerName: "TabsIndicator",
      });
    }

    return ctx;
  };

export { TabsIndicatorContext as IndicatorContext, useTabsIndicatorContext as useIndicatorContext };
