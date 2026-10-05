import type { Toast } from "@base-ui/react/toast";
import * as React from "react";

import type * as Alert from "../../alert/alert.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";

/**
 * {@link ToastDescription} が子パーツへ提供する状態です。
 */
export type ToastDescriptionContext = Readonly<
  Override<Alert.Description.State, Toast.Description.State>
>;

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
