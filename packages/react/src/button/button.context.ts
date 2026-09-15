import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export type ButtonContext = {
  /**
   * ボタンが保留状態かどうかです。
   */
  readonly pending: boolean;
};

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export const ButtonContext: React.Context<ButtonContext | null> =
  React.createContext<ButtonContext | null>(null);

function useSuiButtonContext(optional?: false): ButtonContext;
function useSuiButtonContext(optional?: boolean): ButtonContext | null;
function useSuiButtonContext(optional?: boolean): ButtonContext | null {
  const ctx = React.use(ButtonContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });
  }

  return ctx;
}

/**
 * {@link ButtonContext} を読み取るフックです。
 */
export const useButtonContext: IUseContext<ButtonContext> = useSuiButtonContext;

export { ButtonContext as Context, useButtonContext as useContext };
