import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuCheckboxItemState } from "./context-menu.checkbox-item.jsx";

/**
 * {@link ContextMenuCheckboxItem} が子パーツへ提供する状態です。
 */
export type ContextMenuCheckboxItemContext = Readonly<ContextMenuCheckboxItemState>;

/**
 * {@link ContextMenuCheckboxItem} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuCheckboxItemContext: React.Context<ContextMenuCheckboxItemContext | null> =
  React.createContext<ContextMenuCheckboxItemContext | null>(null);

export type IUseContextMenuCheckboxItemContext = IUseContext<ContextMenuCheckboxItemContext>;

/**
 * {@link ContextMenuCheckboxItemContext} を読み取るフックです。
 */
export const useContextMenuCheckboxItemContext: IUseContextMenuCheckboxItemContext =
  function useSuiContextMenuCheckboxItemContext(optional): any {
    const ctx = React.use(ContextMenuCheckboxItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuCheckboxItemContext",
        providerName: "ContextMenuCheckboxItem",
      });
    }

    return ctx;
  };

export {
  ContextMenuCheckboxItemContext as CheckboxItemContext,
  useContextMenuCheckboxItemContext as useCheckboxItemContext,
};
