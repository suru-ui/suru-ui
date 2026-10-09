import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/autocomplete.popup.context.js";

/**
 * {@link AutocompleteEmpty} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteEmptyContext<TItem = any> = Readonly<
  Override<PopupContext<TItem>, Autocomplete.Empty.State>
>;

/**
 * {@link AutocompleteEmpty} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteEmptyContext: React.Context<AutocompleteEmptyContext | null> =
  React.createContext<AutocompleteEmptyContext | null>(null);

export type IUseAutocompleteEmptyContext = IUseContext<AutocompleteEmptyContext>;

/**
 * {@link AutocompleteEmptyContext} を読み取るフックです。
 */
export const useAutocompleteEmptyContext: IUseAutocompleteEmptyContext =
  function useSuiAutocompleteEmptyContext(optional): any {
    const ctx = React.use(AutocompleteEmptyContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteEmptyContext",
        providerName: "AutocompleteEmpty",
      });
    }

    return ctx;
  };

export { AutocompleteEmptyContext as EmptyContext, useAutocompleteEmptyContext as useEmptyContext };
