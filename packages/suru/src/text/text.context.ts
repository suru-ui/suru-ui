import * as React from "react";
import type { TypographyVariant } from "../theme";

export type ContextValue = {
  variant: TypographyVariant;
};

export default React.createContext<ContextValue | undefined>(undefined);
