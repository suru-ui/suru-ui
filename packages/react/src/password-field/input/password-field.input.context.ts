import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { TextFieldInputState } from "../../text-field/text-field.parts.js";
import type { Override, IUseContext } from "../../types.js";
import type { PasswordFieldContextState } from "../root/password-field.root.context.js";

/**
 * {@link PasswordFieldInput} が子パーツへ提供する状態です。
 */
export type PasswordFieldInputContext = Readonly<
  Override<PasswordFieldContextState, TextFieldInputState>
>;

/**
 * {@link PasswordFieldInput} が子パーツへ提供するコンテキストです。
 */
export const PasswordFieldInputContext: React.Context<PasswordFieldInputContext | null> =
  React.createContext<PasswordFieldInputContext | null>(null);

export type IUsePasswordFieldInputContext = IUseContext<PasswordFieldInputContext>;

/**
 * {@link PasswordFieldInputContext} を読み取るフックです。
 */
export const usePasswordFieldInputContext: IUsePasswordFieldInputContext = (optional): any => {
  const ctx = React.use(PasswordFieldInputContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "PasswordFieldInputContext",
      providerName: "PasswordFieldInput",
    });
  }

  return ctx;
};

export {
  PasswordFieldInputContext as InputContext,
  usePasswordFieldInputContext as useInputContext,
};
