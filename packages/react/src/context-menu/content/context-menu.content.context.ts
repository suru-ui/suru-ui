import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuContentState } from "./context-menu.content.jsx";

/**
 * {@link ContextMenuContent} が子パーツへ提供する状態です。
 */
export type ContextMenuContentContext = Readonly<ContextMenuContentState>;

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
