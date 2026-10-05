import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectItemState } from "./select.item.jsx";

/**
 * {@link SelectItem} が子パーツへ提供する状態です。
 */
export type SelectItemContext = Readonly<SelectItemState>;

/**
 * {@link SelectItem} が子パーツへ提供するコンテキストです。
 */
export const SelectItemContext: React.Context<SelectItemContext | null> =
  React.createContext<SelectItemContext | null>(null);

export type IUseSelectItemContext = IUseContext<SelectItemContext>;

/**
 * {@link SelectItemContext} を読み取るフックです。
 */
export const useSelectItemContext: IUseSelectItemContext = function useSuiSelectItemContext(
  optional,
): any {
  const ctx = React.use(SelectItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectItemContext",
      providerName: "SelectItem",
    });
  }

  return ctx;
};

export { SelectItemContext as ItemContext, useSelectItemContext as useItemContext };
