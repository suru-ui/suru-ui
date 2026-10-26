import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectPopupContext } from "../popup/select.popup.context.js";

/**
 * {@link SelectScrollDownArrow} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectScrollDownArrowContext<TValue = any> = Readonly<
  Override<SelectPopupContext<TValue>, BaseSelect.ScrollDownArrow.State>
>;

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
