import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectIconState } from "./select.icon.jsx";

/**
 * {@link SelectIcon} が子パーツへ提供する状態です。
 */
export type SelectIconContext = Readonly<SelectIconState>;

/**
 * {@link SelectIcon} が子パーツへ提供するコンテキストです。
 */
export const SelectIconContext: React.Context<SelectIconContext | null> =
  React.createContext<SelectIconContext | null>(null);

export type IUseSelectIconContext = IUseContext<SelectIconContext>;

/**
 * {@link SelectIconContext} を読み取るフックです。
 */
export const useSelectIconContext: IUseSelectIconContext = function useSuiSelectIconContext(
  optional,
): any {
  const ctx = React.use(SelectIconContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectIconContext",
      providerName: "SelectIcon",
    });
  }

  return ctx;
};

export { SelectIconContext as IconContext, useSelectIconContext as useIconContext };
