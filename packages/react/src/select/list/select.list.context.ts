import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectListState } from "./select.list.jsx";

/**
 * {@link SelectList} が子パーツへ提供する状態です。
 */
export type SelectListContext = Readonly<SelectListState>;

/**
 * {@link SelectList} が子パーツへ提供するコンテキストです。
 */
export const SelectListContext: React.Context<SelectListContext | null> =
  React.createContext<SelectListContext | null>(null);

export type IUseSelectListContext = IUseContext<SelectListContext>;

/**
 * {@link SelectListContext} を読み取るフックです。
 */
export const useSelectListContext: IUseSelectListContext = function useSuiSelectListContext(
  optional,
): any {
  const ctx = React.use(SelectListContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectListContext",
      providerName: "SelectList",
    });
  }

  return ctx;
};

export { SelectListContext as ListContext, useSelectListContext as useListContext };
