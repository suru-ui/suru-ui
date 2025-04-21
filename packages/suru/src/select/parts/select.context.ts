import { createContext } from "@suru-ui/utils";
import type { Color, Sizing } from "../../theme";

export type ContextValue = {
  color: Color;
  defaultValue: string | number | readonly string[] | undefined;
  disabled: boolean;
  fieldId: string;
  fieldName: string;
  formId: string;
  invalid: boolean;
  multiple: boolean;
  required: boolean;
  selectedContentId: string | undefined;
  size: Sizing;
};

export const [
  Context,
  useContext,
] = createContext<ContextValue>({
  name: "Select",
});
