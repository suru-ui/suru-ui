import { Slot } from "@suru-ui/slot";
import type * as React from "react";
import { useMergeProps } from "../utils";

export type IndicatorProps = React.ComponentProps<"span"> & {
  asChild?: boolean | undefined;
};

export default function SuiLabelIndicator(props: IndicatorProps): React.ReactElement {
  const {
    asChild,
    children = "※必須",
    ...otherIndicatorProps
  } = props;
  const Comp = asChild ? Slot as never : "span";

  return (
    <Comp {...useMergeProps({ className: "sui-label-indicator" }, otherIndicatorProps)}>
      {children}
    </Comp>
  );
}
