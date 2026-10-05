import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { MenuRadioGroupState } from "./menu.radio-group.jsx";

/**
 * {@link MenuRadioGroup} が子パーツへ提供する状態です。
 */
export type MenuRadioGroupContext = Readonly<MenuRadioGroupState>;

/**
 * {@link MenuRadioGroup} が子パーツへ提供するコンテキストです。
 */
export const MenuRadioGroupContext: React.Context<MenuRadioGroupContext | null> =
  React.createContext<MenuRadioGroupContext | null>(null);

export type IUseMenuRadioGroupContext = IUseContext<MenuRadioGroupContext>;

/**
 * {@link MenuRadioGroupContext} を読み取るフックです。
 */
export const useMenuRadioGroupContext: IUseMenuRadioGroupContext =
  function useSuiMenuRadioGroupContext(optional): any {
    const ctx = React.use(MenuRadioGroupContext);
    if (ctx === null && !optional) {
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
