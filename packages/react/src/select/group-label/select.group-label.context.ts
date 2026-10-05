import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectGroupLabelState } from "./select.group-label.jsx";

/**
 * {@link SelectGroupLabel} が子パーツへ提供する状態です。
 */
export type SelectGroupLabelContext = Readonly<SelectGroupLabelState>;

/**
 * {@link SelectGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const SelectGroupLabelContext: React.Context<SelectGroupLabelContext | null> =
  React.createContext<SelectGroupLabelContext | null>(null);

export type IUseSelectGroupLabelContext = IUseContext<SelectGroupLabelContext>;

/**
 * {@link SelectGroupLabelContext} を読み取るフックです。
 */
export const useSelectGroupLabelContext: IUseSelectGroupLabelContext =
  function useSuiSelectGroupLabelContext(optional): any {
    const ctx = React.use(SelectGroupLabelContext);
    if (ctx === null && !optional) {
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
