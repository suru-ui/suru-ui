import type { ButtonState } from "@base-ui/react";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export type ButtonContext = Readonly<
  ButtonState & {
    /**
     * ボタンが保留状態かどうかです。
     */
    pending: boolean;
  }
>;

/**
 * {@link ButtonRoot} が子パーツへ提供するコンテキストです。
 */
export const ButtonContext: React.Context<ButtonContext | null> =
  React.createContext<ButtonContext | null>(null);

export type IUseButtonContext = IUseContext<ButtonContext>;

/**
 * {@link ButtonContext} を読み取るフックです。
 */
export const useButtonContext: IUseButtonContext = function useSuiButtonContext(
  optional?: boolean,
): any {
  const ctx = React.use(ButtonContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ButtonContext",
      providerName: "ButtonRoot",
    });
  }

  return ctx;
};

export { ButtonContext as Context, useButtonContext as useContext };
