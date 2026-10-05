import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectGroupState } from "./select.group.jsx";

/**
 * {@link SelectGroup} が子パーツへ提供する状態です。
 */
export type SelectGroupContext = Readonly<SelectGroupState>;

/**
 * {@link SelectGroup} が子パーツへ提供するコンテキストです。
 */
export const SelectGroupContext: React.Context<SelectGroupContext | null> =
  React.createContext<SelectGroupContext | null>(null);

export type IUseSelectGroupContext = IUseContext<SelectGroupContext>;

/**
 * {@link SelectGroupContext} を読み取るフックです。
 */
export const useSelectGroupContext: IUseSelectGroupContext = function useSuiSelectGroupContext(
  optional,
): any {
  const ctx = React.use(SelectGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectGroupContext",
      providerName: "SelectGroup",
    });
  }

  return ctx;
};

export { SelectGroupContext as GroupContext, useSelectGroupContext as useGroupContext };
