import { Slot, Slottable } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import { Context } from "./details.context";

export type IndicatorArgs = {
  asChild?: boolean | undefined;
  close?: React.ReactNode | undefined;
  open?: React.ReactNode | undefined;
};

export type IndicatorProps =
  & Omit<React.ComponentProps<"div">, keyof IndicatorArgs>
  & IndicatorArgs;

export default function SuiDetailsIndicator(props: IndicatorProps): React.ReactElement {
  const ctx = React.useContext(Context);
  assertRequiredContext("DetailsIndicator", ctx);
  const {
    open = <ChevronDown />,
    close = <ChevronUp />,
    asChild,
    children,
    ...otherIndicatorProps
  } = props;
  const Comp = asChild ? Slot as never : "div";

  return (
    <Comp
      {...useMergeProps(otherIndicatorProps as {}, {
        className: "sui-details_indicator",
      })}
    >
      <Slottable>{children}</Slottable>
      {ctx.isOpen ? close : open}
    </Comp>
  );
}
