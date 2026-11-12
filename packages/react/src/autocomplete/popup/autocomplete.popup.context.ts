import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/autocomplete.positioner.context.js";

/**
 * {@link AutocompletePopup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompletePopupContext<TItem = any> = Readonly<
  Override<PositionerContext<TItem>, Autocomplete.Popup.State>
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
export const useAutocompletePopupContext: IUseAutocompletePopupContext = (optional): any => {
  const ctx = React.use(AutocompletePopupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "AutocompletePopupContext",
      providerName: "AutocompletePopup",
    });
  }

  return ctx;
};

export { AutocompletePopupContext as PopupContext, useAutocompletePopupContext as usePopupContext };
