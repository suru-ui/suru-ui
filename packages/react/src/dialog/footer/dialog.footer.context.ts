import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DialogPopupContext } from "../popup/dialog.popup.context.js";

/**
 * {@link DialogFooter} が子パーツへ提供する状態です。
 */
export type DialogFooterContext = Readonly<Override<DialogPopupContext, Card.Footer.State>>;

/**
 * {@link DialogFooter} が子パーツへ提供するコンテキストです。
 */
export const DialogFooterContext: React.Context<DialogFooterContext | null> =
  React.createContext<DialogFooterContext | null>(null);

export type IUseDialogFooterContext = IUseContext<DialogFooterContext>;

/**
 * {@link DialogFooterContext} を読み取るフックです。
 */
export const useDialogFooterContext: IUseDialogFooterContext = (optional): any => {
  const ctx = React.use(DialogFooterContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "DialogFooterContext",
      providerName: "DialogFooter",
    });
  }

  return ctx;
};

export { DialogFooterContext as FooterContext, useDialogFooterContext as useFooterContext };
