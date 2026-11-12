import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/popover.popup.context.js";

/**
 * {@link PopoverViewport} が子パーツへ提供する状態です。
 */
export type PopoverViewportContext = Readonly<Override<PopupContext, Popover.Viewport.State>>;

/**
 * {@link PopoverViewport} が子パーツへ提供するコンテキストです。
 */
export const PopoverViewportContext: React.Context<PopoverViewportContext | null> =
  React.createContext<PopoverViewportContext | null>(null);

export type IUsePopoverViewportContext = IUseContext<PopoverViewportContext>;

/**
 * {@link PopoverViewportContext} を読み取るフックです。
 */
export const usePopoverViewportContext: IUsePopoverViewportContext = (optional): any => {
  const ctx = React.use(PopoverViewportContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "PopoverViewportContext",
      providerName: "PopoverViewport",
    });
  }

  return ctx;
};

export {
  PopoverViewportContext as ViewportContext,
  usePopoverViewportContext as useViewportContext,
};
