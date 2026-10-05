import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteGroupLabelState } from "./autocomplete.group-label.jsx";

/**
 * {@link AutocompleteGroupLabel} が子パーツへ提供する状態です。
 */
export type AutocompleteGroupLabelContext = Readonly<AutocompleteGroupLabelState>;

/**
 * {@link AutocompleteGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteGroupLabelContext: React.Context<AutocompleteGroupLabelContext | null> =
  React.createContext<AutocompleteGroupLabelContext | null>(null);

export type IUseAutocompleteGroupLabelContext = IUseContext<AutocompleteGroupLabelContext>;

/**
 * {@link AutocompleteGroupLabelContext} を読み取るフックです。
 */
export const useAutocompleteGroupLabelContext: IUseAutocompleteGroupLabelContext =
  function useSuiAutocompleteGroupLabelContext(optional): any {
    const ctx = React.use(AutocompleteGroupLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteGroupLabelContext",
        providerName: "AutocompleteGroupLabel",
      });
    }

    return ctx;
  };

export {
  AutocompleteGroupLabelContext as GroupLabelContext,
  useAutocompleteGroupLabelContext as useGroupLabelContext,
};
