import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AutocompleteContext } from "../root/autocomplete.root.context.js";

/**
 * {@link AutocompletePortal} が子パーツへ提供する状態です。
 */
export type AutocompletePortalContext = Readonly<
  Override<AutocompleteContext, Autocomplete.Portal.State>
>;

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
