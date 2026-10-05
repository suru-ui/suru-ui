import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteBackdropState } from "./autocomplete.backdrop.jsx";

/**
 * {@link AutocompleteBackdrop} が子パーツへ提供する状態です。
 */
export type AutocompleteBackdropContext = Readonly<AutocompleteBackdropState>;

/**
 * {@link AutocompleteBackdrop} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteBackdropContext: React.Context<AutocompleteBackdropContext | null> =
  React.createContext<AutocompleteBackdropContext | null>(null);

export type IUseAutocompleteBackdropContext = IUseContext<AutocompleteBackdropContext>;

/**
 * {@link AutocompleteBackdropContext} を読み取るフックです。
 */
export const useAutocompleteBackdropContext: IUseAutocompleteBackdropContext =
  function useSuiAutocompleteBackdropContext(optional): any {
    const ctx = React.use(AutocompleteBackdropContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteBackdropContext",
        providerName: "AutocompleteBackdrop",
      });
    }

    return ctx;
  };

export {
  AutocompleteBackdropContext as BackdropContext,
  useAutocompleteBackdropContext as useBackdropContext,
};
