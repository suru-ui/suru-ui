import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";
import { useMergeProps } from "../utils";

export type CellProps = React.ComponentProps<"div"> & {
  asChild?: boolean | undefined;
  head?: boolean | undefined;
};

export default function SuiDataGridCell(props: CellProps): React.ReactElement {
  const {
    head,
    asChild,
    ...otherCellProps
  } = props;
  const Comp = asChild ? Slot as never : "div";

  return (
    <Comp
      {...useMergeProps(
        {
          className: clsx("sui-data_grid-cell", {
            "sui-data_grid-cell-head": head,
          }),
        },
        otherCellProps,
      )}
    />
  );
}
