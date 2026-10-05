import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuPortal} が子パーツへ提供する状態です。
 */
export type ContextMenuPortalContext = Readonly<
  Override<ContextMenuContext, ContextMenu.Portal.State>
>;

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
