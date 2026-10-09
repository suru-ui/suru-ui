import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/combobox.popup.context.js";

/**
 * {@link ComboboxStatus} が子パーツへ提供する状態です。
 */
export type ComboboxStatusContext = Readonly<Override<PopupContext, Combobox.Status.State>>;

/**
 * {@link ComboboxStatus} が子パーツへ提供するコンテキストです。
 */
export const ComboboxStatusContext: React.Context<ComboboxStatusContext | null> =
  React.createContext<ComboboxStatusContext | null>(null);

export type IUseComboboxStatusContext = IUseContext<ComboboxStatusContext>;

/**
 * {@link ComboboxStatusContext} を読み取るフックです。
 */
export const useComboboxStatusContext: IUseComboboxStatusContext =
  function useSuiComboboxStatusContext(optional): any {
    const ctx = React.use(ComboboxStatusContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxStatusContext",
        providerName: "ComboboxStatus",
      });
    }

    return ctx;
  };

export { ComboboxStatusContext as StatusContext, useComboboxStatusContext as useStatusContext };
