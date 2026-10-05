import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ToastCloseState } from "./toast.close.jsx";

/**
 * {@link ToastClose} が子パーツへ提供する状態です。
 */
export type ToastCloseContext = Readonly<ToastCloseState>;

/**
 * {@link ToastClose} が子パーツへ提供するコンテキストです。
 */
export const ToastCloseContext: React.Context<ToastCloseContext | null> =
  React.createContext<ToastCloseContext | null>(null);

export type IUseToastCloseContext = IUseContext<ToastCloseContext>;

/**
 * {@link ToastCloseContext} を読み取るフックです。
 */
export const useToastCloseContext: IUseToastCloseContext = function useSuiToastCloseContext(
  optional,
): any {
  const ctx = React.use(ToastCloseContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToastCloseContext",
      providerName: "ToastClose",
    });
  }

  return ctx;
};

export { ToastCloseContext as CloseContext, useToastCloseContext as useCloseContext };
