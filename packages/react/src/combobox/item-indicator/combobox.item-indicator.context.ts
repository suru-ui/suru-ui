import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxItemContext } from "../item/combobox.item.context.js";

/**
 * {@link ComboboxItemIndicator} が子パーツへ提供する状態です。
 */
export type ComboboxItemIndicatorContext = Readonly<
  Override<ComboboxItemContext, Combobox.ItemIndicator.State>
>;

/**
 * {@link ComboboxItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const ComboboxItemIndicatorContext: React.Context<ComboboxItemIndicatorContext | null> =
  React.createContext<ComboboxItemIndicatorContext | null>(null);

export type IUseComboboxItemIndicatorContext = IUseContext<ComboboxItemIndicatorContext>;

/**
 * {@link ComboboxItemIndicatorContext} を読み取るフックです。
 */
export const useComboboxItemIndicatorContext: IUseComboboxItemIndicatorContext =
  function useSuiComboboxItemIndicatorContext(optional): any {
    const ctx = React.use(ComboboxItemIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxItemIndicatorContext",
        providerName: "ComboboxItemIndicator",
      });
    }

    return ctx;
  };

export {
  ComboboxItemIndicatorContext as ItemIndicatorContext,
  useComboboxItemIndicatorContext as useItemIndicatorContext,
};
