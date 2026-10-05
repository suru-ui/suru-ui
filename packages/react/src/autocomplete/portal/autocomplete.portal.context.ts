import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompletePortalState } from "./autocomplete.portal.jsx";

/**
 * {@link AutocompletePortal} が子パーツへ提供する状態です。
 */
export type AutocompletePortalContext = Readonly<AutocompletePortalState>;

/**
 * {@link AutocompletePortal} が子パーツへ提供するコンテキストです。
 */
export const AutocompletePortalContext: React.Context<AutocompletePortalContext | null> =
  React.createContext<AutocompletePortalContext | null>(null);

export type IUseAutocompletePortalContext = IUseContext<AutocompletePortalContext>;

/**
 * {@link AutocompletePortalContext} を読み取るフックです。
 */
export const useAutocompletePortalContext: IUseAutocompletePortalContext =
  function useSuiAutocompletePortalContext(optional): any {
    const ctx = React.use(AutocompletePortalContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompletePortalContext",
        providerName: "AutocompletePortal",
      });
    }

    return ctx;
  };

export {
  AutocompletePortalContext as PortalContext,
  useAutocompletePortalContext as usePortalContext,
};
