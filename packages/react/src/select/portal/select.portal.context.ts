import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectPortalState } from "./select.portal.jsx";

/**
 * {@link SelectPortal} が子パーツへ提供する状態です。
 */
export type SelectPortalContext = Readonly<SelectPortalState>;

/**
 * {@link SelectPortal} が子パーツへ提供するコンテキストです。
 */
export const SelectPortalContext: React.Context<SelectPortalContext | null> =
  React.createContext<SelectPortalContext | null>(null);

export type IUseSelectPortalContext = IUseContext<SelectPortalContext>;

/**
 * {@link SelectPortalContext} を読み取るフックです。
 */
export const useSelectPortalContext: IUseSelectPortalContext = function useSuiSelectPortalContext(
  optional,
): any {
  const ctx = React.use(SelectPortalContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectPortalContext",
      providerName: "SelectPortal",
    });
  }

  return ctx;
};

export { SelectPortalContext as PortalContext, useSelectPortalContext as usePortalContext };
