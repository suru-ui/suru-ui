import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link SegmentsRoot} が子パーツへ提供するコンテキストです。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsContext<TItem = any> = {
  /**
   * セグメントに表示する項目の一覧です。
   */
  readonly items: readonly TItem[];
};

/**
 * セグメントの項目を子パーツへ伝播するコンテキストです。
 */
export const SegmentsContext: React.Context<SegmentsContext | null> =
  React.createContext<SegmentsContext | null>(null);

export interface IUseSegmentsContext extends IUseContext<SegmentsContext> {
  /**
   * @template TItem 項目の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  <TItem = any>(optional?: false): SegmentsContext<TItem>;
  <TItem = any>(optional?: boolean): SegmentsContext<TItem> | null;
}

/**
 * {@link SegmentsContext} を読み取るフックです。
 */
export const useSegmentsContext: IUseSegmentsContext = function useSuiSegmentsContext(
  optional?: boolean,
): any {
  const ctx = React.use(SegmentsContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SegmentsContext",
      providerName: "SegmentsRoot",
    });
  }

  return ctx;
};

export { SegmentsContext as Context, useSegmentsContext as useContext };
