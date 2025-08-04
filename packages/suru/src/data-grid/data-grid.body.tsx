import { Slot } from "@suru-ui/slot";
import type * as React from "react";
import { useMergeProps } from "../utils";

export type BodyProps = React.ComponentProps<"div"> & {
  asChild?: boolean | undefined;
};

export default function SuiDataGridBody(props: BodyProps): React.ReactElement {
  const {
    asChild,
    ...otherBodyProps
  } = props;
  const Comp = asChild ? Slot as never : "div";

  return <Comp {...useMergeProps({ className: "sui-data_grid-body" }, otherBodyProps)} />;
}
