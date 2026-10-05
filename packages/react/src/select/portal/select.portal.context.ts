import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectPortal} が子パーツへ提供する状態です。
 */
export type SelectPortalContext = Readonly<Override<SelectContext, BaseSelect.Portal.State>>;

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
