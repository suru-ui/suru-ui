import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ToastActionState } from "./toast.action.jsx";

/**
 * {@link ToastAction} が子パーツへ提供する状態です。
 */
export type ToastActionContext = Readonly<ToastActionState>;

/**
 * {@link ToastAction} が子パーツへ提供するコンテキストです。
 */
export const ToastActionContext: React.Context<ToastActionContext | null> =
  React.createContext<ToastActionContext | null>(null);

export type IUseToastActionContext = IUseContext<ToastActionContext>;

/**
 * {@link ToastActionContext} を読み取るフックです。
 */
export const useToastActionContext: IUseToastActionContext = function useSuiToastActionContext(
  optional,
): any {
  const ctx = React.use(ToastActionContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToastActionContext",
      providerName: "ToastAction",
    });
  }

  return ctx;
};

export { ToastActionContext as ActionContext, useToastActionContext as useActionContext };
