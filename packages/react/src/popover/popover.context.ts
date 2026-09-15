import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";
import { type PopoverRootSize, type PopoverRootRadius } from "./popover.root.jsx";

/**
 * {@link PopoverRoot} が子パーツへ提供するコンテキストです。
 */
export type PopoverContext = {
  /**
   * ポップオーバーに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップオーバーの角丸の大きさです。
   */
  readonly radius: PopoverRootRadius;

  /**
   * ポップオーバーの大きさです。
   */
  readonly size: PopoverRootSize;
};

/**
 * {@link PopoverRoot} が子パーツへ提供するコンテキストです。
 */
export const PopoverContext: React.Context<PopoverContext | null> =
  React.createContext<PopoverContext | null>(null);

function useSuiPopoverContext(optional?: false): PopoverContext;
function useSuiPopoverContext(optional?: boolean): PopoverContext | null;
function useSuiPopoverContext(optional?: boolean): PopoverContext | null {
  const ctx = React.use(PopoverContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PopoverContext",
      providerName: "PopoverRoot",
    });
  }

  return ctx;
}

/**
 * {@link PopoverContext} を読み取るフックです。
 */
export const usePopoverContext: IUseContext<PopoverContext> = useSuiPopoverContext;

export { PopoverContext as Context, usePopoverContext as useContext };

export namespace Context {
  export type Radius = PopoverRootRadius;

  export type Size = PopoverRootSize;
}
