import type { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";

/**
 * {@link AlertDialogDescription} が子パーツへ提供する状態です。
 */
export type AlertDialogDescriptionContext = Readonly<
  Override<Override<AlertDialogPopupContext, Card.Description.State>, AlertDialog.Description.State>
>;

/**
 * {@link AlertDialogDescription} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogDescriptionContext: React.Context<AlertDialogDescriptionContext | null> =
  React.createContext<AlertDialogDescriptionContext | null>(null);

export type IUseAlertDialogDescriptionContext = IUseContext<AlertDialogDescriptionContext>;

/**
 * {@link AlertDialogDescriptionContext} を読み取るフックです。
 */
export const useAlertDialogDescriptionContext: IUseAlertDialogDescriptionContext = (
  optional,
): any => {
  const ctx = React.use(AlertDialogDescriptionContext);

  if (ctx === null && optional !== true) {
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
