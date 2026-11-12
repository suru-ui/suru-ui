import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PortalContext } from "../portal/menu.portal.context.js";

/**
 * {@link MenuPositioner} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuPositionerContext<TItem = any> = Readonly<
  Override<PortalContext<TItem>, Menu.Positioner.State>
>;

/**
 * {@link MenuPositioner} が子パーツへ提供するコンテキストです。
 */
export const MenuPositionerContext: React.Context<MenuPositionerContext | null> =
  React.createContext<MenuPositionerContext | null>(null);

export type IUseMenuPositionerContext = IUseContext<MenuPositionerContext>;

/**
 * {@link MenuPositionerContext} を読み取るフックです。
 */
export const useMenuPositionerContext: IUseMenuPositionerContext = (optional): any => {
  const ctx = React.use(MenuPositionerContext);

  if (ctx === null && optional !== true) {
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
