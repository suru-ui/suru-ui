import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuLinkItemState } from "./menu.link-item.jsx";

/**
 * {@link MenuLinkItem} が子パーツへ提供する状態です。
 */
export type MenuLinkItemContext = Readonly<MenuLinkItemState>;

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
