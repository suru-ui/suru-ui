import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { useContext } from "./button.context";

type SectionParams = {
  asChild?: boolean | undefined;
};

export type SectionProps =
  & Omit<React.ComponentProps<"span">, keyof SectionParams>
  & SectionParams;

export default function SuiButtonSection(props: SectionProps) {
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
    className,
    ...otherSectionProps
  } = props;
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      {...otherSectionProps}
      className={clsx(
        className,
        "SuiButtonSection",
        `SuiButtonSection-size-${size}`,
        `SuiButtonSection-color-${color}`,
        `SuiButtonSection-variant-${variant}`,
        {
          "SuiButtonSection-outlined": outlined,
          [classes.loading]: loading,
          [classes.disabled]: disabled,
        },
      )}
    />
  );
}
