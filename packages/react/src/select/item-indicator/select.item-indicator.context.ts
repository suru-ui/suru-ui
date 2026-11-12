import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectItemContext } from "../item/select.item.context.js";

/**
 * {@link SelectItemIndicator} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectItemIndicatorContext<TValue = any> = Readonly<
  Override<SelectItemContext<TValue>, BaseSelect.ItemIndicator.State>
>;

/**
 * {@link SelectItemIndicator} が子パーツへ提供するコンテキストです。
 */
export const SelectItemIndicatorContext: React.Context<SelectItemIndicatorContext | null> =
  React.createContext<SelectItemIndicatorContext | null>(null);

export type IUseSelectItemIndicatorContext = IUseContext<SelectItemIndicatorContext>;

/**
 * {@link SelectItemIndicatorContext} を読み取るフックです。
 */
export const useSelectItemIndicatorContext: IUseSelectItemIndicatorContext = (optional): any => {
  const ctx = React.use(SelectItemIndicatorContext);

  if (ctx === null && optional !== true) {
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
