import type { PreviewCard } from "@base-ui/react/preview-card";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/hover-card.positioner.context.js";

/**
 * {@link HoverCardPopup} が子パーツへ提供する状態です。
 */
export type HoverCardPopupContext = Readonly<Override<PositionerContext, PreviewCard.Popup.State>>;

/**
 * {@link HoverCardPopup} が子パーツへ提供するコンテキストです。
 */
export const HoverCardPopupContext: React.Context<HoverCardPopupContext | null> =
  React.createContext<HoverCardPopupContext | null>(null);

export type IUseHoverCardPopupContext = IUseContext<HoverCardPopupContext>;

/**
 * {@link HoverCardPopupContext} を読み取るフックです。
 */
export const useHoverCardPopupContext: IUseHoverCardPopupContext = (optional): any => {
  const ctx = React.use(HoverCardPopupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "HoverCardPopupContext",
      providerName: "HoverCardPopup",
    });
  }

  return ctx;
};

export { HoverCardPopupContext as PopupContext, useHoverCardPopupContext as usePopupContext };
