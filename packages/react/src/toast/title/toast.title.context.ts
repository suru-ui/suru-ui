import type { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type * as Alert from "../../alert/alert.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";

/**
 * {@link ToastTitle} が子パーツへ提供する状態です。
 */
export type ToastTitleContext = Readonly<Override<Alert.Title.State, Toast.Title.State>>;

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
