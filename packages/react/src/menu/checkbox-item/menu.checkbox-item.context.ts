import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuCheckboxItemState } from "./menu.checkbox-item.jsx";

/**
 * {@link MenuCheckboxItem} が子パーツへ提供する状態です。
 */
export type MenuCheckboxItemContext = Readonly<MenuCheckboxItemState>;

/**
 * {@link MenuCheckboxItem} が子パーツへ提供するコンテキストです。
 */
export const MenuCheckboxItemContext: React.Context<MenuCheckboxItemContext | null> =
  React.createContext<MenuCheckboxItemContext | null>(null);

export type IUseMenuCheckboxItemContext = IUseContext<MenuCheckboxItemContext>;

/**
 * {@link MenuCheckboxItemContext} を読み取るフックです。
 */
export const useMenuCheckboxItemContext: IUseMenuCheckboxItemContext =
  function useSuiMenuCheckboxItemContext(optional): any {
    const ctx = React.use(MenuCheckboxItemContext);
    if (ctx === null && !optional) {
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
