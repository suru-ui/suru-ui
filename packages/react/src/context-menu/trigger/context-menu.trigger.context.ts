import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuTrigger} が子パーツへ提供する状態です。
 */
export type ContextMenuTriggerContext = Readonly<
  Override<ContextMenuContext, ContextMenu.Trigger.State>
>;

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
