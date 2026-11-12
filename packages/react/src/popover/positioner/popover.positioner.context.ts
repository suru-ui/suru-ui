import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PortalContext } from "../portal/popover.portal.context.js";

/**
 * {@link PopoverPositioner} が子パーツへ提供する状態です。
 */
export type PopoverPositionerContext = Readonly<Override<PortalContext, Popover.Positioner.State>>;

/**
 * {@link PopoverPositioner} が子パーツへ提供するコンテキストです。
 */
export const PopoverPositionerContext: React.Context<PopoverPositionerContext | null> =
  React.createContext<PopoverPositionerContext | null>(null);

export type IUsePopoverPositionerContext = IUseContext<PopoverPositionerContext>;

/**
 * {@link PopoverPositionerContext} を読み取るフックです。
 */
export const usePopoverPositionerContext: IUsePopoverPositionerContext = (optional): any => {
  const ctx = React.use(PopoverPositionerContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "PopoverPositionerContext",
      providerName: "PopoverPositioner",
    });
  }

  return ctx;
};

export {
  PopoverPositionerContext as PositionerContext,
  usePopoverPositionerContext as usePositionerContext,
};
