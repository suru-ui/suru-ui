import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxPopupContext } from "../popup/combobox.popup.context.js";

/**
 * {@link ComboboxArrow} が子パーツへ提供する状態です。
 */
export type ComboboxArrowContext = Readonly<Override<ComboboxPopupContext, Combobox.Arrow.State>>;

/**
 * {@link ComboboxArrow} が子パーツへ提供するコンテキストです。
 */
export const ComboboxArrowContext: React.Context<ComboboxArrowContext | null> =
  React.createContext<ComboboxArrowContext | null>(null);

export type IUseComboboxArrowContext = IUseContext<ComboboxArrowContext>;

/**
 * {@link ComboboxArrowContext} を読み取るフックです。
 */
export const useComboboxArrowContext: IUseComboboxArrowContext =
  function useSuiComboboxArrowContext(optional): any {
    const ctx = React.use(ComboboxArrowContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxArrowContext",
        providerName: "ComboboxArrow",
      });
    }

    return ctx;
  };

export { ComboboxArrowContext as ArrowContext, useComboboxArrowContext as useArrowContext };
