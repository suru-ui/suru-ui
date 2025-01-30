import { Slot } from "@suru-ui/slot";
import type { ClassName } from "@suru-ui/styled";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import type { Sizing, TypographyVariant } from "../../theme";
import Typography from "../../typography";
import { useContext } from "./button.context";

const I = "SuiButtonText";

export type TextProps = Omit<React.ComponentProps<"span">, "className"> & {
  asChild?: boolean | undefined;
  className?: ClassName;
  variant?: TypographyVariant | undefined;
};

export default function SuiButtonText(props: TextProps) {
  const {
    size,
    color,
    variant,
    disabled,
    outlined,
  } = useContext();
  const {
    asChild,
    variant: typographyVariant = getDefaultTypographyVariant(size),
    children,
    className,
    ...otherTextProps
  } = props;
  const Span = asChild ? Slot : "span";

  return (
    <Typography
      {...otherTextProps as {}}
      color={null}
      asChild
      oneline
      variant={typographyVariant}
      className={clsx(
        className,
        I,
        `${I}-size-${size}`,
        `${I}-color-${color}`,
        `${I}-variant-${variant}`,
        outlined && `${I}-outlined`,
        disabled && classes.disabled,
      )}
    >
      <Span>
        {children}
      </Span>
    </Typography>
  );
}

function getDefaultTypographyVariant(size: Sizing): TypographyVariant {
  switch (size) {
    case "md":
    case "lg":
      return "oln-17m-1";

    case "sm":
      return "oln-16n-1";
  }
}
