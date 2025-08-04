import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";
import type { Sizing } from "../theme";
import { classes, useMergeProps } from "../utils";

export type RootProps = React.ComponentProps<"select"> & {
  asChild?: boolean | undefined;
  sizing?: Sizing | undefined;
};

export default function SuiSelectRoot(props: RootProps): React.ReactElement {
  const {
    sizing = "md",
    asChild,
    disabled,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "select";

  return (
    <Comp
      {...useMergeProps(
        {
          disabled,
          className: clsx(
            "sui-select",
            `sui-select-size_${sizing}`,
            {
              "sui-select-disabled": disabled,
              [classes.disabled]: disabled,
            },
          ),
        },
        otherRootProps,
      )}
    />
  );
}
