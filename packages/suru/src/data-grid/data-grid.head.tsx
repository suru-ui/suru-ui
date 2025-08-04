import { Slot } from "@suru-ui/slot";
import type * as React from "react";
import { useMergeProps } from "../utils";

export type HeadProps = React.ComponentProps<"div"> & {
  asChild?: boolean | undefined;
};

export default function SuiDataGridHead(props: HeadProps): React.ReactElement {
  const {
    asChild,
    ...otherHeadProps
  } = props;
  const Comp = asChild ? Slot as never : "div";

  return <Comp {...useMergeProps({ className: "sui-data_grid-head" }, otherHeadProps)} />;
}
