import type { Input as BaseInput } from "@base-ui/react/input";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { TextFieldContext } from "../root/text-field.root.context.js";

/**
 * {@link TextFieldInput} が子パーツへ提供する状態です。
 */
export type TextFieldInputContext = Readonly<Override<TextFieldContext, BaseInput.State>>;

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
