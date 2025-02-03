import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
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
    conform,
  } = useContext();
  const {
    id = `${conform.id}-listbox`,
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
      popover={popover}
      className={clsx(
        className,
        "SuiSelectListBox",
        `SuiSelectListBox-size-${size}`,
        `SuiSelectListBox-color-${color}`,
      )}
    />
  );
}
