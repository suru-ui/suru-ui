import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompletePopupState } from "./autocomplete.popup.jsx";

/**
 * {@link AutocompletePopup} が子パーツへ提供する状態です。
 */
export type AutocompletePopupContext = Readonly<AutocompletePopupState>;

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
