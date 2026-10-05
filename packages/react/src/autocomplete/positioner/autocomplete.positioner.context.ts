import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompletePositionerState } from "./autocomplete.positioner.jsx";

/**
 * {@link AutocompletePositioner} が子パーツへ提供する状態です。
 */
export type AutocompletePositionerContext = Readonly<AutocompletePositionerState>;

/**
 * {@link AutocompletePositioner} が子パーツへ提供するコンテキストです。
 */
export const AutocompletePositionerContext: React.Context<AutocompletePositionerContext | null> =
  React.createContext<AutocompletePositionerContext | null>(null);

export type IUseAutocompletePositionerContext = IUseContext<AutocompletePositionerContext>;

/**
 * {@link AutocompletePositionerContext} を読み取るフックです。
 */
export const useAutocompletePositionerContext: IUseAutocompletePositionerContext =
  function useSuiAutocompletePositionerContext(optional): any {
    const ctx = React.use(AutocompletePositionerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompletePositionerContext",
        providerName: "AutocompletePositioner",
      });
    }

    return ctx;
  };

export {
  AutocompletePositionerContext as PositionerContext,
  useAutocompletePositionerContext as usePositionerContext,
};
