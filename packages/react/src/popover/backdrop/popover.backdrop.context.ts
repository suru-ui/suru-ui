import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverBackdropState } from "./popover.backdrop.jsx";

/**
 * {@link PopoverBackdrop} が子パーツへ提供する状態です。
 */
export type PopoverBackdropContext = Readonly<PopoverBackdropState>;

/**
 * {@link PopoverBackdrop} が子パーツへ提供するコンテキストです。
 */
export const PopoverBackdropContext: React.Context<PopoverBackdropContext | null> =
  React.createContext<PopoverBackdropContext | null>(null);

export type IUsePopoverBackdropContext = IUseContext<PopoverBackdropContext>;

/**
 * {@link PopoverBackdropContext} を読み取るフックです。
 */
export const usePopoverBackdropContext: IUsePopoverBackdropContext =
  function useSuiPopoverBackdropContext(optional): any {
    const ctx = React.use(PopoverBackdropContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PopoverBackdropContext",
        providerName: "PopoverBackdrop",
      });
    }

    return ctx;
  };

export {
  PopoverBackdropContext as BackdropContext,
  usePopoverBackdropContext as useBackdropContext,
};
