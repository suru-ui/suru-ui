import * as React from "react";

import * as Button from "../button/button.parts.js";
import type { IUseContext } from "../types.js";

/**
 * {@link ToggleButtonCircularProgress} が子パーツへ提供するコンテキストです。
 */
export type ToggleButtonCircularProgressContext = Button.CircularProgressContext;

/**
 * {@link ToggleButtonCircularProgress} が子パーツへ提供するコンテキストです。
 */
export const ToggleButtonCircularProgressContext: React.Context<ToggleButtonCircularProgressContext | null> =
  Button.CircularProgressContext;

/**
 * {@link ToggleButtonCircularProgressContext} を読み取るフックです。
 */
export const useToggleButtonCircularProgressContext: IUseContext<ToggleButtonCircularProgressContext> =
  Button.useCircularProgressContext;

export {
  ToggleButtonCircularProgressContext as CircularProgressContext,
  useToggleButtonCircularProgressContext as useCircularProgressContext,
};
