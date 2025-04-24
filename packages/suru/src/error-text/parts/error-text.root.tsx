import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import * as primitive from "../../primitive";
import { type Color, isColor, type TypographyVariant } from "../../theme";

type RootParams = {
  asChild?: boolean | undefined;
  color?: Color | (string & {}) | primitive.PrimitiveObject | undefined | null;
  inline?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"p">, keyof RootParams>
  & RootParams;

export default function SuiErrorTextRoot(props: RootProps): React.ReactElement {
  const {
    color = "error",
    inline = false,
    asChild = false,
    variant = "std-16n-7" satisfies TypographyVariant,
    className,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      {...otherRootProps}
      className={clsx(className, "SuiErrorText", `SuiErrorText-variant-${variant}`, {
        "SuiErrorText-inline": inline,
        [`SuiErrorText-color-${color}`]: isColor(color),
      })}
      data-sui-errortext-canvastext={isColor(color) ? null : primitive.string(color)}
    />
  );
}
