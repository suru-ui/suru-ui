import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";

/**
 * {@link AlertDialogAction} が子パーツへ提供する状態です。
 */
export type AlertDialogActionContext = Readonly<
  Override<AlertDialogPopupContext, Card.Action.State>
>;

/**
 * {@link AlertDialogAction} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogActionContext: React.Context<AlertDialogActionContext | null> =
  React.createContext<AlertDialogActionContext | null>(null);

export type IUseAlertDialogActionContext = IUseContext<AlertDialogActionContext>;

/**
 * {@link AlertDialogActionContext} を読み取るフックです。
 */
export const useAlertDialogActionContext: IUseAlertDialogActionContext = (optional): any => {
  const ctx = React.use(AlertDialogActionContext);

  if (ctx === null && optional !== true) {
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
