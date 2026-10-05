import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteInputGroupState } from "./autocomplete.input-group.jsx";

/**
 * {@link AutocompleteInputGroup} が子パーツへ提供する状態です。
 */
export type AutocompleteInputGroupContext = Readonly<AutocompleteInputGroupState>;

/**
 * {@link AutocompleteInputGroup} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteInputGroupContext: React.Context<AutocompleteInputGroupContext | null> =
  React.createContext<AutocompleteInputGroupContext | null>(null);

export type IUseAutocompleteInputGroupContext = IUseContext<AutocompleteInputGroupContext>;

/**
 * {@link AutocompleteInputGroupContext} を読み取るフックです。
 */
export const useAutocompleteInputGroupContext: IUseAutocompleteInputGroupContext =
  function useSuiAutocompleteInputGroupContext(optional): any {
    const ctx = React.use(AutocompleteInputGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteInputGroupContext",
        providerName: "AutocompleteInputGroup",
      });
    }

    return ctx;
  };

export {
  AutocompleteInputGroupContext as InputGroupContext,
  useAutocompleteInputGroupContext as useInputGroupContext,
};
