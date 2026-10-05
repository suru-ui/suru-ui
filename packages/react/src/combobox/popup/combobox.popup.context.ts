import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxPopup} が子パーツへ提供する状態です。
 */
export type ComboboxPopupContext = Readonly<Override<ComboboxContext, Combobox.Popup.State>>;

/**
 * {@link ComboboxPopup} が子パーツへ提供するコンテキストです。
 */
export const ComboboxPopupContext: React.Context<ComboboxPopupContext | null> =
  React.createContext<ComboboxPopupContext | null>(null);

export type IUseComboboxPopupContext = IUseContext<ComboboxPopupContext>;

/**
 * {@link ComboboxPopupContext} を読み取るフックです。
 */
export const useComboboxPopupContext: IUseComboboxPopupContext =
  function useSuiComboboxPopupContext(optional): any {
    const ctx = React.use(ComboboxPopupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxPopupContext",
        providerName: "ComboboxPopup",
      });
    }

    return ctx;
  };

export { ComboboxPopupContext as PopupContext, useComboboxPopupContext as usePopupContext };
