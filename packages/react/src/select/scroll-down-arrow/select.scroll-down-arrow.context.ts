import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectScrollDownArrow} が子パーツへ提供する状態です。
 */
export type SelectScrollDownArrowContext = Readonly<
  Override<SelectContext, BaseSelect.ScrollDownArrow.State>
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
