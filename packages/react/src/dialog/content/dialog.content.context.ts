import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DialogPopupContext } from "../popup/dialog.popup.context.js";

/**
 * {@link DialogContent} が子パーツへ提供する状態です。
 */
export type DialogContentContext = Readonly<Override<DialogPopupContext, Card.Content.State>>;

/**
 * {@link DialogContent} が子パーツへ提供するコンテキストです。
 */
export const DialogContentContext: React.Context<DialogContentContext | null> =
  React.createContext<DialogContentContext | null>(null);

export type IUseDialogContentContext = IUseContext<DialogContentContext>;

/**
 * {@link DialogContentContext} を読み取るフックです。
 */
export const useDialogContentContext: IUseDialogContentContext = (optional): any => {
  const ctx = React.use(DialogContentContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "DialogContentContext",
      providerName: "DialogContent",
    });
  }

  return ctx;
};

export { DialogContentContext as ContentContext, useDialogContentContext as useContentContext };
