import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxPopupContext } from "../popup/combobox.popup.context.js";

/**
 * {@link ComboboxList} が子パーツへ提供する状態です。
 */
export type ComboboxListContext = Readonly<Override<ComboboxPopupContext, Combobox.List.State>>;

/**
 * {@link ComboboxList} が子パーツへ提供するコンテキストです。
 */
export const ComboboxListContext: React.Context<ComboboxListContext | null> =
  React.createContext<ComboboxListContext | null>(null);

export type IUseComboboxListContext = IUseContext<ComboboxListContext>;

/**
 * {@link ComboboxListContext} を読み取るフックです。
 */
export const useComboboxListContext: IUseComboboxListContext = function useSuiComboboxListContext(
  optional,
): any {
  const ctx = React.use(ComboboxListContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxListContext",
      providerName: "ComboboxList",
    });
  }

  return ctx;
};

export { ComboboxListContext as ListContext, useComboboxListContext as useListContext };
