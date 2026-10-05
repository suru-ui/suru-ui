import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuArrow} が子パーツへ提供する状態です。
 */
export type ContextMenuArrowContext = Readonly<
  Override<ContextMenuContext, ContextMenu.Arrow.State>
>;

/**
 * {@link ContextMenuArrow} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuArrowContext: React.Context<ContextMenuArrowContext | null> =
  React.createContext<ContextMenuArrowContext | null>(null);

export type IUseContextMenuArrowContext = IUseContext<ContextMenuArrowContext>;

/**
 * {@link ContextMenuArrowContext} を読み取るフックです。
 */
export const useContextMenuArrowContext: IUseContextMenuArrowContext =
  function useSuiContextMenuArrowContext(optional): any {
    const ctx = React.use(ContextMenuArrowContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuArrowContext",
        providerName: "ContextMenuArrow",
      });
    }

    return ctx;
  };

export { ContextMenuArrowContext as ArrowContext, useContextMenuArrowContext as useArrowContext };
