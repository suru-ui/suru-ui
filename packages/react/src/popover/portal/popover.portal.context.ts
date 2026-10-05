import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopoverContext } from "../root/popover.root.context.js";

/**
 * {@link PopoverPortal} が子パーツへ提供する状態です。
 */
export type PopoverPortalContext = Readonly<Override<PopoverContext, Popover.Portal.State>>;

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
