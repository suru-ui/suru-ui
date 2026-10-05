import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { DialogFooterState } from "./dialog.footer.jsx";

/**
 * {@link DialogFooter} が子パーツへ提供する状態です。
 */
export type DialogFooterContext = Readonly<DialogFooterState>;

/**
 * {@link DialogFooter} が子パーツへ提供するコンテキストです。
 */
export const DialogFooterContext: React.Context<DialogFooterContext | null> =
  React.createContext<DialogFooterContext | null>(null);

export type IUseDialogFooterContext = IUseContext<DialogFooterContext>;

/**
 * {@link DialogFooterContext} を読み取るフックです。
 */
export const useDialogFooterContext: IUseDialogFooterContext = function useSuiDialogFooterContext(
  optional,
): any {
  const ctx = React.use(DialogFooterContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogFooterContext",
      providerName: "DialogFooter",
    });
  }

  return ctx;
};

export { DialogFooterContext as FooterContext, useDialogFooterContext as useFooterContext };
