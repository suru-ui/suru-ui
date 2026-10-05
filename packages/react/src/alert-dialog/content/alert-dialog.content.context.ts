import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";

/**
 * {@link AlertDialogContent} が子パーツへ提供する状態です。
 */
export type AlertDialogContentContext = Readonly<
  Override<AlertDialogPopupContext, Card.Content.State>
>;

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
