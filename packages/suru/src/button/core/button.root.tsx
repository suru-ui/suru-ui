import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import type { Color, ColorVariant, Sizing } from "../../theme";
import { Context } from "./button.context";

type RootParams = {
  asChild?: boolean | undefined;
  color?: Color | undefined;
  loading?: boolean | undefined;
  outlined?: boolean | undefined;
  size?: Sizing | undefined;
  variant?: ColorVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"button">, keyof RootParams>
  & RootParams;

export default function SuiButtonRoot(props: RootProps) {
  const {
    size = "md",
    color = "blue",
    inert,
    asChild,
    loading = false,
    variant = "solid",
    disabled = false,
    outlined = false,
    className,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot : "button";

  return (
    <Context
      value={React.useMemo(
        () => ({
          size,
          color,
          loading,
          variant,
          disabled,
          outlined,
        }),
        [
          size,
          color,
          loading,
          variant,
          disabled,
          outlined,
        ],
      )}
    >
      <Comp
        {...otherRootProps}
        inert={!disabled && loading}
        disabled={disabled}
        className={clsx(
          className,
          "SuiButton",
          `SuiButton-size-${size}`,
          `SuiButton-color-${color}`,
          `SuiButton-variant-${variant}`,
          {
            "SuiButton-outlined": outlined,
            [classes.loading]: loading,
            [classes.disabled]: disabled,
          },
        )}
      />
    </Context>
  );
}
