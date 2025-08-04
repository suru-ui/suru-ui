import { Slot } from "@suru-ui/slot";
import type * as React from "react";
import { useMergeProps } from "../utils";

export type RowProps = React.ComponentProps<"div"> & {
  asChild?: boolean | undefined;
};

export default function SuiDataGridRow(props: RowProps): React.ReactElement {
  const {
    asChild,
    ...otherRowProps
  } = props;
  const Comp = asChild ? Slot as never : "div";

  return <Comp {...useMergeProps({ className: "sui-data_grid-row" }, otherRowProps)} />;
}
