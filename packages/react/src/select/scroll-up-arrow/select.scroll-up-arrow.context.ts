import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContentContext } from "../content/select.content.context.js";

/**
 * {@link SelectScrollUpArrow} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectScrollUpArrowContext<TValue = any> = Readonly<
  Override<SelectContentContext<TValue>, BaseSelect.ScrollUpArrow.State>
>;

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
