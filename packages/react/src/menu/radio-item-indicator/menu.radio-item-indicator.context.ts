import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { MenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuRadioItemIndicator} が子パーツへ提供する状態です。
 */
export type MenuRadioItemIndicatorContext = Readonly<
  Override<MenuContext, Menu.RadioItemIndicator.State>
>;

/**
 * {@link MenuRadioItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const MenuRadioItemIndicatorContext: React.Context<MenuRadioItemIndicatorContext | null> =
  React.createContext<MenuRadioItemIndicatorContext | null>(null);

export type IUseMenuRadioItemIndicatorContext = IUseContext<MenuRadioItemIndicatorContext>;

/**
 * {@link MenuRadioItemIndicatorContext} を読み取るフックです。
 */
export const useMenuRadioItemIndicatorContext: IUseMenuRadioItemIndicatorContext =
  function useSuiMenuRadioItemIndicatorContext(optional): any {
    const ctx = React.use(MenuRadioItemIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MenuRadioItemIndicatorContext",
        providerName: "MenuRadioItemIndicator",
      });
    }

    return ctx;
  };

export {
  MenuRadioItemIndicatorContext as RadioItemIndicatorContext,
  useMenuRadioItemIndicatorContext as useRadioItemIndicatorContext,
};
