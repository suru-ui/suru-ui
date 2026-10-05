import type { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";

/**
 * {@link ToastClose} が子パーツへ提供する状態です。
 */
export type ToastCloseContext = Readonly<Override<Button.Root.State, Toast.Close.State>>;

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
