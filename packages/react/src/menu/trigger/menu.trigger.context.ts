import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuTriggerState } from "./menu.trigger.jsx";

/**
 * {@link MenuTrigger} が子パーツへ提供する状態です。
 */
export type MenuTriggerContext = Readonly<MenuTriggerState>;

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
