import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuViewport} が子パーツへ提供する状態です。
 */
export type MenuViewportContext = Readonly<Override<MenuContext, Menu.Viewport.State>>;

/**
 * {@link MenuViewport} が子パーツへ提供するコンテキストです。
 */
export const MenuViewportContext: React.Context<MenuViewportContext | null> =
  React.createContext<MenuViewportContext | null>(null);

export type IUseMenuViewportContext = IUseContext<MenuViewportContext>;

/**
 * {@link MenuViewportContext} を読み取るフックです。
 */
export const useMenuViewportContext: IUseMenuViewportContext = function useSuiMenuViewportContext(
  optional,
): any {
  const ctx = React.use(MenuViewportContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuViewportContext",
      providerName: "MenuViewport",
    });
  }

  return ctx;
};

export { MenuViewportContext as ViewportContext, useMenuViewportContext as useViewportContext };
