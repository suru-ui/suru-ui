import { createContext } from "@suru-ui/utils";
import type * as React from "react";
import type { Color, Sizing } from "../../theme";

type InputProps = {
  disabled: boolean;
  invalid: "false" | "true" | "grammar" | "spelling" | undefined;
  required: boolean;
};

type Value = InputProps & {
  color: Color;
  fullWidth: boolean;
  size: Sizing;
};

export type ContextValue = Value & {
  setInputProps: React.Dispatch<React.SetStateAction<InputProps>>;
};

export const [
  Context,
  useContext,
] = createContext<ContextValue>({
  name: "TextInput",
});
