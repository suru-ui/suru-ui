import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuItemState } from "./menu.item.jsx";

/**
 * {@link MenuItem} が子パーツへ提供する状態です。
 */
export type MenuItemContext = Readonly<MenuItemState>;

/**
 * {@link MenuItem} が子パーツへ提供するコンテキストです。
 */
export const MenuItemContext: React.Context<MenuItemContext | null> =
  React.createContext<MenuItemContext | null>(null);

export type IUseMenuItemContext = IUseContext<MenuItemContext>;

/**
 * {@link MenuItemContext} を読み取るフックです。
 */
export const useMenuItemContext: IUseMenuItemContext = function useSuiMenuItemContext(
  optional,
): any {
  const ctx = React.use(MenuItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuItemContext",
      providerName: "MenuItem",
    });
  }

  return ctx;
};

export { MenuItemContext as ItemContext, useMenuItemContext as useItemContext };
