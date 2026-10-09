import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuItem} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuItemContext<TItem = any> = Readonly<
  Override<ContextMenuContext<TItem>, Override<Button.Root.State, ContextMenu.Item.State>>
>;

/**
 * {@link ContextMenuItem} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuItemContext: React.Context<ContextMenuItemContext | null> =
  React.createContext<ContextMenuItemContext | null>(null);

export type IUseContextMenuItemContext = IUseContext<ContextMenuItemContext>;

/**
 * {@link ContextMenuItemContext} を読み取るフックです。
 */
export const useContextMenuItemContext: IUseContextMenuItemContext =
  function useSuiContextMenuItemContext(optional): any {
    const ctx = React.use(ContextMenuItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuItemContext",
        providerName: "ContextMenuItem",
      });
    }

    return ctx;
  };

export { ContextMenuItemContext as ItemContext, useContextMenuItemContext as useItemContext };
