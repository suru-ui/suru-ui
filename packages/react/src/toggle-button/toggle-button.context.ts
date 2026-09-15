import * as React from "react";

import * as Button from "../button/button.parts.js";
import type { IUseContext } from "../types.js";

export type ToggleButtonContext = Button.Context;

export const ToggleButtonContext: React.Context<ToggleButtonContext | null> = Button.Context;

export const useToggleButtonContext: IUseContext<ToggleButtonContext> = Button.useContext;

export { ToggleButtonContext as Context, useToggleButtonContext as useContext };
