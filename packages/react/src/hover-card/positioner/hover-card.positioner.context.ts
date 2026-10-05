import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { HoverCardPositionerState } from "./hover-card.positioner.jsx";

/**
 * {@link HoverCardPositioner} が子パーツへ提供する状態です。
 */
export type HoverCardPositionerContext = Readonly<HoverCardPositionerState>;

/**
 * {@link HoverCardPositioner} が子パーツへ提供するコンテキストです。
 */
export const HoverCardPositionerContext: React.Context<HoverCardPositionerContext | null> =
  React.createContext<HoverCardPositionerContext | null>(null);

export type IUseHoverCardPositionerContext = IUseContext<HoverCardPositionerContext>;

/**
 * {@link HoverCardPositionerContext} を読み取るフックです。
 */
export const useHoverCardPositionerContext: IUseHoverCardPositionerContext =
  function useSuiHoverCardPositionerContext(optional): any {
    const ctx = React.use(HoverCardPositionerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardPositionerContext",
        providerName: "HoverCardPositioner",
      });
    }

    return ctx;
  };

export {
  HoverCardPositionerContext as PositionerContext,
  useHoverCardPositionerContext as usePositionerContext,
};
