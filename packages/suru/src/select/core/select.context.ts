import { createContext } from "@suru-ui/utils";
import type { SelectProps } from "../../conform";
import type { Color, Sizing } from "../../theme";

type OptionalToUndefined<T> = {
  [P in keyof T]-?: undefined extends T[P] ? T[P] | undefined : T[P];
};

export type ContextValue = {
  color: Color;
  conform: OptionalToUndefined<Omit<SelectProps, `aria-${string}` | "multiple">>;
  disabled: boolean;
  multiple: boolean;
  selectedContentId: string | undefined;
  size: Sizing;
};

export const [
  Context,
  useContext,
] = createContext<ContextValue>({
  name: "Select",
});
