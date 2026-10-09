import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PortalContext } from "../portal/context-menu.portal.context.js";

/**
 * {@link ContextMenuPositioner} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuPositionerContext<TItem = any> = Readonly<
  Override<PortalContext<TItem>, ContextMenu.Positioner.State>
>;

/**
 * {@link ContextMenuPositioner} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuPositionerContext: React.Context<ContextMenuPositionerContext | null> =
  React.createContext<ContextMenuPositionerContext | null>(null);

export type IUseContextMenuPositionerContext = IUseContext<ContextMenuPositionerContext>;

/**
 * {@link ContextMenuPositionerContext} を読み取るフックです。
 */
export const useContextMenuPositionerContext: IUseContextMenuPositionerContext =
  function useSuiContextMenuPositionerContext(optional): any {
    const ctx = React.use(ContextMenuPositionerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuPositionerContext",
        providerName: "ContextMenuPositioner",
      });
    }

    return ctx;
  };

export {
  ContextMenuPositionerContext as PositionerContext,
  useContextMenuPositionerContext as usePositionerContext,
};
