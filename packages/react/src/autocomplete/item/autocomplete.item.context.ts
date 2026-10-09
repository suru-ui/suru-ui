import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { GroupContext } from "../group/autocomplete.group.context.js";
import type { ListContext } from "../list/autocomplete.list.context.js";

type ItemContextValue<TItem> = {
  /**
   * 項目の値です。
   */
  value: TItem | undefined;
};

type ItemContext<TParentContext, TItem> = Readonly<
  Override<
    TParentContext,
    Override<ItemContextValue<TItem>, Override<Button.Root.State, Autocomplete.Item.State>>
  >
>;

/**
 * {@link AutocompleteItem} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type AutocompleteItemContext<TValue = any> =
  // | ItemContext<ListContext, TValue>
  // | ItemContext<GroupContext, TValue>
  ItemContext<ListContext<TValue> & GroupContext<TValue>, TValue>;

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
