import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import type { Color, Sizing } from "../theme";
import { classes, useMergeProps } from "../utils";

export type RootProps = React.ComponentProps<"input"> & {
  asChild?: boolean | undefined;
  colorScheme?: Color | undefined;
  indeterminate?: boolean | undefined;
  sizing?: Sizing | undefined;
};

export default function SuiCheckbox(props: RootProps): React.ReactElement {
  const {
    type = "checkbox",
    sizing = "md",
    asChild,
    disabled,
    readOnly,
    colorScheme = "blue",
    indeterminate,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "input";

  return (
    <Comp
      {...useMergeProps(
        {
          type,
          disabled,
          readOnly,
          className: clsx(
            "sui-checkbox",
            `sui-checkbox-size_${sizing}`,
            `sui-checkbox-color_${colorScheme}`,
            {
              "sui-checkbox-disabled": disabled,
              "sui-checkbox-readonly": readOnly,
              "sui-checkbox-indeterminate": indeterminate,
              [classes.disabled]: disabled,
              [classes.readonly]: readOnly,
              [classes.indeterminate]: indeterminate,
            },
          ),
        },
        otherRootProps,
      )}
    />
  );
}
