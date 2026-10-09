import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PortalContext } from "../portal/autocomplete.portal.context.js";

/**
 * {@link AutocompletePositioner} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompletePositionerContext<TItem = any> = Readonly<
  Override<PortalContext<TItem>, Autocomplete.Positioner.State>
>;

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
