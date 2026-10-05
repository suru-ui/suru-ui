import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverPortalState } from "./popover.portal.jsx";

/**
 * {@link PopoverPortal} が子パーツへ提供する状態です。
 */
export type PopoverPortalContext = Readonly<PopoverPortalState>;

/**
 * {@link PopoverPortal} が子パーツへ提供するコンテキストです。
 */
export const PopoverPortalContext: React.Context<PopoverPortalContext | null> =
  React.createContext<PopoverPortalContext | null>(null);

export type IUsePopoverPortalContext = IUseContext<PopoverPortalContext>;

/**
 * {@link PopoverPortalContext} を読み取るフックです。
 */
export const usePopoverPortalContext: IUsePopoverPortalContext =
  function useSuiPopoverPortalContext(optional): any {
    const ctx = React.use(PopoverPortalContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PopoverPortalContext",
        providerName: "PopoverPortal",
      });
    }

    return ctx;
  };

export { PopoverPortalContext as PortalContext, usePopoverPortalContext as usePortalContext };
