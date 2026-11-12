import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuBackdrop} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuBackdropContext<TItem = any> = Readonly<
  Override<MenuContext<TItem>, Menu.Backdrop.State>
>;

/**
 * {@link MenuBackdrop} が子パーツへ提供するコンテキストです。
 */
export const MenuBackdropContext: React.Context<MenuBackdropContext | null> =
  React.createContext<MenuBackdropContext | null>(null);

export type IUseMenuBackdropContext = IUseContext<MenuBackdropContext>;

/**
 * {@link MenuBackdropContext} を読み取るフックです。
 */
export const useMenuBackdropContext: IUseMenuBackdropContext = (optional): any => {
  const ctx = React.use(MenuBackdropContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MenuBackdropContext",
      providerName: "MenuBackdrop",
    });
  }

  return ctx;
};

export { MenuBackdropContext as BackdropContext, useMenuBackdropContext as useBackdropContext };
