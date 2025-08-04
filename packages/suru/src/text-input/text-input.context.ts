import * as React from "react";

export type ContextValue = {
  ignoreFocus: Set<unknown>;
};

export default React.createContext<ContextValue | undefined>(undefined);
