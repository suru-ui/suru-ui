import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuRadioItemState } from "./context-menu.radio-item.jsx";

/**
 * {@link ContextMenuRadioItem} が子パーツへ提供する状態です。
 */
export type ContextMenuRadioItemContext = Readonly<ContextMenuRadioItemState>;

/**
 * {@link ContextMenuRadioItem} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuRadioItemContext: React.Context<ContextMenuRadioItemContext | null> =
  React.createContext<ContextMenuRadioItemContext | null>(null);

export type IUseContextMenuRadioItemContext = IUseContext<ContextMenuRadioItemContext>;

/**
 * {@link ContextMenuRadioItemContext} を読み取るフックです。
 */
export const useContextMenuRadioItemContext: IUseContextMenuRadioItemContext =
  function useSuiContextMenuRadioItemContext(optional): any {
    const ctx = React.use(ContextMenuRadioItemContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuRadioItemContext",
        providerName: "ContextMenuRadioItem",
      });
    }

    return ctx;
  };

export {
  ContextMenuRadioItemContext as RadioItemContext,
  useContextMenuRadioItemContext as useRadioItemContext,
};
