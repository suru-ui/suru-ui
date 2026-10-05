import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuLinkItemState } from "./context-menu.link-item.jsx";

/**
 * {@link ContextMenuLinkItem} が子パーツへ提供する状態です。
 */
export type ContextMenuLinkItemContext = Readonly<ContextMenuLinkItemState>;

/**
 * {@link ContextMenuLinkItem} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuLinkItemContext: React.Context<ContextMenuLinkItemContext | null> =
  React.createContext<ContextMenuLinkItemContext | null>(null);

export type IUseContextMenuLinkItemContext = IUseContext<ContextMenuLinkItemContext>;

/**
 * {@link ContextMenuLinkItemContext} を読み取るフックです。
 */
export const useContextMenuLinkItemContext: IUseContextMenuLinkItemContext =
  function useSuiContextMenuLinkItemContext(optional): any {
    const ctx = React.use(ContextMenuLinkItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuLinkItemContext",
        providerName: "ContextMenuLinkItem",
      });
    }

    return ctx;
  };

export {
  ContextMenuLinkItemContext as LinkItemContext,
  useContextMenuLinkItemContext as useLinkItemContext,
};
