import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteListState } from "./autocomplete.list.jsx";

/**
 * {@link AutocompleteList} が子パーツへ提供する状態です。
 */
export type AutocompleteListContext = Readonly<AutocompleteListState>;

/**
 * {@link AutocompleteList} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteListContext: React.Context<AutocompleteListContext | null> =
  React.createContext<AutocompleteListContext | null>(null);

export type IUseAutocompleteListContext = IUseContext<AutocompleteListContext>;

/**
 * {@link AutocompleteListContext} を読み取るフックです。
 */
export const useAutocompleteListContext: IUseAutocompleteListContext =
  function useSuiAutocompleteListContext(optional): any {
    const ctx = React.use(AutocompleteListContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteListContext",
        providerName: "AutocompleteList",
      });
    }

    return ctx;
  };

export { AutocompleteListContext as ListContext, useAutocompleteListContext as useListContext };
