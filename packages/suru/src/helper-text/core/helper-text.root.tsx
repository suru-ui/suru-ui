import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import * as primitive from "../../primitive";
import { $, type Color, isColor, type TypographyVariant } from "../../theme";

type RootParams = {
  asChild?: boolean | undefined;
  color?: Color | (string & {}) | primitive.PrimitiveObject | undefined | null;
  inline?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"p">, keyof RootParams>
  & RootParams;

export default function SuiHelperTextRoot(props: RootProps): React.ReactElement {
  const {
    color = $.sui.canvasText.subtle,
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
      className={clsx(className, "SuiHelperText", `SuiHelperText-variant-${variant}`, {
        "SuiHelperText-inline": inline,
        [`SuiHelperText-color-${color}`]: isColor(color),
      })}
      data-sui-helpertext-canvastext={isColor(color) ? undefined : primitive.string(color)}
    />
  );
}
