import * as React from "react";

import * as Button from "../button/button.parts.js";
import type { IUseContext } from "../types.js";

export type ToggleButtonCircularProgressContext = Button.CircularProgressContext;

export const ToggleButtonCircularProgressContext: React.Context<ToggleButtonCircularProgressContext | null> =
  Button.CircularProgressContext;

export const useToggleButtonCircularProgressContext: IUseContext<ToggleButtonCircularProgressContext> =
  Button.useCircularProgressContext;

export {
  ToggleButtonCircularProgressContext as CircularProgressContext,
  useToggleButtonCircularProgressContext as useCircularProgressContext,
};
