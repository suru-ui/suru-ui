import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link TabsRoot} が子パーツへ提供するコンテキストです。
 *
 * @template TItem 項目の型です。
 */
export type TabsContext<TItem = any> = {
  /**
   * タブに表示する項目の一覧です。
   */
  readonly items: readonly TItem[];
};

/**
 * タブの項目を子パーツへ伝播するコンテキストです。
 */
export const TabsContext: React.Context<TabsContext | null> =
  React.createContext<TabsContext | null>(null);

export interface IUseTabsContext extends IUseContext<TabsContext> {
  /**
   * @template TItem 項目の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  <TItem = any>(optional?: false): TabsContext<TItem>;
  <TItem = any>(optional?: boolean): TabsContext<TItem> | null;
}

/**
 * {@link TabsContext} を読み取るフックです。
 */
export const useTabsContext: IUseTabsContext = function useSuiTabsContext(optional?: boolean): any {
  const ctx = React.use(TabsContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TabsContext",
      providerName: "TabsRoot",
    });
  }

  return ctx;
};

export { TabsContext as Context, useTabsContext as useContext };
