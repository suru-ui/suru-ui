import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { HoverCardContext } from "../root/hover-card.root.context.js";

/**
 * {@link HoverCardBackdrop} が子パーツへ提供する状態です。
 */
export type HoverCardBackdropContext = Readonly<
  Override<HoverCardContext, PreviewCard.Backdrop.State>
>;

/**
 * {@link HoverCardBackdrop} が子パーツへ提供するコンテキストです。
 */
export const HoverCardBackdropContext: React.Context<HoverCardBackdropContext | null> =
  React.createContext<HoverCardBackdropContext | null>(null);

export type IUseHoverCardBackdropContext = IUseContext<HoverCardBackdropContext>;

/**
 * {@link HoverCardBackdropContext} を読み取るフックです。
 */
export const useHoverCardBackdropContext: IUseHoverCardBackdropContext = (optional): any => {
  const ctx = React.use(HoverCardBackdropContext);

  if (ctx === null && optional !== true) {
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
