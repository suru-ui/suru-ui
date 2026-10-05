import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AlertDialogActionState } from "./alert-dialog.action.jsx";

/**
 * {@link AlertDialogAction} が子パーツへ提供する状態です。
 */
export type AlertDialogActionContext = Readonly<AlertDialogActionState>;

/**
 * {@link AlertDialogAction} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogActionContext: React.Context<AlertDialogActionContext | null> =
  React.createContext<AlertDialogActionContext | null>(null);

export type IUseAlertDialogActionContext = IUseContext<AlertDialogActionContext>;

/**
 * {@link AlertDialogActionContext} を読み取るフックです。
 */
export const useAlertDialogActionContext: IUseAlertDialogActionContext =
  function useSuiAlertDialogActionContext(optional): any {
    const ctx = React.use(AlertDialogActionContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AlertDialogActionContext",
        providerName: "AlertDialogAction",
      });
    }

    return ctx;
  };

export {
  AlertDialogActionContext as ActionContext,
  useAlertDialogActionContext as useActionContext,
};
