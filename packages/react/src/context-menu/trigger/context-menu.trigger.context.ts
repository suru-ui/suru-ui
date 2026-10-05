import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuTriggerState } from "./context-menu.trigger.jsx";

/**
 * {@link ContextMenuTrigger} が子パーツへ提供する状態です。
 */
export type ContextMenuTriggerContext = Readonly<ContextMenuTriggerState>;

/**
 * {@link ContextMenuTrigger} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuTriggerContext: React.Context<ContextMenuTriggerContext | null> =
  React.createContext<ContextMenuTriggerContext | null>(null);

export type IUseContextMenuTriggerContext = IUseContext<ContextMenuTriggerContext>;

/**
 * {@link ContextMenuTriggerContext} を読み取るフックです。
 */
export const useContextMenuTriggerContext: IUseContextMenuTriggerContext =
  function useSuiContextMenuTriggerContext(optional): any {
    const ctx = React.use(ContextMenuTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuTriggerContext",
        providerName: "ContextMenuTrigger",
      });
    }

    return ctx;
  };

export {
  ContextMenuTriggerContext as TriggerContext,
  useContextMenuTriggerContext as useTriggerContext,
};
