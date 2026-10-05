import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuSeparator} が子パーツへ提供する状態です。
 */
export type MenuSeparatorContext = Readonly<Override<MenuContext, Menu.Separator.State>>;

/**
 * {@link MenuSeparator} が子パーツへ提供するコンテキストです。
 */
export const MenuSeparatorContext: React.Context<MenuSeparatorContext | null> =
  React.createContext<MenuSeparatorContext | null>(null);

export type IUseMenuSeparatorContext = IUseContext<MenuSeparatorContext>;

/**
 * {@link MenuSeparatorContext} を読み取るフックです。
 */
export const useMenuSeparatorContext: IUseMenuSeparatorContext =
  function useSuiMenuSeparatorContext(optional): any {
    const ctx = React.use(MenuSeparatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MenuSeparatorContext",
        providerName: "MenuSeparator",
      });
    }

    return ctx;
  };

export { MenuSeparatorContext as SeparatorContext, useMenuSeparatorContext as useSeparatorContext };
