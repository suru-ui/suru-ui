import { Slot } from "@suru-ui/slot";
import type { ClassName } from "@suru-ui/styled";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { useContext } from "./button.context";

const I = "SuiButtonSection";

export type SectionProps = Omit<React.ComponentProps<"span">, "className"> & {
  asChild?: boolean | undefined;
  className?: ClassName;
};

export default function SuiButtonSection(props: SectionProps) {
  const {
    size,
    color,
    variant,
    disabled,
    outlined,
  } = useContext();
  const {
    asChild,
    className,
    ...otherSectionProps
  } = props;
  const Span = asChild ? Slot : "span";

  return (
    <Span
      {...otherSectionProps}
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
  );
}
