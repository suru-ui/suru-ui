import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxClear} が子パーツへ提供する状態です。
 */
export type ComboboxClearContext = Readonly<Override<ComboboxContext, Combobox.Clear.State>>;

/**
 * {@link ComboboxClear} が子パーツへ提供するコンテキストです。
 */
export const ComboboxClearContext: React.Context<ComboboxClearContext | null> =
  React.createContext<ComboboxClearContext | null>(null);

export type IUseComboboxClearContext = IUseContext<ComboboxClearContext>;

/**
 * {@link ComboboxClearContext} を読み取るフックです。
 */
export const useComboboxClearContext: IUseComboboxClearContext =
  function useSuiComboboxClearContext(optional): any {
    const ctx = React.use(ComboboxClearContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxClearContext",
        providerName: "ComboboxClear",
      });
    }

    return ctx;
  };

export { ComboboxClearContext as ClearContext, useComboboxClearContext as useClearContext };
