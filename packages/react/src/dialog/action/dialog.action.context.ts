import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DialogPopupContext } from "../popup/dialog.popup.context.js";

/**
 * {@link DialogAction} が子パーツへ提供する状態です。
 */
export type DialogActionContext = Readonly<Override<DialogPopupContext, Card.Action.State>>;

/**
 * {@link DialogAction} が子パーツへ提供するコンテキストです。
 */
export const DialogActionContext: React.Context<DialogActionContext | null> =
  React.createContext<DialogActionContext | null>(null);

export type IUseDialogActionContext = IUseContext<DialogActionContext>;

/**
 * {@link DialogActionContext} を読み取るフックです。
 */
export const useDialogActionContext: IUseDialogActionContext = function useSuiDialogActionContext(
  optional,
): any {
  const ctx = React.use(DialogActionContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogActionContext",
      providerName: "DialogAction",
    });
  }

  return ctx;
};

export { DialogActionContext as ActionContext, useDialogActionContext as useActionContext };
