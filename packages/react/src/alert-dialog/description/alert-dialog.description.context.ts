import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AlertDialogDescriptionState } from "./alert-dialog.description.jsx";

/**
 * {@link AlertDialogDescription} が子パーツへ提供する状態です。
 */
export type AlertDialogDescriptionContext = Readonly<AlertDialogDescriptionState>;

/**
 * {@link AlertDialogDescription} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogDescriptionContext: React.Context<AlertDialogDescriptionContext | null> =
  React.createContext<AlertDialogDescriptionContext | null>(null);

export type IUseAlertDialogDescriptionContext = IUseContext<AlertDialogDescriptionContext>;

/**
 * {@link AlertDialogDescriptionContext} を読み取るフックです。
 */
export const useAlertDialogDescriptionContext: IUseAlertDialogDescriptionContext =
  function useSuiAlertDialogDescriptionContext(optional): any {
    const ctx = React.use(AlertDialogDescriptionContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AlertDialogDescriptionContext",
        providerName: "AlertDialogDescription",
      });
    }

    return ctx;
  };

export {
  AlertDialogDescriptionContext as DescriptionContext,
  useAlertDialogDescriptionContext as useDescriptionContext,
};
