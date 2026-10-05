import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectValue} が子パーツへ提供する状態です。
 */
export type SelectValueContext = Readonly<Override<SelectContext, BaseSelect.Value.State>>;

/**
 * {@link SelectValue} が子パーツへ提供するコンテキストです。
 */
export const SelectValueContext: React.Context<SelectValueContext | null> =
  React.createContext<SelectValueContext | null>(null);

export type IUseSelectValueContext = IUseContext<SelectValueContext>;

/**
 * {@link SelectValueContext} を読み取るフックです。
 */
export const useSelectValueContext: IUseSelectValueContext = function useSuiSelectValueContext(
  optional,
): any {
  const ctx = React.use(SelectValueContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectValueContext",
      providerName: "SelectValue",
    });
  }

  return ctx;
};

export { SelectValueContext as ValueContext, useSelectValueContext as useValueContext };
