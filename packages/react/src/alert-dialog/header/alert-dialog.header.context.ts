import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";

/**
 * {@link AlertDialogHeader} が子パーツへ提供する状態です。
 */
export type AlertDialogHeaderContext = Readonly<
  Override<AlertDialogPopupContext, Card.Header.State>
>;

/**
 * {@link AlertDialogHeader} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogHeaderContext: React.Context<AlertDialogHeaderContext | null> =
  React.createContext<AlertDialogHeaderContext | null>(null);

export type IUseAlertDialogHeaderContext = IUseContext<AlertDialogHeaderContext>;

/**
 * {@link AlertDialogHeaderContext} を読み取るフックです。
 */
export const useAlertDialogHeaderContext: IUseAlertDialogHeaderContext = (optional): any => {
  const ctx = React.use(AlertDialogHeaderContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "AlertDialogHeaderContext",
      providerName: "AlertDialogHeader",
    });
  }

  return ctx;
};

export {
  AlertDialogHeaderContext as HeaderContext,
  useAlertDialogHeaderContext as useHeaderContext,
};
