import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuCheckboxItemIndicatorState } from "./menu.checkbox-item-indicator.jsx";

/**
 * {@link MenuCheckboxItemIndicator} が子パーツへ提供する状態です。
 */
export type MenuCheckboxItemIndicatorContext = Readonly<MenuCheckboxItemIndicatorState>;

/**
 * {@link MenuCheckboxItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const MenuCheckboxItemIndicatorContext: React.Context<MenuCheckboxItemIndicatorContext | null> =
  React.createContext<MenuCheckboxItemIndicatorContext | null>(null);

export type IUseMenuCheckboxItemIndicatorContext = IUseContext<MenuCheckboxItemIndicatorContext>;

/**
 * {@link MenuCheckboxItemIndicatorContext} を読み取るフックです。
 */
export const useMenuCheckboxItemIndicatorContext: IUseMenuCheckboxItemIndicatorContext =
  function useSuiMenuCheckboxItemIndicatorContext(optional): any {
    const ctx = React.use(MenuCheckboxItemIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MenuCheckboxItemIndicatorContext",
        providerName: "MenuCheckboxItemIndicator",
      });
    }

    return ctx;
  };

export {
  MenuCheckboxItemIndicatorContext as CheckboxItemIndicatorContext,
  useMenuCheckboxItemIndicatorContext as useCheckboxItemIndicatorContext,
};
