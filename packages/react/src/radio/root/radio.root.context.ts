import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { RadioRootState } from "./radio.root.jsx";

/**
 * {@link RadioRoot} が子パーツへ提供する状態です。
 */
export type RadioRootContext = Readonly<RadioRootState>;

/**
 * {@link RadioRoot} が子パーツへ提供するコンテキストです。
 */
export const RadioRootContext: React.Context<RadioRootContext | null> =
  React.createContext<RadioRootContext | null>(null);

export type IUseRadioRootContext = IUseContext<RadioRootContext>;

/**
 * {@link RadioRootContext} を読み取るフックです。
 */
export const useRadioRootContext: IUseRadioRootContext = function useSuiRadioRootContext(
  optional,
): any {
  const ctx = React.use(RadioRootContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "RadioRootContext",
      providerName: "RadioRoot",
    });
  }

  return ctx;
};

export { RadioRootContext as RootContext, useRadioRootContext as useRootContext };
