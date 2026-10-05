import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuGroupState } from "./menu.group.jsx";

/**
 * {@link MenuGroup} が子パーツへ提供する状態です。
 */
export type MenuGroupContext = Readonly<MenuGroupState>;

/**
 * {@link MenuGroup} が子パーツへ提供するコンテキストです。
 */
export const MenuGroupContext: React.Context<MenuGroupContext | null> =
  React.createContext<MenuGroupContext | null>(null);

export type IUseMenuGroupContext = IUseContext<MenuGroupContext>;

/**
 * {@link MenuGroupContext} を読み取るフックです。
 */
export const useMenuGroupContext: IUseMenuGroupContext = function useSuiMenuGroupContext(
  optional,
): any {
  const ctx = React.use(MenuGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuGroupContext",
      providerName: "MenuGroup",
    });
  }

  return ctx;
};

export { MenuGroupContext as GroupContext, useMenuGroupContext as useGroupContext };
