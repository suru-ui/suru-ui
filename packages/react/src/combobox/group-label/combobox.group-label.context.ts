import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxGroupLabel} が子パーツへ提供する状態です。
 */
export type ComboboxGroupLabelContext = Readonly<
  Override<ComboboxContext, Combobox.GroupLabel.State>
>;

/**
 * {@link ComboboxGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const ComboboxGroupLabelContext: React.Context<ComboboxGroupLabelContext | null> =
  React.createContext<ComboboxGroupLabelContext | null>(null);

export type IUseComboboxGroupLabelContext = IUseContext<ComboboxGroupLabelContext>;

/**
 * {@link ComboboxGroupLabelContext} を読み取るフックです。
 */
export const useComboboxGroupLabelContext: IUseComboboxGroupLabelContext =
  function useSuiComboboxGroupLabelContext(optional): any {
    const ctx = React.use(ComboboxGroupLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxGroupLabelContext",
        providerName: "ComboboxGroupLabel",
      });
    }

    return ctx;
  };

export {
  ComboboxGroupLabelContext as GroupLabelContext,
  useComboboxGroupLabelContext as useGroupLabelContext,
};
