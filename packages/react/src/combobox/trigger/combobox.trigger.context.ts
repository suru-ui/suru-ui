import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxTrigger} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxTriggerContext<TItem = any> = Readonly<
  Override<ComboboxContext<TItem>, Combobox.Trigger.State>
>;

/**
 * {@link ComboboxTrigger} が子パーツへ提供するコンテキストです。
 */
export const ComboboxTriggerContext: React.Context<ComboboxTriggerContext | null> =
  React.createContext<ComboboxTriggerContext | null>(null);

export type IUseComboboxTriggerContext = IUseContext<ComboboxTriggerContext>;

/**
 * {@link ComboboxTriggerContext} を読み取るフックです。
 */
export const useComboboxTriggerContext: IUseComboboxTriggerContext = (optional): any => {
  const ctx = React.use(ComboboxTriggerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ComboboxTriggerContext",
      providerName: "ComboboxTrigger",
    });
  }

  return ctx;
};

export { ComboboxTriggerContext as TriggerContext, useComboboxTriggerContext as useTriggerContext };
