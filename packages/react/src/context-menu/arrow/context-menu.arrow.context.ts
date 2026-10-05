import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuArrowState } from "./context-menu.arrow.jsx";

/**
 * {@link ContextMenuArrow} が子パーツへ提供する状態です。
 */
export type ContextMenuArrowContext = Readonly<ContextMenuArrowState>;

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
