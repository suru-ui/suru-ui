import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { useContext } from "./text-input.context";

type SectionParams = {
  asChild?: boolean | undefined;
};

export type SectionProps =
  & Omit<React.ComponentProps<"span">, keyof SectionParams>
  & SectionParams;

export default function SuiTextInputSection(props: SectionProps): React.ReactElement {
  const {
    size,
    color,
    invalid,
    disabled,
    required,
    fullWidth,
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
        "SuiTextInputSection",
        `SuiTextInputSection-size-${size}`,
        `SuiTextInputSection-color-${color}`,
        {
          "SuiTextInputSection-fullWidth": fullWidth,
          "SuiTextInputSection-invalid": invalid,
          "SuiTextInputSection-required": required,
          [classes.disabled]: disabled,
        },
      )}
    />
  );
}
