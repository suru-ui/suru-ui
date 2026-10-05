import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectScrollUpArrowState } from "./select.scroll-up-arrow.jsx";

/**
 * {@link SelectScrollUpArrow} が子パーツへ提供する状態です。
 */
export type SelectScrollUpArrowContext = Readonly<SelectScrollUpArrowState>;

/**
 * {@link SelectScrollUpArrow} が子パーツへ提供するコンテキストです。
 */
export const SelectScrollUpArrowContext: React.Context<SelectScrollUpArrowContext | null> =
  React.createContext<SelectScrollUpArrowContext | null>(null);

export type IUseSelectScrollUpArrowContext = IUseContext<SelectScrollUpArrowContext>;

/**
 * {@link SelectScrollUpArrowContext} を読み取るフックです。
 */
export const useSelectScrollUpArrowContext: IUseSelectScrollUpArrowContext =
  function useSuiSelectScrollUpArrowContext(optional): any {
    const ctx = React.use(SelectScrollUpArrowContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectScrollUpArrowContext",
        providerName: "SelectScrollUpArrow",
      });
    }

    return ctx;
  };

export {
  SelectScrollUpArrowContext as ScrollUpArrowContext,
  useSelectScrollUpArrowContext as useScrollUpArrowContext,
};
