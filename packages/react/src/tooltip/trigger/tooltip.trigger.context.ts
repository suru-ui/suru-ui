import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TooltipTriggerState } from "./tooltip.trigger.jsx";

/**
 * {@link TooltipTrigger} が子パーツへ提供する状態です。
 */
export type TooltipTriggerContext = Readonly<TooltipTriggerState>;

/**
 * {@link TooltipTrigger} が子パーツへ提供するコンテキストです。
 */
export const TooltipTriggerContext: React.Context<TooltipTriggerContext | null> =
  React.createContext<TooltipTriggerContext | null>(null);

export type IUseTooltipTriggerContext = IUseContext<TooltipTriggerContext>;

/**
 * {@link TooltipTriggerContext} を読み取るフックです。
 */
export const useTooltipTriggerContext: IUseTooltipTriggerContext =
  function useSuiTooltipTriggerContext(optional): any {
    const ctx = React.use(TooltipTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "TooltipTriggerContext",
        providerName: "TooltipTrigger",
      });
    }

    return ctx;
  };

export { TooltipTriggerContext as TriggerContext, useTooltipTriggerContext as useTriggerContext };
