import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AutocompleteContext } from "../root/autocomplete.root.context.js";

/**
 * {@link AutocompletePopup} が子パーツへ提供する状態です。
 */
export type AutocompletePopupContext = Readonly<
  Override<AutocompleteContext, Autocomplete.Popup.State>
>;

/**
 * {@link AutocompletePopup} が子パーツへ提供するコンテキストです。
 */
export const AutocompletePopupContext: React.Context<AutocompletePopupContext | null> =
  React.createContext<AutocompletePopupContext | null>(null);

export type IUseAutocompletePopupContext = IUseContext<AutocompletePopupContext>;

/**
 * {@link AutocompletePopupContext} を読み取るフックです。
 */
export const useAutocompletePopupContext: IUseAutocompletePopupContext =
  function useSuiAutocompletePopupContext(optional): any {
    const ctx = React.use(AutocompletePopupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompletePopupContext",
        providerName: "AutocompletePopup",
      });
    }

    return ctx;
  };

export { AutocompletePopupContext as PopupContext, useAutocompletePopupContext as usePopupContext };
