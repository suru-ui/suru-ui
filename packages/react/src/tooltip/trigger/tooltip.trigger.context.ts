import type { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TooltipContext } from "../root/tooltip.root.context.js";

/**
 * {@link TooltipTrigger} が子パーツへ提供する状態です。
 */
export type TooltipTriggerContext = Readonly<Override<TooltipContext, Tooltip.Trigger.State>>;

/**
 * {@link TooltipTrigger} が子パーツへ提供するコンテキストです。
 */
export const TooltipTriggerContext: React.Context<TooltipTriggerContext | null> =
  React.createContext<TooltipTriggerContext | null>(null);

export type IUseTooltipTriggerContext = IUseContext<TooltipTriggerContext>;

/**
 * {@link TooltipTriggerContext} を読み取るフックです。
 */
export const useTooltipTriggerContext: IUseTooltipTriggerContext = (optional): any => {
  const ctx = React.use(TooltipTriggerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "TooltipTriggerContext",
      providerName: "TooltipTrigger",
    });
  }

  return ctx;
};

export { TooltipTriggerContext as TriggerContext, useTooltipTriggerContext as useTriggerContext };
