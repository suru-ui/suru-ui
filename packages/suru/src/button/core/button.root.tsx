import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import type { Color, ColorVariant, Sizing } from "../../theme";
import { Context } from "./button.context";

type RootParams = {
  asChild?: boolean | undefined;
  color?: Color | undefined;
  fullWidth?: boolean | undefined;
  loading?: boolean | undefined;
  outlined?: boolean | undefined;
  size?: Sizing | undefined;
  variant?: ColorVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"button">, keyof RootParams>
  & RootParams;

export default function SuiButtonRoot(props: RootProps): React.ReactElement {
  const {
    name,
    size = "md",
    type = name === "__intent__" ? "submit" : "button", // conform は name="__intent__" をフックする。
    color = "blue",
    asChild,
    loading = false,
    onClick,
    variant = "solid",
    disabled = false,
    outlined = false,
    className,
    fullWidth = false,
    "aria-disabled": ariaDisabled = (!disabled && loading) || undefined,
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
          fullWidth,
        }),
        [
          size,
          color,
          loading,
          variant,
          disabled,
          outlined,
          fullWidth,
        ],
      )}
    >
      <Comp
        {...otherRootProps}
        name={name}
        type={type}
        onClick={loading ? disabledClick : onClick}
        disabled={disabled}
        className={clsx(
          className,
          "SuiButton",
          `SuiButton-size-${size}`,
          `SuiButton-color-${color}`,
          `SuiButton-variant-${variant}`,
          {
            [classes.loading]: loading,
            [classes.disabled]: disabled,
            "SuiButton-outlined": outlined,
          },
        )}
        aria-disabled={ariaDisabled}
      />
    </Context>
  );
}

function disabledClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
}
