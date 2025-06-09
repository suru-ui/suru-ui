import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";

export type SectionArgs = {
  asChild?: boolean | undefined;
};

export type SectionProps =
  & Omit<React.ComponentProps<"span">, keyof SectionArgs>
  & SectionArgs;

export default function SuiLinkButtonSection(props: SectionProps): React.ReactElement {
  const {
    asChild,
    className,
    "aria-hidden": ariaHidden = true,
    ...otherTextProps
  } = props;
  const Comp = asChild ? Slot as never : "span";

  return (
    <Comp
      {...otherTextProps as {}}
      className={clsx(className, "sui-link_button_section")}
      aria-hidden={ariaHidden}
    />
  );
}
