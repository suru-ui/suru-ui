import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";
import { type TooltipRootSize, type TooltipRootRadius } from "./tooltip.root.jsx";

/**
 * {@link TooltipRoot} が子パーツへ提供するコンテキストです。
 */
export type TooltipContext = {
  /**
   * ツールチップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ツールチップの角丸の大きさです。
   */
  readonly radius: TooltipRootRadius;

  /**
   * ツールチップの大きさです。
   */
  readonly size: TooltipRootSize;
};

/**
 * {@link TooltipRoot} が子パーツへ提供するコンテキストです。
 */
export const TooltipContext: React.Context<TooltipContext | null> =
  React.createContext<TooltipContext | null>(null);

function useSuiTooltipContext(optional?: false): TooltipContext;
function useSuiTooltipContext(optional?: boolean): TooltipContext | null;
function useSuiTooltipContext(optional?: boolean): TooltipContext | null {
  const ctx = React.use(TooltipContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "TooltipContext",
      providerName: "TooltipRoot",
    });
  }

  return ctx;
}

/**
 * {@link TooltipContext} を読み取るフックです。
 */
export const useTooltipContext: IUseContext<TooltipContext> = useSuiTooltipContext;

export { TooltipContext as Context, useTooltipContext as useContext };
