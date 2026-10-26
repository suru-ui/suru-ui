import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PositionerContext } from "../positioner/popover.positioner.context.js";

/**
 * {@link PopoverPopup} が子パーツへ提供する状態です。
 */
export type PopoverPopupContext = Readonly<Override<PositionerContext, Popover.Popup.State>>;

/**
 * {@link PopoverPopup} が子パーツへ提供するコンテキストです。
 */
export const PopoverPopupContext: React.Context<PopoverPopupContext | null> =
  React.createContext<PopoverPopupContext | null>(null);

export type IUsePopoverPopupContext = IUseContext<PopoverPopupContext>;

/**
 * {@link PopoverPopupContext} を読み取るフックです。
 */
export const usePopoverPopupContext: IUsePopoverPopupContext = function useSuiPopoverPopupContext(
  optional,
): any {
  const ctx = React.use(PopoverPopupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PopoverPopupContext",
      providerName: "PopoverPopup",
    });
  }

  return ctx;
};

export { PopoverPopupContext as PopupContext, usePopoverPopupContext as usePopupContext };
