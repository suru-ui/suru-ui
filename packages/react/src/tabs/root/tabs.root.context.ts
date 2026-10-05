import type { Size, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * 選択中のタブの主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 * - `"solid"`: 塗りつぶし
 */
export type TabsContextActiveVariant = ColorTemplate;

/**
 * Tabs の角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TabsContextRadius = "none" | Size;

/**
 * Tabs の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type TabsContextSize = Size;

/**
 * Tabs の主な外観です。
 *
 * - `"segments"`: 区分表示
 * - `"line"`: 下線表示
 */
export type TabsContextVariant = "segments" | "line";

/**
 * {@link TabsRoot} が子パーツへ提供するコンテキストです。
 *
 * @template TItem 項目の型です。
 */
export type TabsContext<TItem = any> = {
  /**
   * 選択中のタブの主な外観です。
   */
  readonly activeVariant: TabsContextActiveVariant;

  /**
   * タブに表示する項目の一覧です。
   */
  readonly items: readonly TItem[];

  /**
   * Tabs の枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * Tabs の角丸です。
   */
  readonly radius: TabsContextRadius;

  /**
   * Tabs の大きさです。
   */
  readonly size: TabsContextSize;

  /**
   * Tabs の主な外観です。
   */
  readonly variant: TabsContextVariant;
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

export namespace Context {
  export type ActiveVariant = TabsContextActiveVariant;

  export type Radius = TabsContextRadius;

  export type Size = TabsContextSize;

  export type Variant = TabsContextVariant;
}
