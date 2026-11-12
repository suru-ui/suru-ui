import type { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DialogPopupContext } from "../popup/dialog.popup.context.js";

/**
 * {@link DialogDescription} が子パーツへ提供する状態です。
 */
export type DialogDescriptionContext = Readonly<
  Override<Override<DialogPopupContext, Card.Description.State>, Dialog.Description.State>
>;

/**
 * {@link DialogDescription} が子パーツへ提供するコンテキストです。
 */
export const DialogDescriptionContext: React.Context<DialogDescriptionContext | null> =
  React.createContext<DialogDescriptionContext | null>(null);

export type IUseDialogDescriptionContext = IUseContext<DialogDescriptionContext>;

/**
 * {@link DialogDescriptionContext} を読み取るフックです。
 */
export const useDialogDescriptionContext: IUseDialogDescriptionContext = (optional): any => {
  const ctx = React.use(DialogDescriptionContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "DialogDescriptionContext",
      providerName: "DialogDescription",
    });
  }

  return ctx;
};

export {
  DialogDescriptionContext as DescriptionContext,
  useDialogDescriptionContext as useDescriptionContext,
};
