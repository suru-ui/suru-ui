import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { HoverCardBackdropState } from "./hover-card.backdrop.jsx";

/**
 * {@link HoverCardBackdrop} が子パーツへ提供する状態です。
 */
export type HoverCardBackdropContext = Readonly<HoverCardBackdropState>;

/**
 * {@link HoverCardBackdrop} が子パーツへ提供するコンテキストです。
 */
export const HoverCardBackdropContext: React.Context<HoverCardBackdropContext | null> =
  React.createContext<HoverCardBackdropContext | null>(null);

export type IUseHoverCardBackdropContext = IUseContext<HoverCardBackdropContext>;

/**
 * {@link HoverCardBackdropContext} を読み取るフックです。
 */
export const useHoverCardBackdropContext: IUseHoverCardBackdropContext =
  function useSuiHoverCardBackdropContext(optional): any {
    const ctx = React.use(HoverCardBackdropContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "HoverCardBackdropContext",
        providerName: "HoverCardBackdrop",
      });
    }

    return ctx;
  };

export {
  HoverCardBackdropContext as BackdropContext,
  useHoverCardBackdropContext as useBackdropContext,
};
