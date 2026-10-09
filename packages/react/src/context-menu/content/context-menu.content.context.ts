import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/context-menu.positioner.context.js";

/**
 * {@link ContextMenuContent} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuContentContext<TItem = any> = Readonly<
  Override<PositionerContext<TItem>, ContextMenu.Popup.State>
>;

/**
 * {@link ContextMenuContent} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuContentContext: React.Context<ContextMenuContentContext | null> =
  React.createContext<ContextMenuContentContext | null>(null);

export type IUseContextMenuContentContext = IUseContext<ContextMenuContentContext>;

/**
 * {@link ContextMenuContentContext} を読み取るフックです。
 */
export const useContextMenuContentContext: IUseContextMenuContentContext =
  function useSuiContextMenuContentContext(optional): any {
    const ctx = React.use(ContextMenuContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuContentContext",
        providerName: "ContextMenuContent",
      });
    }

    return ctx;
  };

export {
  ContextMenuContentContext as ContentContext,
  useContextMenuContentContext as useContentContext,
};
