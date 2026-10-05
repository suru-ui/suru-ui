import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AutocompleteContext } from "../root/autocomplete.root.context.js";

/**
 * {@link AutocompleteRow} が子パーツへ提供する状態です。
 */
export type AutocompleteRowContext = Readonly<
  Override<AutocompleteContext, Autocomplete.Row.State>
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
