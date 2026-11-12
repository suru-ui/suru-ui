import type { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import type * as Card from "../../card/card.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { DialogPopupContext } from "../popup/dialog.popup.context.js";

/**
 * {@link DialogTitle} が子パーツへ提供する状態です。
 */
export type DialogTitleContext = Readonly<
  Override<Override<DialogPopupContext, Card.Title.State>, Dialog.Title.State>
>;

/**
 * {@link DialogTitle} が子パーツへ提供するコンテキストです。
 */
export const DialogTitleContext: React.Context<DialogTitleContext | null> =
  React.createContext<DialogTitleContext | null>(null);

export type IUseDialogTitleContext = IUseContext<DialogTitleContext>;

/**
 * {@link DialogTitleContext} を読み取るフックです。
 */
export const useDialogTitleContext: IUseDialogTitleContext = (optional): any => {
  const ctx = React.use(DialogTitleContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "DialogTitleContext",
      providerName: "DialogTitle",
    });
  }

  return ctx;
};

export { DialogTitleContext as TitleContext, useDialogTitleContext as useTitleContext };
