import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AlertDialogContentState } from "./alert-dialog.content.jsx";

/**
 * {@link AlertDialogContent} が子パーツへ提供する状態です。
 */
export type AlertDialogContentContext = Readonly<AlertDialogContentState>;

/**
 * {@link AlertDialogContent} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogContentContext: React.Context<AlertDialogContentContext | null> =
  React.createContext<AlertDialogContentContext | null>(null);

export type IUseAlertDialogContentContext = IUseContext<AlertDialogContentContext>;

/**
 * {@link AlertDialogContentContext} を読み取るフックです。
 */
export const useAlertDialogContentContext: IUseAlertDialogContentContext =
  function useSuiAlertDialogContentContext(optional): any {
    const ctx = React.use(AlertDialogContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AlertDialogContentContext",
        providerName: "AlertDialogContent",
      });
    }

    return ctx;
  };

export {
  AlertDialogContentContext as ContentContext,
  useAlertDialogContentContext as useContentContext,
};
