import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";

export type AdornmentProps = React.ComponentProps<"span"> & {
  asChild?: boolean | undefined;
};

export default function SuiButtonAdornment(props: AdornmentProps): React.ReactElement {
  const {
    asChild,
    className,
    "aria-hidden": ariaHidden = true,
    ...otherTextProps
  } = props;
  const Comp = asChild ? Slot as never : "span";

  return (
    <Comp
      {...otherTextProps}
      className={clsx(className, "sui-button-adornment")}
      aria-hidden={ariaHidden}
    />
  );
}
