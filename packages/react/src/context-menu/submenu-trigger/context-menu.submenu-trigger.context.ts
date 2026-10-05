import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuSubmenuTriggerState } from "./context-menu.submenu-trigger.jsx";

/**
 * {@link ContextMenuSubmenuTrigger} が子パーツへ提供する状態です。
 */
export type ContextMenuSubmenuTriggerContext = Readonly<ContextMenuSubmenuTriggerState>;

/**
 * {@link ContextMenuSubmenuTrigger} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuSubmenuTriggerContext: React.Context<ContextMenuSubmenuTriggerContext | null> =
  React.createContext<ContextMenuSubmenuTriggerContext | null>(null);

export type IUseContextMenuSubmenuTriggerContext = IUseContext<ContextMenuSubmenuTriggerContext>;

/**
 * {@link ContextMenuSubmenuTriggerContext} を読み取るフックです。
 */
export const useContextMenuSubmenuTriggerContext: IUseContextMenuSubmenuTriggerContext =
  function useSuiContextMenuSubmenuTriggerContext(optional): any {
    const ctx = React.use(ContextMenuSubmenuTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuSubmenuTriggerContext",
        providerName: "ContextMenuSubmenuTrigger",
      });
    }

    return ctx;
  };

export {
  ContextMenuSubmenuTriggerContext as SubmenuTriggerContext,
  useContextMenuSubmenuTriggerContext as useSubmenuTriggerContext,
};
