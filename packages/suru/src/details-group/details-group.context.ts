import type { DetailsGroupApi } from "@suru-ui/core";
import * as React from "react";

export type ContextValue = DetailsGroupApi;

export default React.createContext<ContextValue | undefined>(undefined);
