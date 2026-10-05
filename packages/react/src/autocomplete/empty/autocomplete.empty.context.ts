import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteEmptyState } from "./autocomplete.empty.jsx";

/**
 * {@link AutocompleteEmpty} が子パーツへ提供する状態です。
 */
export type AutocompleteEmptyContext = Readonly<AutocompleteEmptyState>;

/**
 * {@link AutocompleteEmpty} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteEmptyContext: React.Context<AutocompleteEmptyContext | null> =
  React.createContext<AutocompleteEmptyContext | null>(null);

export type IUseAutocompleteEmptyContext = IUseContext<AutocompleteEmptyContext>;

/**
 * {@link AutocompleteEmptyContext} を読み取るフックです。
 */
export const useAutocompleteEmptyContext: IUseAutocompleteEmptyContext =
  function useSuiAutocompleteEmptyContext(optional): any {
    const ctx = React.use(AutocompleteEmptyContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteEmptyContext",
        providerName: "AutocompleteEmpty",
      });
    }

    return ctx;
  };

export { AutocompleteEmptyContext as EmptyContext, useAutocompleteEmptyContext as useEmptyContext };
