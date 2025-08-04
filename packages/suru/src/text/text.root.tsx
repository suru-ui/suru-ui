import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import type { TypographyVariant } from "../theme";
import { useMergeProps } from "../utils";

export type RootProps = React.ComponentProps<"p"> & {
  asChild?: boolean | undefined;
  lineClamp?: number | undefined;
  numeric?: boolean | undefined;
  oneline?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export default function SuiTextRoot(props: RootProps): React.ReactElement {
  const {
    asChild,
    numeric,
    oneline: onelineProp = false,
    variant = onelineProp ? "oln-16n-1" : "std-16n-7",
    lineClamp: lineClampProp,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "p";
  let oneline: boolean;
  let lineClamp: number | undefined;
  if (onelineProp) {
    oneline = true;
    lineClamp = undefined;
    if (__DEV__) {
      if (lineClampProp !== undefined) {
        console.error(
          "suru-ui(suru/Text): 1 行表示 (oneline=true) と 複数表示"
            + ` (lineClamp=${lineClampProp}) は同時に使えません。1 行表示が優先されます。`,
        );
      }
    }
  } else {
    oneline = false;
    lineClamp = lineClampProp;
    if (
      lineClampProp !== undefined
      && (!Number.isSafeInteger(lineClampProp) || lineClampProp < 1)
    ) {
      lineClamp = undefined;
      if (__DEV__) {
        console.error(
          `suru-ui(suru/Text): 範囲外の lineClamp (${lineClampProp}) が指定されました。`,
        );
      }
    }
  }

  return (
    <Comp
      {...useMergeProps(
        {
          className: clsx(
            "sui-text",
            `sui-text-style_${variant.split("-")[0]}`,
            `sui-text-variant_${variant.replaceAll("-", "")}`,
            {
              "sui-text-numeric": numeric,
              "sui-text-oneline": oneline,
              "sui-text-lineclamp": lineClamp !== undefined,
            },
          ),
          "data-sui-text-lineclamp": lineClamp,
        },
        otherRootProps,
      )}
    />
  );
}
