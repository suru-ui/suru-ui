import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuGroupLabelState } from "./context-menu.group-label.jsx";

/**
 * {@link ContextMenuGroupLabel} が子パーツへ提供する状態です。
 */
export type ContextMenuGroupLabelContext = Readonly<ContextMenuGroupLabelState>;

/**
 * {@link ContextMenuGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuGroupLabelContext: React.Context<ContextMenuGroupLabelContext | null> =
  React.createContext<ContextMenuGroupLabelContext | null>(null);

export type IUseContextMenuGroupLabelContext = IUseContext<ContextMenuGroupLabelContext>;

/**
 * {@link ContextMenuGroupLabelContext} を読み取るフックです。
 */
export const useContextMenuGroupLabelContext: IUseContextMenuGroupLabelContext =
  function useSuiContextMenuGroupLabelContext(optional): any {
    const ctx = React.use(ContextMenuGroupLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuGroupLabelContext",
        providerName: "ContextMenuGroupLabel",
      });
    }

    return ctx;
  };

export {
  ContextMenuGroupLabelContext as GroupLabelContext,
  useContextMenuGroupLabelContext as useGroupLabelContext,
};
