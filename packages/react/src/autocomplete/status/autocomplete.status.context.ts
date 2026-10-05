import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AutocompleteContext } from "../root/autocomplete.root.context.js";

/**
 * {@link AutocompleteStatus} が子パーツへ提供する状態です。
 */
export type AutocompleteStatusContext = Readonly<
  Override<AutocompleteContext, Autocomplete.Status.State>
>;

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
