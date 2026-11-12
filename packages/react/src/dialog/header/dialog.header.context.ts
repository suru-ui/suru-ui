import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DialogPopupContext } from "../popup/dialog.popup.context.js";

/**
 * {@link DialogHeader} が子パーツへ提供する状態です。
 */
export type DialogHeaderContext = Readonly<Override<DialogPopupContext, Card.Header.State>>;

/**
 * {@link DialogHeader} が子パーツへ提供するコンテキストです。
 */
export const DialogHeaderContext: React.Context<DialogHeaderContext | null> =
  React.createContext<DialogHeaderContext | null>(null);

export type IUseDialogHeaderContext = IUseContext<DialogHeaderContext>;

/**
 * {@link DialogHeaderContext} を読み取るフックです。
 */
export const useDialogHeaderContext: IUseDialogHeaderContext = (optional): any => {
  const ctx = React.use(DialogHeaderContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "DialogHeaderContext",
      providerName: "DialogHeader",
    });
  }

  return ctx;
};

export { DialogHeaderContext as HeaderContext, useDialogHeaderContext as useHeaderContext };
