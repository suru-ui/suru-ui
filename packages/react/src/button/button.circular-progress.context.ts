import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link ButtonCircularProgress} が子パーツへ提供するコンテキストです。
 */
export type ButtonCircularProgressContext = {
  /**
   * 不定モードで表示するかどうかです。
   */
  readonly indeterminate: boolean;

  /**
   * 進捗率です。
   */
  readonly percentage: number | undefined;
};

/**
 * {@link ButtonCircularProgress} が子パーツへ提供するコンテキストです。
 */
export const ButtonCircularProgressContext: React.Context<ButtonCircularProgressContext | null> =
  React.createContext<ButtonCircularProgressContext | null>(null);

export type IUseButtonCircularProgressContext = IUseContext<ButtonCircularProgressContext>;

/**
 * {@link ButtonCircularProgressContext} を読み取るフックです。
 */
export const useButtonCircularProgressContext: IUseButtonCircularProgressContext =
  function useSuiButtonCircularProgressContext(optional?: boolean): any {
    const ctx = React.use(ButtonCircularProgressContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ButtonCircularProgressContext",
        providerName: "ButtonCircularProgress",
      });
    }

    return ctx;
  };

export {
  ButtonCircularProgressContext as CircularProgressContext,
  useButtonCircularProgressContext as useCircularProgressContext,
};
