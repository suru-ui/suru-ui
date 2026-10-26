import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/menu.positioner.context.js";

/**
 * {@link MenuPopup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuPopupContext<TItem = any> = Readonly<
  Override<PositionerContext<TItem>, Menu.Popup.State>
>;

/**
 * {@link MenuPopup} が子パーツへ提供するコンテキストです。
 */
export const MenuPopupContext: React.Context<MenuPopupContext | null> =
  React.createContext<MenuPopupContext | null>(null);

export type IUseMenuPopupContext = IUseContext<MenuPopupContext>;

/**
 * {@link MenuPopupContext} を読み取るフックです。
 */
export const useMenuPopupContext: IUseMenuPopupContext = function useSuiMenuPopupContext(
  optional,
): any {
  const ctx = React.use(MenuPopupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuPopupContext",
      providerName: "MenuPopup",
    });
  }

  return ctx;
};

export { MenuPopupContext as PopupContext, useMenuPopupContext as usePopupContext };
