import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AlertDialogFooterState } from "./alert-dialog.footer.jsx";

/**
 * {@link AlertDialogFooter} が子パーツへ提供する状態です。
 */
export type AlertDialogFooterContext = Readonly<AlertDialogFooterState>;

/**
 * {@link AlertDialogFooter} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogFooterContext: React.Context<AlertDialogFooterContext | null> =
  React.createContext<AlertDialogFooterContext | null>(null);

export type IUseAlertDialogFooterContext = IUseContext<AlertDialogFooterContext>;

/**
 * {@link AlertDialogFooterContext} を読み取るフックです。
 */
export const useAlertDialogFooterContext: IUseAlertDialogFooterContext =
  function useSuiAlertDialogFooterContext(optional): any {
    const ctx = React.use(AlertDialogFooterContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AlertDialogFooterContext",
        providerName: "AlertDialogFooter",
      });
    }

    return ctx;
  };

export {
  AlertDialogFooterContext as FooterContext,
  useAlertDialogFooterContext as useFooterContext,
};
