import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectGroupContext } from "../group/select.group.context.js";

/**
 * {@link SelectGroupLabel} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectGroupLabelContext<TValue = any> = Readonly<
  Override<SelectGroupContext<TValue>, BaseSelect.GroupLabel.State>
>;

/**
 * {@link SelectGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const SelectGroupLabelContext: React.Context<SelectGroupLabelContext | null> =
  React.createContext<SelectGroupLabelContext | null>(null);

export type IUseSelectGroupLabelContext = IUseContext<SelectGroupLabelContext>;

/**
 * {@link SelectGroupLabelContext} を読み取るフックです。
 */
export const useSelectGroupLabelContext: IUseSelectGroupLabelContext = (optional): any => {
  const ctx = React.use(SelectGroupLabelContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SelectGroupLabelContext",
      providerName: "SelectGroupLabel",
    });
  }

  return ctx;
};

export {
  SelectGroupLabelContext as GroupLabelContext,
  useSelectGroupLabelContext as useGroupLabelContext,
};
