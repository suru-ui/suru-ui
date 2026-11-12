import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopoverContext } from "../root/popover.root.context.js";

/**
 * {@link PopoverTrigger} が子パーツへ提供する状態です。
 */
export type PopoverTriggerContext = Readonly<Override<PopoverContext, Popover.Trigger.State>>;

/**
 * {@link PopoverTrigger} が子パーツへ提供するコンテキストです。
 */
export const PopoverTriggerContext: React.Context<PopoverTriggerContext | null> =
  React.createContext<PopoverTriggerContext | null>(null);

export type IUsePopoverTriggerContext = IUseContext<PopoverTriggerContext>;

/**
 * {@link PopoverTriggerContext} を読み取るフックです。
 */
export const usePopoverTriggerContext: IUsePopoverTriggerContext = (optional): any => {
  const ctx = React.use(PopoverTriggerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "PopoverTriggerContext",
      providerName: "PopoverTrigger",
    });
  }

  return ctx;
};

export { PopoverTriggerContext as TriggerContext, usePopoverTriggerContext as useTriggerContext };
