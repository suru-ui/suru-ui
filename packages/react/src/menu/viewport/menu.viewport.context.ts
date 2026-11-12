import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuViewport} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuViewportContext<TItem = any> = Readonly<
  Override<MenuContext<TItem>, Menu.Viewport.State>
>;

/**
 * {@link MenuViewport} が子パーツへ提供するコンテキストです。
 */
export const MenuViewportContext: React.Context<MenuViewportContext | null> =
  React.createContext<MenuViewportContext | null>(null);

export type IUseMenuViewportContext = IUseContext<MenuViewportContext>;

/**
 * {@link MenuViewportContext} を読み取るフックです。
 */
export const useMenuViewportContext: IUseMenuViewportContext = (optional): any => {
  const ctx = React.use(MenuViewportContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MenuViewportContext",
      providerName: "MenuViewport",
    });
  }

  return ctx;
};

export { MenuViewportContext as ViewportContext, useMenuViewportContext as useViewportContext };
