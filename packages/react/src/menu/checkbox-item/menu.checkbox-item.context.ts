import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuCheckboxItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuCheckboxItemContext<TItem = any> = Readonly<
  Override<MenuContext<TItem>, Override<Button.Root.State, Menu.CheckboxItem.State>>
>;

/**
 * {@link MenuCheckboxItem} が子パーツへ提供するコンテキストです。
 */
export const MenuCheckboxItemContext: React.Context<MenuCheckboxItemContext | null> =
  React.createContext<MenuCheckboxItemContext | null>(null);

export type IUseMenuCheckboxItemContext = IUseContext<MenuCheckboxItemContext>;

/**
 * {@link MenuCheckboxItemContext} を読み取るフックです。
 */
export const useMenuCheckboxItemContext: IUseMenuCheckboxItemContext = (optional): any => {
  const ctx = React.use(MenuCheckboxItemContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MenuCheckboxItemContext",
      providerName: "MenuCheckboxItem",
    });
  }

  return ctx;
};

export {
  MenuCheckboxItemContext as CheckboxItemContext,
  useMenuCheckboxItemContext as useCheckboxItemContext,
};
