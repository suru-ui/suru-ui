import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AutocompletePopupContext } from "../popup/autocomplete.popup.context.js";

/**
 * {@link AutocompleteList} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteListContext<TItem = any> = Readonly<
  Override<AutocompletePopupContext<TItem>, Autocomplete.List.State>
>;

/**
 * {@link AutocompleteList} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteListContext: React.Context<AutocompleteListContext | null> =
  React.createContext<AutocompleteListContext | null>(null);

export type IUseAutocompleteListContext = IUseContext<AutocompleteListContext>;

/**
 * {@link AutocompleteListContext} を読み取るフックです。
 */
export const useAutocompleteListContext: IUseAutocompleteListContext =
  function useSuiAutocompleteListContext(optional): any {
    const ctx = React.use(AutocompleteListContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteListContext",
        providerName: "AutocompleteList",
      });
    }

    return ctx;
  };

export { AutocompleteListContext as ListContext, useAutocompleteListContext as useListContext };
