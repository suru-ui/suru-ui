import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectItemContext } from "../item/select.item.context.js";

/**
 * {@link SelectItemText} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectItemTextContext<TValue = any> = Readonly<
  Override<SelectItemContext<TValue>, BaseSelect.ItemText.State>
>;

/**
 * {@link SelectItemText} が子パーツへ提供するコンテキストです。
 */
export const SelectItemTextContext: React.Context<SelectItemTextContext | null> =
  React.createContext<SelectItemTextContext | null>(null);

export type IUseSelectItemTextContext = IUseContext<SelectItemTextContext>;

/**
 * {@link SelectItemTextContext} を読み取るフックです。
 */
export const useSelectItemTextContext: IUseSelectItemTextContext = (optional): any => {
  const ctx = React.use(SelectItemTextContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SelectItemTextContext",
      providerName: "SelectItemText",
    });
  }

  return ctx;
};

export { SelectItemTextContext as ItemTextContext, useSelectItemTextContext as useItemTextContext };
