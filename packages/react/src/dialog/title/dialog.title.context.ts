import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { DialogTitleState } from "./dialog.title.jsx";

/**
 * {@link DialogTitle} が子パーツへ提供する状態です。
 */
export type DialogTitleContext = Readonly<DialogTitleState>;

/**
 * {@link DialogTitle} が子パーツへ提供するコンテキストです。
 */
export const DialogTitleContext: React.Context<DialogTitleContext | null> =
  React.createContext<DialogTitleContext | null>(null);

export type IUseDialogTitleContext = IUseContext<DialogTitleContext>;

/**
 * {@link DialogTitleContext} を読み取るフックです。
 */
export const useDialogTitleContext: IUseDialogTitleContext = function useSuiDialogTitleContext(
  optional,
): any {
  const ctx = React.use(DialogTitleContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "DialogTitleContext",
      providerName: "DialogTitle",
    });
  }

  return ctx;
};

export { DialogTitleContext as TitleContext, useDialogTitleContext as useTitleContext };
