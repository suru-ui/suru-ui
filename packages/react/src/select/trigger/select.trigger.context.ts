import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectTrigger} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectTriggerContext<TValue = any> = Readonly<
  Override<SelectContext<TValue>, BaseSelect.Trigger.State>
>;

/**
 * {@link SelectTrigger} が子パーツへ提供するコンテキストです。
 */
export const SelectTriggerContext: React.Context<SelectTriggerContext | null> =
  React.createContext<SelectTriggerContext | null>(null);

export type IUseSelectTriggerContext = IUseContext<SelectTriggerContext>;

/**
 * {@link SelectTriggerContext} を読み取るフックです。
 */
export const useSelectTriggerContext: IUseSelectTriggerContext = (optional): any => {
  const ctx = React.use(SelectTriggerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SelectTriggerContext",
      providerName: "SelectTrigger",
    });
  }

  return ctx;
};

export { SelectTriggerContext as TriggerContext, useSelectTriggerContext as useTriggerContext };
