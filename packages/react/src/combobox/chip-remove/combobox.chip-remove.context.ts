import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxChipRemove} が子パーツへ提供する状態です。
 */
export type ComboboxChipRemoveContext = Readonly<
  Override<ComboboxContext, Combobox.ChipRemove.State>
>;

/**
 * {@link ComboboxChipRemove} が子パーツへ提供するコンテキストです。
 */
export const ComboboxChipRemoveContext: React.Context<ComboboxChipRemoveContext | null> =
  React.createContext<ComboboxChipRemoveContext | null>(null);

export type IUseComboboxChipRemoveContext = IUseContext<ComboboxChipRemoveContext>;

/**
 * {@link ComboboxChipRemoveContext} を読み取るフックです。
 */
export const useComboboxChipRemoveContext: IUseComboboxChipRemoveContext =
  function useSuiComboboxChipRemoveContext(optional): any {
    const ctx = React.use(ComboboxChipRemoveContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxChipRemoveContext",
        providerName: "ComboboxChipRemove",
      });
    }

    return ctx;
  };

export {
  ComboboxChipRemoveContext as ChipRemoveContext,
  useComboboxChipRemoveContext as useChipRemoveContext,
};
