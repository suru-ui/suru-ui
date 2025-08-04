import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import { classes, useMergeProps } from "../utils";
import Context from "./text-input.context";

export type InputProps = React.ComponentProps<"input"> & {
  asChild?: boolean | undefined;
};

export default function SuiTextInputInput(props: InputProps): React.ReactElement {
  const ctx = React.use(Context);
  if (!ctx) {
    new Error(
      "suru-ui(suru/TextInput): Context の値が `undefined` でした。"
        + "<TextInput.Root /> で囲う必要があります。",
    );
  }

  const {
    type = "text",
    asChild,
    disabled,
    ...otherInputProps
  } = props;
  const Comp = asChild ? Slot as never : "input";

  return (
    <Comp
      {...useMergeProps(
        {
          type,
          disabled,
          className: clsx("sui-text_input-input", {
            "sui-text_input-input-disabled": disabled,
            [classes.disabled]: disabled,
          }),
        },
        otherInputProps,
      )}
    />
  );
}
