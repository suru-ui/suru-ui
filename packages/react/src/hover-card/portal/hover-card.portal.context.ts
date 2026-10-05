import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { HoverCardPortalState } from "./hover-card.portal.jsx";

/**
 * {@link HoverCardPortal} が子パーツへ提供する状態です。
 */
export type HoverCardPortalContext = Readonly<HoverCardPortalState>;

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
