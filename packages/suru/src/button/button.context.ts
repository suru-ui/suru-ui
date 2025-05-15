import * as React from "react";

export type ContextValue = {
  loading: boolean;
};

export const Context = React.createContext<ContextValue | undefined>(undefined);
