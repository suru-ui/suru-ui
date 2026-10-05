import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuCheckboxItemIndicatorState } from "./context-menu.checkbox-item-indicator.jsx";

/**
 * {@link ContextMenuCheckboxItemIndicator} が子パーツへ提供する状態です。
 */
export type ContextMenuCheckboxItemIndicatorContext =
  Readonly<ContextMenuCheckboxItemIndicatorState>;

/**
 * {@link ContextMenuCheckboxItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuCheckboxItemIndicatorContext: React.Context<ContextMenuCheckboxItemIndicatorContext | null> =
  React.createContext<ContextMenuCheckboxItemIndicatorContext | null>(null);

export type IUseContextMenuCheckboxItemIndicatorContext =
  IUseContext<ContextMenuCheckboxItemIndicatorContext>;

/**
 * {@link ContextMenuCheckboxItemIndicatorContext} を読み取るフックです。
 */
export const useContextMenuCheckboxItemIndicatorContext: IUseContextMenuCheckboxItemIndicatorContext =
  function useSuiContextMenuCheckboxItemIndicatorContext(optional): any {
    const ctx = React.use(ContextMenuCheckboxItemIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuCheckboxItemIndicatorContext",
        providerName: "ContextMenuCheckboxItemIndicator",
      });
    }

    return ctx;
  };

export {
  ContextMenuCheckboxItemIndicatorContext as CheckboxItemIndicatorContext,
  useContextMenuCheckboxItemIndicatorContext as useCheckboxItemIndicatorContext,
};
