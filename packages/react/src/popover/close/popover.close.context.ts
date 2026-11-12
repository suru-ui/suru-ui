import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopupContext } from "../popup/popover.popup.context.js";

/**
 * {@link PopoverClose} が子パーツへ提供する状態です。
 */
export type PopoverCloseContext = Readonly<Override<PopupContext, Popover.Close.State>>;

/**
 * {@link PopoverClose} が子パーツへ提供するコンテキストです。
 */
export const PopoverCloseContext: React.Context<PopoverCloseContext | null> =
  React.createContext<PopoverCloseContext | null>(null);

export type IUsePopoverCloseContext = IUseContext<PopoverCloseContext>;

/**
 * {@link PopoverCloseContext} を読み取るフックです。
 */
export const usePopoverCloseContext: IUsePopoverCloseContext = (optional): any => {
  const ctx = React.use(PopoverCloseContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "PopoverCloseContext",
      providerName: "PopoverClose",
    });
  }

  return ctx;
};

export { PopoverCloseContext as CloseContext, usePopoverCloseContext as useCloseContext };
