import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuBackdropState } from "./menu.backdrop.jsx";

/**
 * {@link MenuBackdrop} が子パーツへ提供する状態です。
 */
export type MenuBackdropContext = Readonly<MenuBackdropState>;

/**
 * {@link MenuBackdrop} が子パーツへ提供するコンテキストです。
 */
export const MenuBackdropContext: React.Context<MenuBackdropContext | null> =
  React.createContext<MenuBackdropContext | null>(null);

export type IUseMenuBackdropContext = IUseContext<MenuBackdropContext>;

/**
 * {@link MenuBackdropContext} を読み取るフックです。
 */
export const useMenuBackdropContext: IUseMenuBackdropContext = function useSuiMenuBackdropContext(
  optional,
): any {
  const ctx = React.use(MenuBackdropContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuBackdropContext",
      providerName: "MenuBackdrop",
    });
  }

  return ctx;
};

export { MenuBackdropContext as BackdropContext, useMenuBackdropContext as useBackdropContext };
