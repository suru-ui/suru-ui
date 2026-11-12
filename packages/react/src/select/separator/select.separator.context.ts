import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectGroupContext } from "../group/select.group.context.js";
import type { SelectListContext } from "../list/select.list.context.js";

type ItemContext<TParentContext> = Readonly<Override<TParentContext, BaseSelect.Separator.State>>;

/**
 * {@link SelectSeparator} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectSeparatorContext<TValue = any> =
  // | ItemContext<SelectListContext>
  // | ItemContext<SelectGroupContext>
  ItemContext<SelectListContext<TValue> & SelectGroupContext<TValue>>;

/**
 * {@link SelectSeparator} が子パーツへ提供するコンテキストです。
 */
export const SelectSeparatorContext: React.Context<SelectSeparatorContext | null> =
  React.createContext<SelectSeparatorContext | null>(null);

export type IUseSelectSeparatorContext = IUseContext<SelectSeparatorContext>;

/**
 * {@link SelectSeparatorContext} を読み取るフックです。
 */
export const useSelectSeparatorContext: IUseSelectSeparatorContext = (optional): any => {
  const ctx = React.use(SelectSeparatorContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SelectSeparatorContext",
      providerName: "SelectSeparator",
    });
  }

  return ctx;
};

export {
  SelectSeparatorContext as SeparatorContext,
  useSelectSeparatorContext as useSeparatorContext,
};
