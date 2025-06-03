import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import Context from "./details.context";

export type SummaryArgs = {
  asChild?: boolean | undefined;
};

export type SummaryProps =
  & Omit<React.ComponentProps<"summary">, keyof SummaryArgs>
  & SummaryArgs;

export default function SuiDetailsSummary(props: SummaryProps): React.ReactElement {
  const ctx = React.useContext(Context);
  assertRequiredContext("DetailsSummary", ctx);
  const {
    asChild,
    ...otherSummaryProps
  } = props;
  const Comp = asChild ? Slot as never : "summary";
  const apiSummaryProps = ctx.getSummaryProps();

  return <Comp {...useMergeProps(apiSummaryProps, otherSummaryProps as {})} />;
}
