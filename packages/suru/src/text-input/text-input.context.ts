import type { GetTextInputEscapeFocusTrapProps, GetTextInputInputProps } from "@suru-ui/core";
import * as React from "react";

export type ContextValue = {
  getInputProps: GetTextInputInputProps;
  getEscapeFocusTrapProps: GetTextInputEscapeFocusTrapProps;
};

export default React.createContext<ContextValue | undefined>(undefined);
