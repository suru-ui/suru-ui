import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ToastDescriptionState } from "./toast.description.jsx";

/**
 * {@link ToastDescription} が子パーツへ提供する状態です。
 */
export type ToastDescriptionContext = Readonly<ToastDescriptionState>;

/**
 * {@link ToastDescription} が子パーツへ提供するコンテキストです。
 */
export const ToastDescriptionContext: React.Context<ToastDescriptionContext | null> =
  React.createContext<ToastDescriptionContext | null>(null);

export type IUseToastDescriptionContext = IUseContext<ToastDescriptionContext>;

/**
 * {@link ToastDescriptionContext} を読み取るフックです。
 */
export const useToastDescriptionContext: IUseToastDescriptionContext =
  function useSuiToastDescriptionContext(optional): any {
    const ctx = React.use(ToastDescriptionContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ToastDescriptionContext",
        providerName: "ToastDescription",
      });
    }

    return ctx;
  };

export {
  ToastDescriptionContext as DescriptionContext,
  useToastDescriptionContext as useDescriptionContext,
};
