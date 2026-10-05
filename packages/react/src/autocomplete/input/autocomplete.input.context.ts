import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteInputState } from "./autocomplete.input.jsx";

/**
 * {@link AutocompleteInput} が子パーツへ提供する状態です。
 */
export type AutocompleteInputContext = Readonly<AutocompleteInputState>;

/**
 * {@link AutocompleteInput} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteInputContext: React.Context<AutocompleteInputContext | null> =
  React.createContext<AutocompleteInputContext | null>(null);

export type IUseAutocompleteInputContext = IUseContext<AutocompleteInputContext>;

/**
 * {@link AutocompleteInputContext} を読み取るフックです。
 */
export const useAutocompleteInputContext: IUseAutocompleteInputContext =
  function useSuiAutocompleteInputContext(optional): any {
    const ctx = React.use(AutocompleteInputContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteInputContext",
        providerName: "AutocompleteInput",
      });
    }

    return ctx;
  };

export { AutocompleteInputContext as InputContext, useAutocompleteInputContext as useInputContext };
