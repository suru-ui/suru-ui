import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuPortalState } from "./context-menu.portal.jsx";

/**
 * {@link ContextMenuPortal} が子パーツへ提供する状態です。
 */
export type ContextMenuPortalContext = Readonly<ContextMenuPortalState>;

/**
 * {@link ContextMenuPortal} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuPortalContext: React.Context<ContextMenuPortalContext | null> =
  React.createContext<ContextMenuPortalContext | null>(null);

export type IUseContextMenuPortalContext = IUseContext<ContextMenuPortalContext>;

/**
 * {@link ContextMenuPortalContext} を読み取るフックです。
 */
export const useContextMenuPortalContext: IUseContextMenuPortalContext =
  function useSuiContextMenuPortalContext(optional): any {
    const ctx = React.use(ContextMenuPortalContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuPortalContext",
        providerName: "ContextMenuPortal",
      });
    }

    return ctx;
  };

export {
  ContextMenuPortalContext as PortalContext,
  useContextMenuPortalContext as usePortalContext,
};
