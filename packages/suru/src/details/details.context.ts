import type { DetailsApi } from "@suru-ui/core";
import * as React from "react";

export type ContextValue = Readonly<
  Pick<DetailsApi, "getSummaryProps" | "getContentProps"> & {
    isOpen: boolean;
  }
>;

export const Context = React.createContext<ContextValue | undefined>(undefined);
