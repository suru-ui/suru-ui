import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteGroupState } from "./autocomplete.group.jsx";

/**
 * {@link AutocompleteGroup} が子パーツへ提供する状態です。
 */
export type AutocompleteGroupContext = Readonly<AutocompleteGroupState>;

/**
 * {@link AutocompleteGroup} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteGroupContext: React.Context<AutocompleteGroupContext | null> =
  React.createContext<AutocompleteGroupContext | null>(null);

export type IUseAutocompleteGroupContext = IUseContext<AutocompleteGroupContext>;

/**
 * {@link AutocompleteGroupContext} を読み取るフックです。
 */
export const useAutocompleteGroupContext: IUseAutocompleteGroupContext =
  function useSuiAutocompleteGroupContext(optional): any {
    const ctx = React.use(AutocompleteGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteGroupContext",
        providerName: "AutocompleteGroup",
      });
    }

    return ctx;
  };

export { AutocompleteGroupContext as GroupContext, useAutocompleteGroupContext as useGroupContext };
