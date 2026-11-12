import type { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TooltipPositionerContext } from "../positioner/tooltip.positioner.context.js";

/**
 * {@link TooltipPopup} が子パーツへ提供する状態です。
 */
export type TooltipPopupContext = Readonly<Override<TooltipPositionerContext, Tooltip.Popup.State>>;

/**
 * {@link TooltipPopup} が子パーツへ提供するコンテキストです。
 */
export const TooltipPopupContext: React.Context<TooltipPopupContext | null> =
  React.createContext<TooltipPopupContext | null>(null);

export type IUseTooltipPopupContext = IUseContext<TooltipPopupContext>;

/**
 * {@link TooltipPopupContext} を読み取るフックです。
 */
export const useTooltipPopupContext: IUseTooltipPopupContext = (optional): any => {
  const ctx = React.use(TooltipPopupContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "TooltipPopupContext",
      providerName: "TooltipPopup",
    });
  }

  return ctx;
};

export { TooltipPopupContext as PopupContext, useTooltipPopupContext as usePopupContext };
