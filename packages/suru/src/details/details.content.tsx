import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import { Context } from "./details.context";

export type DetailsArgs = {
  asChild?: boolean | undefined;
};

export type DetailsProps =
  & Omit<React.ComponentProps<"div">, keyof DetailsArgs>
  & DetailsArgs;

export default function SuiDetailsContent(props: DetailsProps): React.ReactElement {
  const ctx = React.useContext(Context);
  assertRequiredContext("DetailsContent", ctx);
  const {
    asChild,
    ...otherContentProps
  } = props;
  const Comp = asChild ? Slot as never : "div";
  const apiContentProps = ctx.getContentProps();

  return <Comp {...useMergeProps(otherContentProps as {}, apiContentProps)} />;
}
