import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { HoverCardContext } from "../root/hover-card.root.context.js";

/**
 * {@link HoverCardPortal} が子パーツへ提供する状態です。
 */
export type HoverCardPortalContext = Readonly<Override<HoverCardContext, PreviewCard.Portal.State>>;

/**
 * {@link HoverCardPortal} が子パーツへ提供するコンテキストです。
 */
export const HoverCardPortalContext: React.Context<HoverCardPortalContext | null> =
  React.createContext<HoverCardPortalContext | null>(null);

export type IUseHoverCardPortalContext = IUseContext<HoverCardPortalContext>;

/**
 * {@link HoverCardPortalContext} を読み取るフックです。
 */
export const useHoverCardPortalContext: IUseHoverCardPortalContext =
  function useSuiHoverCardPortalContext(optional): any {
    const ctx = React.use(HoverCardPortalContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardPortalContext",
        providerName: "HoverCardPortal",
      });
    }

    return ctx;
  };

export { HoverCardPortalContext as PortalContext, useHoverCardPortalContext as usePortalContext };
