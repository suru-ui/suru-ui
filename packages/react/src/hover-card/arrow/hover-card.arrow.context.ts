import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { HoverCardArrowState } from "./hover-card.arrow.jsx";

/**
 * {@link HoverCardArrow} が子パーツへ提供する状態です。
 */
export type HoverCardArrowContext = Readonly<HoverCardArrowState>;

/**
 * {@link HoverCardArrow} が子パーツへ提供するコンテキストです。
 */
export const HoverCardArrowContext: React.Context<HoverCardArrowContext | null> =
  React.createContext<HoverCardArrowContext | null>(null);

export type IUseHoverCardArrowContext = IUseContext<HoverCardArrowContext>;

/**
 * {@link HoverCardArrowContext} を読み取るフックです。
 */
export const useHoverCardArrowContext: IUseHoverCardArrowContext =
  function useSuiHoverCardArrowContext(optional): any {
    const ctx = React.use(HoverCardArrowContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardArrowContext",
        providerName: "HoverCardArrow",
      });
    }

    return ctx;
  };

export { HoverCardArrowContext as ArrowContext, useHoverCardArrowContext as useArrowContext };
