import { Slot } from "@suru-ui/slot";
import type { ClassName } from "@suru-ui/styled";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import type { Color, ColorVariant, Sizing } from "../../theme";
import { Context } from "./button.context";

const I = "SuiButton";

type RootParams = {
  color?: Color | undefined;
  outlined?: boolean | undefined;
  size?: Sizing | undefined;
  variant?: ColorVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"button">, keyof RootParams | "className">
  & RootParams
  & {
    asChild?: boolean | undefined;
    className?: ClassName;
  };

export default function SuiButtonRoot(props: RootProps) {
  const {
    size = "md",
    color = "blue",
    asChild,
    variant = "solid",
    disabled = false,
    outlined = false,
    className,
    ...otherRootProps
  } = props;
  const Button = asChild ? Slot : "button";

  return (
    <Context
      value={React.useMemo(
        () => ({
          size,
          color,
          variant,
          disabled,
          outlined,
        }),
        [
          size,
          color,
          variant,
          disabled,
          outlined,
        ],
      )}
    >
      <Button
        {...otherRootProps}
        disabled={disabled}
        className={clsx(
          className,
          I,
          `${I}-size-${size}`,
          `${I}-color-${color}`,
          `${I}-variant-${variant}`,
          outlined && `${I}-outlined`,
          disabled && classes.disabled,
        )}
      />
    </Context>
  );
}
