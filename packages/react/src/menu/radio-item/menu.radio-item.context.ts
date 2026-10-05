import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuRadioItemState } from "./menu.radio-item.jsx";

/**
 * {@link MenuRadioItem} が子パーツへ提供する状態です。
 */
export type MenuRadioItemContext = Readonly<MenuRadioItemState>;

/**
 * {@link MenuRadioItem} が子パーツへ提供するコンテキストです。
 */
export const MenuRadioItemContext: React.Context<MenuRadioItemContext | null> =
  React.createContext<MenuRadioItemContext | null>(null);

export type IUseMenuRadioItemContext = IUseContext<MenuRadioItemContext>;

/**
 * {@link MenuRadioItemContext} を読み取るフックです。
 */
export const useMenuRadioItemContext: IUseMenuRadioItemContext =
  function useSuiMenuRadioItemContext(optional): any {
    const ctx = React.use(MenuRadioItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MenuRadioItemContext",
        providerName: "MenuRadioItem",
      });
    }

    return ctx;
  };

export { MenuRadioItemContext as RadioItemContext, useMenuRadioItemContext as useRadioItemContext };
