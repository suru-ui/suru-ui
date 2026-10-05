import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectItemIndicatorState } from "./select.item-indicator.jsx";

/**
 * {@link SelectItemIndicator} が子パーツへ提供する状態です。
 */
export type SelectItemIndicatorContext = Readonly<SelectItemIndicatorState>;

/**
 * {@link SelectItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const SelectItemIndicatorContext: React.Context<SelectItemIndicatorContext | null> =
  React.createContext<SelectItemIndicatorContext | null>(null);

export type IUseSelectItemIndicatorContext = IUseContext<SelectItemIndicatorContext>;

/**
 * {@link SelectItemIndicatorContext} を読み取るフックです。
 */
export const useSelectItemIndicatorContext: IUseSelectItemIndicatorContext =
  function useSuiSelectItemIndicatorContext(optional): any {
    const ctx = React.use(SelectItemIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectItemIndicatorContext",
        providerName: "SelectItemIndicator",
      });
    }

    return ctx;
  };

export {
  SelectItemIndicatorContext as ItemIndicatorContext,
  useSelectItemIndicatorContext as useItemIndicatorContext,
};
