import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { TextFieldInputState } from "./text-field.input.jsx";

/**
 * {@link TextFieldInput} が子パーツへ提供する状態です。
 */
export type TextFieldInputContext = Readonly<TextFieldInputState>;

/**
 * {@link TextFieldInput} が子パーツへ提供するコンテキストです。
 */
export const TextFieldInputContext: React.Context<TextFieldInputContext | null> =
  React.createContext<TextFieldInputContext | null>(null);

export type IUseTextFieldInputContext = IUseContext<TextFieldInputContext>;

/**
 * {@link TextFieldInputContext} を読み取るフックです。
 */
export const useTextFieldInputContext: IUseTextFieldInputContext =
  function useSuiTextFieldInputContext(optional): any {
    const ctx = React.use(TextFieldInputContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "TextFieldInputContext",
        providerName: "TextFieldInput",
      });
    }

    return ctx;
  };

export { TextFieldInputContext as InputContext, useTextFieldInputContext as useInputContext };
