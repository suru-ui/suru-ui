import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";
import { classes, useMergeProps } from "../utils";

export type OptionProps = React.ComponentProps<"option"> & {
  asChild?: boolean | undefined;
};

export default function SuiSelectOption(props: OptionProps): React.ReactElement {
  const {
    asChild,
    disabled,
    ...otherOptionProps
  } = props;
  const Comp = asChild ? Slot as never : "option";

  return (
    <Comp
      {...useMergeProps(
        {
          disabled,
          className: clsx("sui-select-option", {
            "sui-select_option-disabled": disabled,
            [classes.disabled]: disabled,
          }),
        },
        otherOptionProps,
      )}
    />
  );
}
