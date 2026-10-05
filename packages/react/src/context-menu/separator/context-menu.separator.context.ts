import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuSeparatorState } from "./context-menu.separator.jsx";

/**
 * {@link ContextMenuSeparator} が子パーツへ提供する状態です。
 */
export type ContextMenuSeparatorContext = Readonly<ContextMenuSeparatorState>;

/**
 * {@link ContextMenuSeparator} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuSeparatorContext: React.Context<ContextMenuSeparatorContext | null> =
  React.createContext<ContextMenuSeparatorContext | null>(null);

export type IUseContextMenuSeparatorContext = IUseContext<ContextMenuSeparatorContext>;

/**
 * {@link ContextMenuSeparatorContext} を読み取るフックです。
 */
export const useContextMenuSeparatorContext: IUseContextMenuSeparatorContext =
  function useSuiContextMenuSeparatorContext(optional): any {
    const ctx = React.use(ContextMenuSeparatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuSeparatorContext",
        providerName: "ContextMenuSeparator",
      });
    }

    return ctx;
  };

export {
  ContextMenuSeparatorContext as SeparatorContext,
  useContextMenuSeparatorContext as useSeparatorContext,
};
