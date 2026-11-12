import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";

/**
 * {@link AlertDialogFooter} が子パーツへ提供する状態です。
 */
export type AlertDialogFooterContext = Readonly<
  Override<AlertDialogPopupContext, Card.Footer.State>
>;

/**
 * {@link AlertDialogFooter} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogFooterContext: React.Context<AlertDialogFooterContext | null> =
  React.createContext<AlertDialogFooterContext | null>(null);

export type IUseAlertDialogFooterContext = IUseContext<AlertDialogFooterContext>;

/**
 * {@link AlertDialogFooterContext} を読み取るフックです。
 */
export const useAlertDialogFooterContext: IUseAlertDialogFooterContext = (optional): any => {
  const ctx = React.use(AlertDialogFooterContext);

  if (ctx === null && optional !== true) {
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
