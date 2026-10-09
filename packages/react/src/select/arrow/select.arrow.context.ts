import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContentContext } from "../content/select.content.context.js";

/**
 * {@link SelectArrow} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectArrowContext<TValue = any> = Readonly<
  Override<SelectContentContext<TValue>, BaseSelect.Arrow.State>
>;

/**
 * {@link SelectArrow} が子パーツへ提供するコンテキストです。
 */
export const SelectArrowContext: React.Context<SelectArrowContext | null> =
  React.createContext<SelectArrowContext | null>(null);

export type IUseSelectArrowContext = IUseContext<SelectArrowContext>;

/**
 * {@link SelectArrowContext} を読み取るフックです。
 */
export const useSelectArrowContext: IUseSelectArrowContext = function useSuiSelectArrowContext(
  optional,
): any {
  const ctx = React.use(SelectArrowContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectArrowContext",
      providerName: "SelectArrow",
    });
  }

  return ctx;
};

export { SelectArrowContext as ArrowContext, useSelectArrowContext as useArrowContext };
