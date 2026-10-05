import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteStatusState } from "./autocomplete.status.jsx";

/**
 * {@link AutocompleteStatus} が子パーツへ提供する状態です。
 */
export type AutocompleteStatusContext = Readonly<AutocompleteStatusState>;

/**
 * {@link AutocompleteStatus} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteStatusContext: React.Context<AutocompleteStatusContext | null> =
  React.createContext<AutocompleteStatusContext | null>(null);

export type IUseAutocompleteStatusContext = IUseContext<AutocompleteStatusContext>;

/**
 * {@link AutocompleteStatusContext} を読み取るフックです。
 */
export const useAutocompleteStatusContext: IUseAutocompleteStatusContext =
  function useSuiAutocompleteStatusContext(optional): any {
    const ctx = React.use(AutocompleteStatusContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteStatusContext",
        providerName: "AutocompleteStatus",
      });
    }

    return ctx;
  };

export {
  AutocompleteStatusContext as StatusContext,
  useAutocompleteStatusContext as useStatusContext,
};
