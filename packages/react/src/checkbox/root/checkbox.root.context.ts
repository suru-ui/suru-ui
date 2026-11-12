import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { CheckboxRootState } from "./checkbox.root.jsx";

/**
 * {@link CheckboxRoot} が子パーツへ提供する状態です。
 */
export type CheckboxRootContext = Readonly<CheckboxRootState>;

/**
 * {@link CheckboxRoot} が子パーツへ提供するコンテキストです。
 */
export const CheckboxRootContext: React.Context<CheckboxRootContext | null> =
  React.createContext<CheckboxRootContext | null>(null);

export type IUseCheckboxRootContext = IUseContext<CheckboxRootContext>;

/**
 * {@link CheckboxRootContext} を読み取るフックです。
 */
export const useCheckboxRootContext: IUseCheckboxRootContext = (optional): any => {
  const ctx = React.use(CheckboxRootContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "CheckboxRootContext",
      providerName: "CheckboxRoot",
    });
  }

  return ctx;
};

export { CheckboxRootContext as RootContext, useCheckboxRootContext as useRootContext };
