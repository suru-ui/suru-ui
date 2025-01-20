import { styled } from "@suru-ui/styled";
import clsx from "clsx";
import * as React from "react";
import type { TypographyVariant } from "../theme";

import "./typography.css";

const I = "SuiTypography";

type DivCss = {
  color: string | undefined;
  lineClamp: number | undefined;
};

const Div = styled.div<DivCss>`
${css => css.color && `--${I}-color: ${css.color};` || null}
${css => css.lineClamp != null && `--${I}-lineClamp: ${css.lineClamp};` || null}
`;

export type RootParams = {
  color?: string | { readonly toString: () => string } | undefined;
  inline?: boolean | undefined;
  lineClamp?: DivCss["lineClamp"];
  oneline?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<typeof Div>, keyof RootParams | "css">
  & RootParams;

export default function SuiTypography(props: RootProps) {
  const {
    color,
    inline = false,
    oneline = false,
    variant = oneline ? "oln-17n-1" : "std-17n-7", // https://design.digital.go.jp/ の本文
    className,
    lineClamp: lineClampProp,
    ...otherRootProps
  } = props;
  const lineClamp = isFiniteLineClamp(lineClampProp) ? lineClampProp : undefined;

  if (__DEV__) {
    React.useEffect(
      () => {
        if (typeof lineClampProp !== "number") {
          return;
        }

        if (inline) {
          console.error(
            "suru-ui(suru/typography): "
              + "inline と lineClamp を同時に指定することはできません。"
              + "lineClamp はブロック要素でのみ使用できます。inline は適用されません。",
          );
        }

        if (oneline) {
          console.error(
            "suru-ui(suru/typography): "
              + "oneline と lineClamp を同時に指定することはできません。"
              + "oneline は適用されません。",
          );
        }

        if (
          !(Number.isSafeInteger(lineClampProp) && lineClampProp > 0)
          && !(lineClampProp === Infinity)
        ) {
          console.error(
            "suru-ui(suru/typography): "
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
    <Div
      {...otherRootProps}
      css={{
        color: color?.toString(),
        lineClamp,
      }}
      className={clsx(className, I, `${I}-${variant}`, {
        [`${I}-inline`]: inline,
        [`${I}-oneline`]: oneline,
        [`${I}-lineClamp`]: lineClamp !== undefined,
      })}
    />
  );
}

function isFiniteLineClamp(lc: number | undefined): boolean {
  return typeof lc === "number" && Number.isSafeInteger(lc) && lc > 0;
}
