import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TabsIndicatorState } from "./tabs.indicator.jsx";

/**
 * {@link TabsIndicator} が子パーツへ提供する状態です。
 */
export type TabsIndicatorContext = Readonly<TabsIndicatorState>;

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
