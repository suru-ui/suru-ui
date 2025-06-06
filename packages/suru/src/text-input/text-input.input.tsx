import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import Context from "./text-input.context";

export type InputArgs = {
  asChild?: boolean | undefined;
};

export type InputProps =
  & Omit<React.ComponentProps<"input">, keyof InputArgs>
  & InputArgs;

export default function SuiTextInputInput(props: InputProps): React.ReactElement {
  const ctx = React.use(Context);
  assertRequiredContext("TextInputInput", ctx);
  const {
    type,
    asChild,
    disabled,
    className,
    ...otherInputProps
  } = props;
  const Comp = asChild ? Slot as never : "input";
  const { getInputProps } = ctx;
  const apiInputProps = getInputProps({
    type,
    disabled,
  });

  return <Comp {...useMergeProps(apiInputProps, otherInputProps as {})} />;
}
