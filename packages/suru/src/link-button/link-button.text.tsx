import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import Context from "./link-button.context";

export type TextArgs = {
  asChild?: boolean | undefined;
};

export type TextProps =
  & Omit<React.ComponentProps<"span">, keyof TextArgs>
  & TextArgs;

export default function SuiLinkButtonText(props: TextProps): React.ReactElement {
  const ctx = React.use(Context);
  assertRequiredContext("LinkButtonText", ctx);
  const { loading } = ctx;
  const {
    asChild,
    className,
    "aria-hidden": ariaHidden = loading || undefined,
    ...otherTextProps
  } = props;
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      {...otherTextProps as {}}
      className={clsx(className, "sui-link_button_text")}
      aria-hidden={ariaHidden}
    />
  );
}
