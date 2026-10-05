import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuGroupState } from "./context-menu.group.jsx";

/**
 * {@link ContextMenuGroup} が子パーツへ提供する状態です。
 */
export type ContextMenuGroupContext = Readonly<ContextMenuGroupState>;

/**
 * {@link ContextMenuGroup} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuGroupContext: React.Context<ContextMenuGroupContext | null> =
  React.createContext<ContextMenuGroupContext | null>(null);

export type IUseContextMenuGroupContext = IUseContext<ContextMenuGroupContext>;

/**
 * {@link ContextMenuGroupContext} を読み取るフックです。
 */
export const useContextMenuGroupContext: IUseContextMenuGroupContext =
  function useSuiContextMenuGroupContext(optional): any {
    const ctx = React.use(ContextMenuGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuGroupContext",
        providerName: "ContextMenuGroup",
      });
    }

    return ctx;
  };

export { ContextMenuGroupContext as GroupContext, useContextMenuGroupContext as useGroupContext };
