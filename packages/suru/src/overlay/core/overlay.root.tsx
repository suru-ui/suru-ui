import { Slot } from "@suru-ui/slot";
import type { ClassName } from "@suru-ui/styled";
import clsx from "clsx";
import * as React from "react";

const I = "SuiOverlay";

export type RootProps = Omit<React.ComponentProps<"span">, "className"> & {
  asChild?: boolean | undefined;
  className?: ClassName;
};

export default function SuiOverlayRoot(props: RootProps) {
  const {
    asChild,
    className,
    ...otherRootProps
  } = props;
  const Span = asChild ? Slot : "span";

  return (
    <Span
      {...otherRootProps}
      className={clsx(className, I)}
    />
  );
}
