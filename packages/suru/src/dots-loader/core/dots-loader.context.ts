import { createContext } from "@suru-ui/utils";

export type ContextValue = {
  color: string | null;
  size: string | number | null;
};

export const [
  Context,
  useContext,
] = createContext<ContextValue>({
  name: "DotsLoader",
});
