import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuArrowState } from "./menu.arrow.jsx";

/**
 * {@link MenuArrow} が子パーツへ提供する状態です。
 */
export type MenuArrowContext = Readonly<MenuArrowState>;

/**
 * {@link MenuArrow} が子パーツへ提供するコンテキストです。
 */
export const MenuArrowContext: React.Context<MenuArrowContext | null> =
  React.createContext<MenuArrowContext | null>(null);

export type IUseMenuArrowContext = IUseContext<MenuArrowContext>;

/**
 * {@link MenuArrowContext} を読み取るフックです。
 */
export const useMenuArrowContext: IUseMenuArrowContext = function useSuiMenuArrowContext(
  optional,
): any {
  const ctx = React.use(MenuArrowContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuArrowContext",
      providerName: "MenuArrow",
    });
  }

  return ctx;
};

export { MenuArrowContext as ArrowContext, useMenuArrowContext as useArrowContext };
