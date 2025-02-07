import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import * as primitive from "../../primitive";
import type { TypographyVariant } from "../../theme";

type RootParams = {
  asChild?: boolean | undefined;
  color?: primitive.PrimitiveObject | undefined;
  inline?: boolean | undefined;
  lineClamp?: number | undefined;
  oneline?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"p">, keyof RootParams>
  & RootParams;

export default function SuiTextRoot(props: RootProps): React.ReactElement {
  const {
    color,
    inline = false,
    asChild = false,
    oneline = false,
    variant = (oneline ? "oln-17n-1" : "std-17n-7") satisfies TypographyVariant, // https://design.digital.go.jp/ の本文
    className,
    lineClamp: lineClampProp,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot : "p";
  const lineClamp = isFiniteLineClamp(lineClampProp) ? lineClampProp : undefined;

  if (__DEV__) {
    React.useEffect(
      () => {
        if (typeof lineClampProp !== "number") {
          return;
        }

        if (inline) {
          console.error(
            "suru-ui(suru/text): "
              + "inline と lineClamp を同時に指定することはできません。"
              + "lineClamp はブロック要素でのみ使用できます。inline は適用されません。",
          );
        }

        if (oneline) {
          console.error(
            "suru-ui(suru/text): "
              + "oneline と lineClamp を同時に指定することはできません。"
              + "oneline は適用されません。",
          );
        }

        if (
          !(Number.isSafeInteger(lineClampProp) && lineClampProp > 0)
          && !(lineClampProp === Infinity)
        ) {
          console.error(
            "suru-ui(suru/text): "
              + "lineClamp には正の整数または Infinity を指定してください。",
          );
        }
      },
      [
        inline,
        oneline,
        lineClampProp,
      ],
    );
  }

  return (
    <Comp
      {...otherRootProps}
      className={clsx(className, "SuiText", `SuiText-variant-${variant}`, {
        "SuiText-inline": inline,
        "SuiText-oneline": oneline,
        "SuiText-lineClamp": lineClamp !== undefined,
      })}
      data-sui-text-lineclamp={lineClamp}
      data-sui-text-canvastext={primitive.string(color)}
    />
  );
}

function isFiniteLineClamp(lc: number | undefined): boolean {
  return typeof lc === "number" && Number.isSafeInteger(lc) && lc > 0;
}
