import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuTrigger} が子パーツへ提供する状態です。
 */
export type MenuTriggerContext = Readonly<Override<MenuContext, Menu.Trigger.State>>;

/**
 * {@link MenuTrigger} が子パーツへ提供するコンテキストです。
 */
export const MenuTriggerContext: React.Context<MenuTriggerContext | null> =
  React.createContext<MenuTriggerContext | null>(null);

export type IUseMenuTriggerContext = IUseContext<MenuTriggerContext>;

/**
 * {@link MenuTriggerContext} を読み取るフックです。
 */
export const useMenuTriggerContext: IUseMenuTriggerContext = function useSuiMenuTriggerContext(
  optional,
): any {
  const ctx = React.use(MenuTriggerContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuTriggerContext",
      providerName: "MenuTrigger",
    });
  }

  return ctx;
};

export { MenuTriggerContext as TriggerContext, useMenuTriggerContext as useTriggerContext };
