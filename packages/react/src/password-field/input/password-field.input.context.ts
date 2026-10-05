import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PasswordFieldInputState } from "./password-field.input.jsx";

/**
 * {@link PasswordFieldInput} が子パーツへ提供する状態です。
 */
export type PasswordFieldInputContext = Readonly<PasswordFieldInputState>;

/**
 * {@link PasswordFieldInput} が子パーツへ提供するコンテキストです。
 */
export const PasswordFieldInputContext: React.Context<PasswordFieldInputContext | null> =
  React.createContext<PasswordFieldInputContext | null>(null);

export type IUsePasswordFieldInputContext = IUseContext<PasswordFieldInputContext>;

/**
 * {@link PasswordFieldInputContext} を読み取るフックです。
 */
export const usePasswordFieldInputContext: IUsePasswordFieldInputContext =
  function useSuiPasswordFieldInputContext(optional): any {
    const ctx = React.use(PasswordFieldInputContext);
    if (ctx === null && !optional) {
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
