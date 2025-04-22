import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { useContext } from "./select.context";

type ButtonParams = {
  asChild?: boolean | undefined;
};

export type ButtonProps =
  & Omit<React.ComponentProps<"button">, keyof ButtonParams | "type">
  & ButtonParams;

export default function SuiSelectButton(props: ButtonProps): React.ReactElement {
  const {
    size,
    color,
    fieldId,
    invalid,
    disabled: defaultDisabled,
    required,
  } = useContext();
  const {
    asChild,
    disabled = defaultDisabled,
    className,
    popoverTarget = `${fieldId}-listbox`,
    ...otherButtonProps
  } = props;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      {...otherButtonProps}
      type="button"
      disabled={disabled}
      className={clsx(
        className,
        "SuiSelectButton",
        `SuiSelectButton-size-${size}`,
        `SuiSelectButton-color-${color}`,
        {
          [classes.invalid]: invalid,
          [classes.disabled]: disabled,
          [classes.required]: required,
        },
      )}
      popoverTarget={popoverTarget}
    />
  );
}
