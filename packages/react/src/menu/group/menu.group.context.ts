import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuGroup} が子パーツへ提供する状態です。
 */
export type MenuGroupContext = Readonly<Override<MenuContext, Menu.Group.State>>;

/**
 * {@link MenuGroup} が子パーツへ提供するコンテキストです。
 */
export const MenuGroupContext: React.Context<MenuGroupContext | null> =
  React.createContext<MenuGroupContext | null>(null);

export type IUseMenuGroupContext = IUseContext<MenuGroupContext>;

/**
 * {@link MenuGroupContext} を読み取るフックです。
 */
export const useMenuGroupContext: IUseMenuGroupContext = function useSuiMenuGroupContext(
  optional,
): any {
  const ctx = React.use(MenuGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuGroupContext",
      providerName: "MenuGroup",
    });
  }

  return ctx;
};

export { MenuGroupContext as GroupContext, useMenuGroupContext as useGroupContext };
