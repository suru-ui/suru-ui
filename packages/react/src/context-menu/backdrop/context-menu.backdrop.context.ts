import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuBackdropState } from "./context-menu.backdrop.jsx";

/**
 * {@link ContextMenuBackdrop} が子パーツへ提供する状態です。
 */
export type ContextMenuBackdropContext = Readonly<ContextMenuBackdropState>;

/**
 * {@link ContextMenuBackdrop} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuBackdropContext: React.Context<ContextMenuBackdropContext | null> =
  React.createContext<ContextMenuBackdropContext | null>(null);

export type IUseContextMenuBackdropContext = IUseContext<ContextMenuBackdropContext>;

/**
 * {@link ContextMenuBackdropContext} を読み取るフックです。
 */
export const useContextMenuBackdropContext: IUseContextMenuBackdropContext =
  function useSuiContextMenuBackdropContext(optional): any {
    const ctx = React.use(ContextMenuBackdropContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuBackdropContext",
        providerName: "ContextMenuBackdrop",
      });
    }

    return ctx;
  };

export {
  ContextMenuBackdropContext as BackdropContext,
  useContextMenuBackdropContext as useBackdropContext,
};
