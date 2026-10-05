import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SwitchThumbState } from "./switch.thumb.jsx";

/**
 * {@link SwitchThumb} が子パーツへ提供する状態です。
 */
export type SwitchThumbContext = Readonly<SwitchThumbState>;

/**
 * {@link SwitchThumb} が子パーツへ提供するコンテキストです。
 */
export const SwitchThumbContext: React.Context<SwitchThumbContext | null> =
  React.createContext<SwitchThumbContext | null>(null);

export type IUseSwitchThumbContext = IUseContext<SwitchThumbContext>;

/**
 * {@link SwitchThumbContext} を読み取るフックです。
 */
export const useSwitchThumbContext: IUseSwitchThumbContext = function useSuiSwitchThumbContext(
  optional,
): any {
  const ctx = React.use(SwitchThumbContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SwitchThumbContext",
      providerName: "SwitchThumb",
    });
  }

  return ctx;
};

export { SwitchThumbContext as ThumbContext, useSwitchThumbContext as useThumbContext };
