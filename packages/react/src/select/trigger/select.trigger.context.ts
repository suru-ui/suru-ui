import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectTriggerState } from "./select.trigger.jsx";

/**
 * {@link SelectTrigger} が子パーツへ提供する状態です。
 */
export type SelectTriggerContext = Readonly<SelectTriggerState>;

/**
 * {@link SelectTrigger} が子パーツへ提供するコンテキストです。
 */
export const SelectTriggerContext: React.Context<SelectTriggerContext | null> =
  React.createContext<SelectTriggerContext | null>(null);

export type IUseSelectTriggerContext = IUseContext<SelectTriggerContext>;

/**
 * {@link SelectTriggerContext} を読み取るフックです。
 */
export const useSelectTriggerContext: IUseSelectTriggerContext =
  function useSuiSelectTriggerContext(optional): any {
    const ctx = React.use(SelectTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectTriggerContext",
        providerName: "SelectTrigger",
      });
    }

    return ctx;
  };

export { SelectTriggerContext as TriggerContext, useSelectTriggerContext as useTriggerContext };
