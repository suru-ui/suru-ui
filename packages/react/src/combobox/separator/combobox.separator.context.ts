import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxSeparator} が子パーツへ提供する状態です。
 */
export type ComboboxSeparatorContext = Readonly<
  Override<ComboboxContext, Combobox.Separator.State>
>;

/**
 * {@link ComboboxSeparator} が子パーツへ提供するコンテキストです。
 */
export const ComboboxSeparatorContext: React.Context<ComboboxSeparatorContext | null> =
  React.createContext<ComboboxSeparatorContext | null>(null);

export type IUseComboboxSeparatorContext = IUseContext<ComboboxSeparatorContext>;

/**
 * {@link ComboboxSeparatorContext} を読み取るフックです。
 */
export const useComboboxSeparatorContext: IUseComboboxSeparatorContext =
  function useSuiComboboxSeparatorContext(optional): any {
    const ctx = React.use(ComboboxSeparatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxSeparatorContext",
        providerName: "ComboboxSeparator",
      });
    }

    return ctx;
  };

export {
  ComboboxSeparatorContext as SeparatorContext,
  useComboboxSeparatorContext as useSeparatorContext,
};
