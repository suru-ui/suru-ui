import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AutocompleteContext } from "../root/autocomplete.root.context.js";

/**
 * {@link AutocompleteSeparator} が子パーツへ提供する状態です。
 */
export type AutocompleteSeparatorContext = Readonly<
  Override<AutocompleteContext, Autocomplete.Separator.State>
>;

/**
 * {@link AutocompleteSeparator} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteSeparatorContext: React.Context<AutocompleteSeparatorContext | null> =
  React.createContext<AutocompleteSeparatorContext | null>(null);

export type IUseAutocompleteSeparatorContext = IUseContext<AutocompleteSeparatorContext>;

/**
 * {@link AutocompleteSeparatorContext} を読み取るフックです。
 */
export const useAutocompleteSeparatorContext: IUseAutocompleteSeparatorContext =
  function useSuiAutocompleteSeparatorContext(optional): any {
    const ctx = React.use(AutocompleteSeparatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteSeparatorContext",
        providerName: "AutocompleteSeparator",
      });
    }

    return ctx;
  };

export {
  AutocompleteSeparatorContext as SeparatorContext,
  useAutocompleteSeparatorContext as useSeparatorContext,
};
