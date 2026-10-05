import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuContent} が子パーツへ提供する状態です。
 */
export type MenuContentContext = Readonly<Override<MenuContext, Menu.Popup.State>>;

/**
 * {@link MenuContent} が子パーツへ提供するコンテキストです。
 */
export const MenuContentContext: React.Context<MenuContentContext | null> =
  React.createContext<MenuContentContext | null>(null);

export type IUseMenuContentContext = IUseContext<MenuContentContext>;

/**
 * {@link MenuContentContext} を読み取るフックです。
 */
export const useMenuContentContext: IUseMenuContentContext = function useSuiMenuContentContext(
  optional,
): any {
  const ctx = React.use(MenuContentContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuContentContext",
      providerName: "MenuContent",
    });
  }

  return ctx;
};

export { MenuContentContext as ContentContext, useMenuContentContext as useContentContext };
