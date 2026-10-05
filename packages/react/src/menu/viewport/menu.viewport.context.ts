import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuViewportState } from "./menu.viewport.jsx";

/**
 * {@link MenuViewport} が子パーツへ提供する状態です。
 */
export type MenuViewportContext = Readonly<MenuViewportState>;

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
