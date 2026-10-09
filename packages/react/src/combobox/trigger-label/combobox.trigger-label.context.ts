import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxTriggerLabel} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxTriggerLabelContext<TItem = any> = Readonly<
  Override<ComboboxContext<TItem>, Combobox.Label.State>
>;

/**
 * {@link ComboboxTriggerLabel} が子パーツへ提供するコンテキストです。
 */
export const ComboboxTriggerLabelContext: React.Context<ComboboxTriggerLabelContext | null> =
  React.createContext<ComboboxTriggerLabelContext | null>(null);

export type IUseComboboxTriggerLabelContext = IUseContext<ComboboxTriggerLabelContext>;

/**
 * {@link ComboboxTriggerLabelContext} を読み取るフックです。
 */
export const useComboboxTriggerLabelContext: IUseComboboxTriggerLabelContext =
  function useSuiComboboxTriggerLabelContext(optional): any {
    const ctx = React.use(ComboboxTriggerLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxTriggerLabelContext",
        providerName: "ComboboxTriggerLabel",
      });
    }

    return ctx;
  };

export {
  ComboboxTriggerLabelContext as TriggerLabelContext,
  useComboboxTriggerLabelContext as useTriggerLabelContext,
};
