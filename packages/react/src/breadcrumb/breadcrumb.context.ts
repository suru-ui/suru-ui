import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * パンくずリストの配色です。
 */
export type BreadcrumbContextColor = Color;

/**
 * パンくずリストの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type BreadcrumbContextSize = Size;

/**
 * {@link BreadcrumbRoot} が子パーツへ提供するコンテキストです。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbContext<TItem = any> = {
  /**
   * パンくずリストの配色です。
   *
   * 配色は現在のページのリンクに適用されます。
   */
  readonly color: BreadcrumbContextColor;

  /**
   * パンくずリストの項目です。
   */
  readonly items: readonly TItem[];

  /**
   * パンくずリストの大きさです。
   */
  readonly size: BreadcrumbContextSize;
};

/**
 * パンくずリストのスタイルと項目を子パーツへ伝播するコンテキストです。
 */
export const BreadcrumbContext: React.Context<BreadcrumbContext | null> =
  React.createContext<BreadcrumbContext | null>(null);

export interface IUseBreadcrumbContext extends IUseContext<BreadcrumbContext> {
  /**
   * @template TItem 項目の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  <TItem = any>(optional?: false): BreadcrumbContext<TItem>;
  <TItem = any>(optional?: boolean): BreadcrumbContext<TItem> | null;
}

/**
 * {@link BreadcrumbContext} を読み取るフックです。
 */
export const useBreadcrumbContext: IUseBreadcrumbContext = function useSuiBreadcrumbContext(
  optional?: boolean,
): any {
  const ctx = React.use(BreadcrumbContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "BreadcrumbContext",
      providerName: "BreadcrumbRoot",
    });
  }

  return ctx;
};

export { BreadcrumbContext as Context, useBreadcrumbContext as useContext };

export namespace Context {
  export type Color = BreadcrumbContextColor;

  export type Size = BreadcrumbContextSize;
}
