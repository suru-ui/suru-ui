import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { DialogHeaderState } from "./dialog.header.jsx";

/**
 * {@link DialogHeader} が子パーツへ提供する状態です。
 */
export type DialogHeaderContext = Readonly<DialogHeaderState>;

/**
 * {@link DialogHeader} が子パーツへ提供するコンテキストです。
 */
export const DialogHeaderContext: React.Context<DialogHeaderContext | null> =
  React.createContext<DialogHeaderContext | null>(null);

export type IUseDialogHeaderContext = IUseContext<DialogHeaderContext>;

/**
 * {@link DialogHeaderContext} を読み取るフックです。
 */
export const useDialogHeaderContext: IUseDialogHeaderContext = function useSuiDialogHeaderContext(
  optional,
): any {
  const ctx = React.use(DialogHeaderContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogHeaderContext",
      providerName: "DialogHeader",
    });
  }

  return ctx;
};

export { DialogHeaderContext as HeaderContext, useDialogHeaderContext as useHeaderContext };
