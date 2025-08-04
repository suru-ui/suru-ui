import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";

export type TextProps = React.ComponentProps<"span"> & {
  asChild?: boolean | undefined;
};

export default function SuiButtonText(props: TextProps): React.ReactElement {
  const {
    asChild,
    className,
    ...otherTextProps
  } = props;
  const Comp = asChild ? Slot as never : "span";

  return (
    <Comp
      {...otherTextProps}
      className={clsx(className, "sui-button-text")}
    />
  );
}
