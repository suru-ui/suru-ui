import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectItemText} が子パーツへ提供する状態です。
 */
export type SelectItemTextContext = Readonly<Override<SelectContext, BaseSelect.ItemText.State>>;

/**
 * {@link SelectItemText} が子パーツへ提供するコンテキストです。
 */
export const SelectItemTextContext: React.Context<SelectItemTextContext | null> =
  React.createContext<SelectItemTextContext | null>(null);

export type IUseSelectItemTextContext = IUseContext<SelectItemTextContext>;

/**
 * {@link SelectItemTextContext} を読み取るフックです。
 */
export const useSelectItemTextContext: IUseSelectItemTextContext =
  function useSuiSelectItemTextContext(optional): any {
    const ctx = React.use(SelectItemTextContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectItemTextContext",
        providerName: "SelectItemText",
      });
    }

    return ctx;
  };

export { SelectItemTextContext as ItemTextContext, useSelectItemTextContext as useItemTextContext };
