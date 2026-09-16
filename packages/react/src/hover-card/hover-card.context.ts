import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";
import type { HoverCardRootSize, HoverCardRootRadius } from "./hover-card.root.jsx";

/**
 * {@link HoverCardRoot} が子パーツへ提供するコンテキストです。
 */
export type HoverCardContext = {
  /**
   * ホバーカードに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ホバーカードの角丸の大きさです。
   */
  readonly radius: HoverCardRootRadius;

  /**
   * ホバーカードの大きさです。
   */
  readonly size: HoverCardRootSize;
};

/**
 * {@link HoverCardRoot} が子パーツへ提供するコンテキストです。
 */
export const HoverCardContext: React.Context<HoverCardContext | null> =
  React.createContext<HoverCardContext | null>(null);

function useSuiHoverCardContext(optional?: false): HoverCardContext;
function useSuiHoverCardContext(optional?: boolean): HoverCardContext | null;
function useSuiHoverCardContext(optional?: boolean): HoverCardContext | null {
  const ctx = React.use(HoverCardContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "HoverCardContext",
      providerName: "HoverCardRoot",
    });
  }

  return ctx;
}

/**
 * {@link HoverCardContext} を読み取るフックです。
 */
export const useHoverCardContext: IUseContext<HoverCardContext> = useSuiHoverCardContext;

export { HoverCardContext as Context, useHoverCardContext as useContext };

export namespace Context {
  export type Radius = HoverCardRootRadius;

  export type Size = HoverCardRootSize;
}
