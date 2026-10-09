import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { InputGroupContext } from "../input-group/autocomplete.input-group.context.js";

/**
 * {@link AutocompleteInput} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteInputContext<TItem = any> = Readonly<
  Override<InputGroupContext<TItem>, Autocomplete.Input.State>
>;

/**
 * {@link AutocompleteInput} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteInputContext: React.Context<AutocompleteInputContext | null> =
  React.createContext<AutocompleteInputContext | null>(null);

export type IUseAutocompleteInputContext = IUseContext<AutocompleteInputContext>;

/**
 * {@link AutocompleteInputContext} を読み取るフックです。
 */
export const useAutocompleteInputContext: IUseAutocompleteInputContext =
  function useSuiAutocompleteInputContext(optional): any {
    const ctx = React.use(AutocompleteInputContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteInputContext",
        providerName: "AutocompleteInput",
      });
    }

    return ctx;
  };

export { AutocompleteInputContext as InputContext, useAutocompleteInputContext as useInputContext };
