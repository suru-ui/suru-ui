import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuPortal} が子パーツへ提供する状態です。
 */
export type MenuPortalContext = Readonly<Override<MenuContext, Menu.Portal.State>>;

/**
 * {@link MenuPortal} が子パーツへ提供するコンテキストです。
 */
export const MenuPortalContext: React.Context<MenuPortalContext | null> =
  React.createContext<MenuPortalContext | null>(null);

export type IUseMenuPortalContext = IUseContext<MenuPortalContext>;

/**
 * {@link MenuPortalContext} を読み取るフックです。
 */
export const useMenuPortalContext: IUseMenuPortalContext = function useSuiMenuPortalContext(
  optional,
): any {
  const ctx = React.use(MenuPortalContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuPortalContext",
      providerName: "MenuPortal",
    });
  }

  return ctx;
};

export { MenuPortalContext as PortalContext, useMenuPortalContext as usePortalContext };
