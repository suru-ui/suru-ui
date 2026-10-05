import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ToastContentState } from "./toast.content.jsx";

/**
 * {@link ToastContent} が子パーツへ提供する状態です。
 */
export type ToastContentContext = Readonly<ToastContentState>;

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
