import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuLinkItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuLinkItemContext<TItem = any> = Readonly<
  Override<MenuContext<TItem>, Override<Button.Root.State, Menu.LinkItem.State>>
>;

/**
 * {@link MenuLinkItem} が子パーツへ提供するコンテキストです。
 */
export const MenuLinkItemContext: React.Context<MenuLinkItemContext | null> =
  React.createContext<MenuLinkItemContext | null>(null);

export type IUseMenuLinkItemContext = IUseContext<MenuLinkItemContext>;

/**
 * {@link MenuLinkItemContext} を読み取るフックです。
 */
export const useMenuLinkItemContext: IUseMenuLinkItemContext = function useSuiMenuLinkItemContext(
  optional,
): any {
  const ctx = React.use(MenuLinkItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuLinkItemContext",
      providerName: "MenuLinkItem",
    });
  }

  return ctx;
};

export { MenuLinkItemContext as LinkItemContext, useMenuLinkItemContext as useLinkItemContext };
