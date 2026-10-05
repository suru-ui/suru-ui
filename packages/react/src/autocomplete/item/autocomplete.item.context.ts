import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * {@link AutocompleteItem} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type AutocompleteItemContext<TValue = any> = {
  /**
   * 項目の値です。
   */
  readonly value: TValue;
};

/**
 * 項目の値を子要素へ伝播するコンテキストです。
 */
export const AutocompleteItemContext: React.Context<AutocompleteItemContext | null> =
  React.createContext<AutocompleteItemContext | null>(null);

function useSuiAutocompleteItemContext(optional?: false): AutocompleteItemContext;
function useSuiAutocompleteItemContext(optional?: boolean): AutocompleteItemContext | null;
function useSuiAutocompleteItemContext(optional?: boolean): AutocompleteItemContext | null {
  const ctx = React.use(AutocompleteItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AutocompleteItemContext",
      providerName: "AutocompleteItem",
    });
  }

  return ctx;
}

export type IUseAutocompleteItemContext = IUseContext<AutocompleteItemContext>;

/**
 * {@link AutocompleteItemContext} を読み取るフックです。
 */
export const useAutocompleteItemContext: IUseAutocompleteItemContext =
  useSuiAutocompleteItemContext;

export { AutocompleteItemContext as ItemContext, useAutocompleteItemContext as useItemContext };
