import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/context-menu.popup.context.js";

/**
 * {@link ContextMenuGroup} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuGroupContext<TItem = any> = Readonly<
  Override<PopupContext<TItem>, ContextMenu.Group.State>
>;

/**
 * {@link ContextMenuGroup} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuGroupContext: React.Context<ContextMenuGroupContext | null> =
  React.createContext<ContextMenuGroupContext | null>(null);

export type IUseContextMenuGroupContext = IUseContext<ContextMenuGroupContext>;

/**
 * {@link ContextMenuGroupContext} を読み取るフックです。
 */
export const useContextMenuGroupContext: IUseContextMenuGroupContext =
  function useSuiContextMenuGroupContext(optional): any {
    const ctx = React.use(ContextMenuGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuGroupContext",
        providerName: "ContextMenuGroup",
      });
    }

    return ctx;
  };

export { ContextMenuGroupContext as GroupContext, useContextMenuGroupContext as useGroupContext };
