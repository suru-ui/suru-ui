import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverTriggerState } from "./popover.trigger.jsx";

/**
 * {@link PopoverTrigger} が子パーツへ提供する状態です。
 */
export type PopoverTriggerContext = Readonly<PopoverTriggerState>;

/**
 * {@link PopoverTrigger} が子パーツへ提供するコンテキストです。
 */
export const PopoverTriggerContext: React.Context<PopoverTriggerContext | null> =
  React.createContext<PopoverTriggerContext | null>(null);

export type IUsePopoverTriggerContext = IUseContext<PopoverTriggerContext>;

/**
 * {@link PopoverTriggerContext} を読み取るフックです。
 */
export const usePopoverTriggerContext: IUsePopoverTriggerContext =
  function useSuiPopoverTriggerContext(optional): any {
    const ctx = React.use(PopoverTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PopoverTriggerContext",
        providerName: "PopoverTrigger",
      });
    }

    return ctx;
  };

export { PopoverTriggerContext as TriggerContext, usePopoverTriggerContext as useTriggerContext };
