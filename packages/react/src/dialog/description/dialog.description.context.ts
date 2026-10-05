import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { DialogDescriptionState } from "./dialog.description.jsx";

/**
 * {@link DialogDescription} が子パーツへ提供する状態です。
 */
export type DialogDescriptionContext = Readonly<DialogDescriptionState>;

/**
 * {@link DialogDescription} が子パーツへ提供するコンテキストです。
 */
export const DialogDescriptionContext: React.Context<DialogDescriptionContext | null> =
  React.createContext<DialogDescriptionContext | null>(null);

export type IUseDialogDescriptionContext = IUseContext<DialogDescriptionContext>;

/**
 * {@link DialogDescriptionContext} を読み取るフックです。
 */
export const useDialogDescriptionContext: IUseDialogDescriptionContext =
  function useSuiDialogDescriptionContext(optional): any {
    const ctx = React.use(DialogDescriptionContext);
    if (ctx === null && !optional) {
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
