import type { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { GroupContext } from "../group/menu.group.context.js";

/**
 * {@link MenuGroupLabel} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuGroupLabelContext<TItem = any> = Readonly<
  Override<GroupContext<TItem>, Menu.GroupLabel.State>
>;

/**
 * {@link MenuGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const MenuGroupLabelContext: React.Context<MenuGroupLabelContext | null> =
  React.createContext<MenuGroupLabelContext | null>(null);

export type IUseMenuGroupLabelContext = IUseContext<MenuGroupLabelContext>;

/**
 * {@link MenuGroupLabelContext} を読み取るフックです。
 */
export const useMenuGroupLabelContext: IUseMenuGroupLabelContext =
  function useSuiMenuGroupLabelContext(optional): any {
    const ctx = React.use(MenuGroupLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "MenuGroupLabelContext",
        providerName: "MenuGroupLabel",
      });
    }

    return ctx;
  };

export {
  MenuGroupLabelContext as GroupLabelContext,
  useMenuGroupLabelContext as useGroupLabelContext,
};
