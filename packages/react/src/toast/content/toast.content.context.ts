import type { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type * as Alert from "../../alert/alert.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";

/**
 * {@link ToastContent} が子パーツへ提供する状態です。
 */
export type ToastContentContext = Readonly<Override<Alert.Root.State, Toast.Content.State>>;

/**
 * {@link ToastContent} が子パーツへ提供するコンテキストです。
 */
export const ToastContentContext: React.Context<ToastContentContext | null> =
  React.createContext<ToastContentContext | null>(null);

export type IUseToastContentContext = IUseContext<ToastContentContext>;

/**
 * {@link ToastContentContext} を読み取るフックです。
 */
export const useToastContentContext: IUseToastContentContext = function useSuiToastContentContext(
  optional,
): any {
  const ctx = React.use(ToastContentContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToastContentContext",
      providerName: "ToastContent",
    });
  }

  return ctx;
};

export { ToastContentContext as ContentContext, useToastContentContext as useContentContext };
