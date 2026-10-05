import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ToastTitleState } from "./toast.title.jsx";

/**
 * {@link ToastTitle} が子パーツへ提供する状態です。
 */
export type ToastTitleContext = Readonly<ToastTitleState>;

/**
 * {@link ToastTitle} が子パーツへ提供するコンテキストです。
 */
export const ToastTitleContext: React.Context<ToastTitleContext | null> =
  React.createContext<ToastTitleContext | null>(null);

export type IUseToastTitleContext = IUseContext<ToastTitleContext>;

/**
 * {@link ToastTitleContext} を読み取るフックです。
 */
export const useToastTitleContext: IUseToastTitleContext = function useSuiToastTitleContext(
  optional,
): any {
  const ctx = React.use(ToastTitleContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToastTitleContext",
      providerName: "ToastTitle",
    });
  }

  return ctx;
};

export { ToastTitleContext as TitleContext, useToastTitleContext as useTitleContext };
