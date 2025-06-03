import * as React from "react";

export type ContextValue = {
  loading: boolean;
};

export default React.createContext<ContextValue | undefined>(undefined);
