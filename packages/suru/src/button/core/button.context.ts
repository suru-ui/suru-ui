import { createContext } from "@suru-ui/utils";
import type { Color, ColorVariant, Sizing } from "../../theme";

export type ContextValue = {
  color: Color;
  disabled: boolean;
  outlined: boolean;
  size: Sizing;
  variant: ColorVariant;
};

export const [
  Context,
  useContext,
] = createContext<ContextValue>({
  name: "Button",
});
