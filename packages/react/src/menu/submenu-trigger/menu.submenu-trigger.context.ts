import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuSubmenuTriggerState } from "./menu.submenu-trigger.jsx";

/**
 * {@link MenuSubmenuTrigger} が子パーツへ提供する状態です。
 */
export type MenuSubmenuTriggerContext = Readonly<MenuSubmenuTriggerState>;

/**
 * {@link MenuSubmenuTrigger} が子パーツへ提供するコンテキストです。
 */
export const MenuSubmenuTriggerContext: React.Context<MenuSubmenuTriggerContext | null> =
  React.createContext<MenuSubmenuTriggerContext | null>(null);

export type IUseMenuSubmenuTriggerContext = IUseContext<MenuSubmenuTriggerContext>;

/**
 * {@link MenuSubmenuTriggerContext} を読み取るフックです。
 */
export const useMenuSubmenuTriggerContext: IUseMenuSubmenuTriggerContext =
  function useSuiMenuSubmenuTriggerContext(optional): any {
    const ctx = React.use(MenuSubmenuTriggerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MenuSubmenuTriggerContext",
        providerName: "MenuSubmenuTrigger",
      });
    }

    return ctx;
  };

export {
  MenuSubmenuTriggerContext as SubmenuTriggerContext,
  useMenuSubmenuTriggerContext as useSubmenuTriggerContext,
};
