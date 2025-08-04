import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import type { Color, Sizing } from "../theme";
import { classes, useMergeProps } from "../utils";

export type RootProps = React.ComponentProps<"textarea"> & {
  asChild?: boolean | undefined;
  colorScheme?: Color | undefined;
  sizing?: Sizing | undefined;
};

export default function SuiTextareaRoot(props: RootProps): React.ReactElement {
  const {
    sizing = "md",
    asChild,
    disabled,
    colorScheme = "blue",
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "textarea";

  return (
    <Comp
      {...useMergeProps(
        {
          disabled,
          className: clsx(
            "sui-textarea",
            `sui-textarea-size_${sizing}`,
            `sui-textarea-color_${colorScheme}`,
            {
              "sui-textarea-disabled": disabled,
              [classes.disabled]: disabled,
            },
          ),
        },
        otherRootProps,
      )}
    />
  );
}
