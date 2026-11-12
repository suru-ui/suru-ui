import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuRadioGroup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuRadioGroupContext<TItem = any> = Readonly<
  Override<MenuContext<TItem>, Menu.RadioGroup.State>
>;

/**
 * {@link MenuRadioGroup} が子パーツへ提供するコンテキストです。
 */
export const MenuRadioGroupContext: React.Context<MenuRadioGroupContext | null> =
  React.createContext<MenuRadioGroupContext | null>(null);

export type IUseMenuRadioGroupContext = IUseContext<MenuRadioGroupContext>;

/**
 * {@link MenuRadioGroupContext} を読み取るフックです。
 */
export const useMenuRadioGroupContext: IUseMenuRadioGroupContext = (optional): any => {
  const ctx = React.use(MenuRadioGroupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "MenuRadioGroupContext",
      providerName: "MenuRadioGroup",
    });
  }

  return ctx;
};

export {
  MenuRadioGroupContext as RadioGroupContext,
  useMenuRadioGroupContext as useRadioGroupContext,
};
