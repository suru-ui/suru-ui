import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { useContext } from "./select.context";

type ListBoxParams = {
  asChild?: boolean | undefined;
};

export type ListBoxProps =
  & Omit<React.ComponentProps<"div">, keyof ListBoxParams>
  & ListBoxParams;

export default function SuiSelectListBox(props: ListBoxProps): React.ReactElement {
  const {
    size,
    color,
    fieldId,
    invalid,
    disabled,
    required,
  } = useContext();
  const {
    id = `${fieldId}-listbox`,
    role = "listbox",
    asChild,
    popover = "auto",
    className,
    ...otherListBoxProps
  } = props;
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      {...otherListBoxProps}
      id={id}
      role={role}
      popover={popover}
      className={clsx(
        className,
        "SuiSelectListBox",
        `SuiSelectListBox-size-${size}`,
        `SuiSelectListBox-color-${color}`,
        {
          [classes.invalid]: invalid,
          [classes.disabled]: disabled,
          [classes.required]: required,
          "SuiSelectListBox-invalid": invalid,
          "SuiSelectListBox-disabled": disabled,
          "SuiSelectListBox-required": required,
        },
      )}
    />
  );
}
