import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectListContext } from "../list/select.list.context.js";

/**
 * {@link SelectGroup} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectGroupContext<TValue = any> = Readonly<
  Override<SelectListContext<TValue>, BaseSelect.Group.State>
>;

/**
 * {@link SelectGroup} が子パーツへ提供するコンテキストです。
 */
export const SelectGroupContext: React.Context<SelectGroupContext | null> =
  React.createContext<SelectGroupContext | null>(null);

export type IUseSelectGroupContext = IUseContext<SelectGroupContext>;

/**
 * {@link SelectGroupContext} を読み取るフックです。
 */
export const useSelectGroupContext: IUseSelectGroupContext = (optional): any => {
  const ctx = React.use(SelectGroupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SelectGroupContext",
      providerName: "SelectGroup",
    });
  }

  return ctx;
};

export { SelectGroupContext as GroupContext, useSelectGroupContext as useGroupContext };
