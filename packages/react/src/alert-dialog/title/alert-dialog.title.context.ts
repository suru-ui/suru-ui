import type { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";

/**
 * {@link AlertDialogTitle} が子パーツへ提供する状態です。
 */
export type AlertDialogTitleContext = Readonly<
  Override<Override<AlertDialogPopupContext, Card.Title.State>, AlertDialog.Title.State>
>;

/**
 * {@link AlertDialogTitle} が子パーツへ提供するコンテキストです。
 */
export const AlertDialogTitleContext: React.Context<AlertDialogTitleContext | null> =
  React.createContext<AlertDialogTitleContext | null>(null);

export type IUseAlertDialogTitleContext = IUseContext<AlertDialogTitleContext>;

/**
 * {@link AlertDialogTitleContext} を読み取るフックです。
 */
export const useAlertDialogTitleContext: IUseAlertDialogTitleContext =
  function useSuiAlertDialogTitleContext(optional): any {
    const ctx = React.use(AlertDialogTitleContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AlertDialogTitleContext",
        providerName: "AlertDialogTitle",
      });
    }

    return ctx;
  };

export { AlertDialogTitleContext as TitleContext, useAlertDialogTitleContext as useTitleContext };
