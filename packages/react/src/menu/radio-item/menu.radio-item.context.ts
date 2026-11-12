import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuRadioItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuRadioItemContext<TItem = any> = Readonly<
  Override<MenuContext<TItem>, Override<Button.Root.State, Menu.RadioItem.State>>
>;

/**
 * {@link MenuRadioItem} が子パーツへ提供するコンテキストです。
 */
export const MenuRadioItemContext: React.Context<MenuRadioItemContext | null> =
  React.createContext<MenuRadioItemContext | null>(null);

export type IUseMenuRadioItemContext = IUseContext<MenuRadioItemContext>;

/**
 * {@link MenuRadioItemContext} を読み取るフックです。
 */
export const useMenuRadioItemContext: IUseMenuRadioItemContext = (optional): any => {
  const ctx = React.use(MenuRadioItemContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MenuRadioItemContext",
      providerName: "MenuRadioItem",
    });
  }

  return ctx;
};

export { MenuRadioItemContext as RadioItemContext, useMenuRadioItemContext as useRadioItemContext };
