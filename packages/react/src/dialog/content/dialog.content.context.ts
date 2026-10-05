import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { DialogContentState } from "./dialog.content.jsx";

/**
 * {@link DialogContent} が子パーツへ提供する状態です。
 */
export type DialogContentContext = Readonly<DialogContentState>;

/**
 * {@link DialogContent} が子パーツへ提供するコンテキストです。
 */
export const DialogContentContext: React.Context<DialogContentContext | null> =
  React.createContext<DialogContentContext | null>(null);

export type IUseDialogContentContext = IUseContext<DialogContentContext>;

/**
 * {@link DialogContentContext} を読み取るフックです。
 */
export const useDialogContentContext: IUseDialogContentContext =
  function useSuiDialogContentContext(optional): any {
    const ctx = React.use(DialogContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "DialogContentContext",
        providerName: "DialogContent",
      });
    }

    return ctx;
  };

export { DialogContentContext as ContentContext, useDialogContentContext as useContentContext };
