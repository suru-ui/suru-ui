import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import type * as React from "react";
import type { Sizing } from "../theme";
import { useMergeProps } from "../utils";

export type RootProps = React.ComponentProps<"div"> & {
  nCols: number;
  asChild?: boolean | undefined;
  dense?: boolean | undefined;
  sizing?: Sizing | undefined;
  stripe?: boolean | undefined;
};

export default function SuiDataGridRoot(props: RootProps): React.ReactElement {
  const {
    dense,
    nCols,
    sizing = "md",
    stripe,
    asChild,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "div";

  return (
    <Comp
      {...useMergeProps(
        {
          className: clsx(
            "sui-data_grid",
            `sui-data_grid-size_${sizing}`,
            {
              "sui-data_grid-dense": dense,
              "sui-data_grid-stripe": stripe,
            },
          ),
          "data-sui-data-grid-ncols": nCols,
        },
        otherRootProps,
      )}
    />
  );
}
