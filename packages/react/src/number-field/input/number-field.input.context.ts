import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { NumberFieldInputState } from "./number-field.input.jsx";

/**
 * {@link NumberFieldInput} が子パーツへ提供する状態です。
 */
export type NumberFieldInputContext = Readonly<NumberFieldInputState>;

/**
 * {@link NumberFieldInput} が子パーツへ提供するコンテキストです。
 */
export const NumberFieldInputContext: React.Context<NumberFieldInputContext | null> =
  React.createContext<NumberFieldInputContext | null>(null);

export type IUseNumberFieldInputContext = IUseContext<NumberFieldInputContext>;

/**
 * {@link NumberFieldInputContext} を読み取るフックです。
 */
export const useNumberFieldInputContext: IUseNumberFieldInputContext =
  function useSuiNumberFieldInputContext(optional): any {
    const ctx = React.use(NumberFieldInputContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "NumberFieldInputContext",
        providerName: "NumberFieldInput",
      });
    }

    return ctx;
  };

export { NumberFieldInputContext as InputContext, useNumberFieldInputContext as useInputContext };
