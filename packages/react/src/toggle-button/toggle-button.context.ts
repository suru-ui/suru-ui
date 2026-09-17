import * as React from "react";

import * as Button from "../button/button.parts.js";
import type { IUseContext } from "../types.js";

/**
 * {@link ToggleButtonRoot} が子パーツへ提供するコンテキストです。
 */
export type ToggleButtonContext = Button.Context;

/**
 * {@link ToggleButtonRoot} が子パーツへ提供するコンテキストです。
 */
export const ToggleButtonContext: React.Context<ToggleButtonContext | null> = Button.Context;

/**
 * {@link ToggleButtonContext} を読み取るフックです。
 */
export const useToggleButtonContext: IUseContext<ToggleButtonContext> = Button.useContext;

export { ToggleButtonContext as Context, useToggleButtonContext as useContext };
