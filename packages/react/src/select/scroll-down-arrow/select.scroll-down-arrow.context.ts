import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectScrollDownArrowState } from "./select.scroll-down-arrow.jsx";

/**
 * {@link SelectScrollDownArrow} が子パーツへ提供する状態です。
 */
export type SelectScrollDownArrowContext = Readonly<SelectScrollDownArrowState>;

/**
 * {@link SelectScrollDownArrow} が子パーツへ提供するコンテキストです。
 */
export const SelectScrollDownArrowContext: React.Context<SelectScrollDownArrowContext | null> =
  React.createContext<SelectScrollDownArrowContext | null>(null);

export type IUseSelectScrollDownArrowContext = IUseContext<SelectScrollDownArrowContext>;

/**
 * {@link SelectScrollDownArrowContext} を読み取るフックです。
 */
export const useSelectScrollDownArrowContext: IUseSelectScrollDownArrowContext =
  function useSuiSelectScrollDownArrowContext(optional): any {
    const ctx = React.use(SelectScrollDownArrowContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectScrollDownArrowContext",
        providerName: "SelectScrollDownArrow",
      });
    }

    return ctx;
  };

export {
  SelectScrollDownArrowContext as ScrollDownArrowContext,
  useSelectScrollDownArrowContext as useScrollDownArrowContext,
};
