import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * {@link ComboboxItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxItemContext<TItem = any> = {
  /**
   * 項目の値です。
   */
  readonly value: TItem;
};

/**
 * 項目の値を子要素へ伝播するコンテキストです。
 */
export const ComboboxItemContext: React.Context<ComboboxItemContext | null> =
  React.createContext<ComboboxItemContext | null>(null);

function useSuiComboboxItemContext(optional?: false): ComboboxItemContext;
function useSuiComboboxItemContext(optional?: boolean): ComboboxItemContext | null;
function useSuiComboboxItemContext(optional?: boolean): ComboboxItemContext | null {
  const ctx = React.use(ComboboxItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxItemContext",
      providerName: "ComboboxItem",
    });
  }

  return ctx;
}

export type IUseComboboxItemContext = IUseContext<ComboboxItemContext>;

/**
 * {@link ComboboxItemContext} を読み取るフックです。
 */
export const useComboboxItemContext: IUseComboboxItemContext = useSuiComboboxItemContext;

export { ComboboxItemContext as ItemContext, useComboboxItemContext as useItemContext };
