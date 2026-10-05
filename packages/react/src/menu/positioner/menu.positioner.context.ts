import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuPositioner} が子パーツへ提供する状態です。
 */
export type MenuPositionerContext = Readonly<Override<MenuContext, Menu.Positioner.State>>;

/**
 * {@link MenuPositioner} が子パーツへ提供するコンテキストです。
 */
export const MenuPositionerContext: React.Context<MenuPositionerContext | null> =
  React.createContext<MenuPositionerContext | null>(null);

export type IUseMenuPositionerContext = IUseContext<MenuPositionerContext>;

/**
 * {@link MenuPositionerContext} を読み取るフックです。
 */
export const useMenuPositionerContext: IUseMenuPositionerContext =
  function useSuiMenuPositionerContext(optional): any {
    const ctx = React.use(MenuPositionerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MenuPositionerContext",
        providerName: "MenuPositioner",
      });
    }

    return ctx;
  };

export {
  MenuPositionerContext as PositionerContext,
  useMenuPositionerContext as usePositionerContext,
};
