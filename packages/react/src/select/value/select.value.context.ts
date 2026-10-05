import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectValueState } from "./select.value.jsx";

/**
 * {@link SelectValue} が子パーツへ提供する状態です。
 */
export type SelectValueContext = Readonly<SelectValueState>;

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
