import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuPositionerState } from "./context-menu.positioner.jsx";

/**
 * {@link ContextMenuPositioner} が子パーツへ提供する状態です。
 */
export type ContextMenuPositionerContext = Readonly<ContextMenuPositionerState>;

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
