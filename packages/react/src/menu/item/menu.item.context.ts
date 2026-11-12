import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuItemContext<TItem = any> = Readonly<
  Override<MenuContext<TItem>, Override<Button.Root.State, Menu.Item.State>>
>;

/**
 * {@link MenuItem} が子パーツへ提供するコンテキストです。
 */
export const MenuItemContext: React.Context<MenuItemContext | null> =
  React.createContext<MenuItemContext | null>(null);

export type IUseMenuItemContext = IUseContext<MenuItemContext>;

/**
 * {@link MenuItemContext} を読み取るフックです。
 */
export const useMenuItemContext: IUseMenuItemContext = (optional): any => {
  const ctx = React.use(MenuItemContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MenuItemContext",
      providerName: "MenuItem",
    });
  }

  return ctx;
};

export { MenuItemContext as ItemContext, useMenuItemContext as useItemContext };
