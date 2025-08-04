import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";
import type { Color, ColorVariant, Sizing } from "../theme";
import { classes, preventDefaultHandler, useMergeProps } from "../utils";

export type RootProps = React.ComponentProps<"button"> & {
  asChild?: boolean | undefined;
  colorScheme?: Color | undefined;
  loading?: boolean | undefined;
  outlined?: boolean | undefined;
  sizing?: Sizing | undefined;
  variant?: ColorVariant | undefined;
};

export default function SuiButtonRoot(props: RootProps): React.ReactElement {
  const {
    name,
    type = name === "__intent__" ? "submit" : "button", // conform 用
    sizing = "md",
    asChild,
    loading: loadingProp,
    onClick,
    variant = "solid",
    disabled,
    outlined = false,
    colorScheme = "blue",
    "aria-disabled": ariaDisabled = !!(!disabled && loadingProp) || loadingProp,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "button";
  const loading = loadingProp || false;
  const isDisabled = disabled || `${ariaDisabled}` === "true";

  return (
    <Comp
      {...useMergeProps(
        {
          name,
          type,
          onClick: isDisabled ? preventDefaultHandler : onClick,
          disabled,
          className: clsx(
            "sui-button",
            `sui-button-size_${sizing}`,
            `sui-button-color_${colorScheme}`,
            `sui-button-variant_${variant}`,
            {
              "sui-button-loading": loading,
              "sui-button-disabled": isDisabled,
              "sui-button-outlined": outlined,
              [classes.loading]: loading,
              [classes.disabled]: isDisabled,
              [classes.outlined]: outlined,
            },
          ),
          "aria-disabled": ariaDisabled,
        },
        otherRootProps,
      )}
    />
  );
}
