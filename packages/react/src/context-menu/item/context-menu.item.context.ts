import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuItemState } from "./context-menu.item.jsx";

/**
 * {@link ContextMenuItem} が子パーツへ提供する状態です。
 */
export type ContextMenuItemContext = Readonly<ContextMenuItemState>;

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
