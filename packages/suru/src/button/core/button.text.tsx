import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import Text from "../../text";
import type { Sizing, TypographyVariant } from "../../theme";
import { $ } from "../../theme";
import { useContext } from "./button.context";

type TextParams = {
  asChild?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export type TextProps =
  & Omit<React.ComponentProps<"span">, keyof TextParams>
  & TextParams;

export default function SuiButtonText(props: TextProps): React.ReactElement {
  const {
    size,
    color,
    loading,
    variant,
    disabled,
    outlined,
  } = useContext();
  const {
    asChild,
    variant: textVariant = getDefaultTextVariant(size),
    children,
    className,
    ...otherTextProps
  } = props;
  const Comp = asChild ? Slot : "span";

  return (
    <Text
      {...otherTextProps as {}}
      color={$.sui[color][variant].canvasText}
      asChild
      oneline
      variant={textVariant}
      className={clsx(
        className,
        "SuiButtonText",
        `SuiButtonText-size-${size}`,
        `SuiButtonText-color-${color}`,
        `SuiButtonText-variant-${variant}`,
        {
          "SuiButtonText-outlined": outlined,
          [classes.loading]: loading,
          [classes.disabled]: disabled,
        },
      )}
    >
      <Comp>
        {children}
      </Comp>
    </Text>
  );
}

function getDefaultTextVariant(size: Sizing): TypographyVariant {
  switch (size) {
    case "md":
    case "lg":
      return "oln-17m-1";

    case "sm":
      return "oln-16n-1";
  }
}
