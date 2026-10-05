import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { DialogActionState } from "./dialog.action.jsx";

/**
 * {@link DialogAction} が子パーツへ提供する状態です。
 */
export type DialogActionContext = Readonly<DialogActionState>;

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
