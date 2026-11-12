import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/combobox.positioner.context.js";

/**
 * {@link ComboboxPopup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxPopupContext<TItem = any> = Readonly<
  Override<PositionerContext<TItem>, Combobox.Popup.State>
>;

/**
 * {@link ComboboxPopup} が子パーツへ提供するコンテキストです。
 */
export const ComboboxPopupContext: React.Context<ComboboxPopupContext | null> =
  React.createContext<ComboboxPopupContext | null>(null);

export type IUseComboboxPopupContext = IUseContext<ComboboxPopupContext>;

/**
 * {@link ComboboxPopupContext} を読み取るフックです。
 */
export const useComboboxPopupContext: IUseComboboxPopupContext = (optional): any => {
  const ctx = React.use(ComboboxPopupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxPopupContext",
      providerName: "ComboboxPopup",
    });
  }

  return ctx;
};

export { ComboboxPopupContext as PopupContext, useComboboxPopupContext as usePopupContext };
