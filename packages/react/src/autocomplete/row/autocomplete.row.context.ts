import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AutocompleteListContext } from "../list/autocomplete.list.context.js";

/**
 * {@link AutocompleteRow} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteRowContext<TItem = any> = Readonly<
  Override<AutocompleteListContext<TItem>, Autocomplete.Row.State>
>;

/**
 * {@link AutocompleteRow} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteRowContext: React.Context<AutocompleteRowContext | null> =
  React.createContext<AutocompleteRowContext | null>(null);

export type IUseAutocompleteRowContext = IUseContext<AutocompleteRowContext>;

/**
 * {@link AutocompleteRowContext} を読み取るフックです。
 */
export const useAutocompleteRowContext: IUseAutocompleteRowContext =
  function useSuiAutocompleteRowContext(optional): any {
    const ctx = React.use(AutocompleteRowContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteRowContext",
        providerName: "AutocompleteRow",
      });
    }

    return ctx;
  };

export { AutocompleteRowContext as RowContext, useAutocompleteRowContext as useRowContext };
