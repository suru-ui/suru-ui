import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectSeparator} が子パーツへ提供する状態です。
 */
export type SelectSeparatorContext = Readonly<Override<SelectContext, BaseSelect.Separator.State>>;

/**
 * {@link SelectSeparator} が子パーツへ提供するコンテキストです。
 */
export const SelectSeparatorContext: React.Context<SelectSeparatorContext | null> =
  React.createContext<SelectSeparatorContext | null>(null);

export type IUseSelectSeparatorContext = IUseContext<SelectSeparatorContext>;

/**
 * {@link SelectSeparatorContext} を読み取るフックです。
 */
export const useSelectSeparatorContext: IUseSelectSeparatorContext =
  function useSuiSelectSeparatorContext(optional): any {
    const ctx = React.use(SelectSeparatorContext);
    if (ctx === null && !optional) {
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
