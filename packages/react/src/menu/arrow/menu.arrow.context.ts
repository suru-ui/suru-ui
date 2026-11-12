import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/menu.popup.context.js";

/**
 * {@link MenuArrow} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuArrowContext<TItem = any> = Readonly<
  Override<PopupContext<TItem>, Menu.Arrow.State>
>;

/**
 * {@link MenuArrow} が子パーツへ提供するコンテキストです。
 */
export const MenuArrowContext: React.Context<MenuArrowContext | null> =
  React.createContext<MenuArrowContext | null>(null);

export type IUseMenuArrowContext = IUseContext<MenuArrowContext>;

/**
 * {@link MenuArrowContext} を読み取るフックです。
 */
export const useMenuArrowContext: IUseMenuArrowContext = (optional): any => {
  const ctx = React.use(MenuArrowContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MenuArrowContext",
      providerName: "MenuArrow",
    });
  }

  return ctx;
};

export { MenuArrowContext as ArrowContext, useMenuArrowContext as useArrowContext };
