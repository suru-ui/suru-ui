import { styled, STYLED_SELECTOR } from "@suru-ui/styled";
import clsx from "clsx";
import type * as React from "react";
import { $, type TypographyVariant } from "../theme";
import { classes, cssEscape, useMergeProps } from "../utils";

type LabelCss = {
  htmlFor: string | undefined;
};

const Label = styled.label<LabelCss>(css => {
  if (typeof css.htmlFor === "string") {
    const fieldId = "#" + cssEscape(css.htmlFor);
    return css`
      @layer sui.overwrite {
        body:has(${fieldId}[required]:not(:disabled)) ${STYLED_SELECTOR} .sui-label-indicator {
          display: inline-block;
        }
      }

      body:has(${fieldId}:is(:disabled, ${"." + classes.disabled})) ${STYLED_SELECTOR} {
        color: ${$.sui.canvastext.disabled} !important;
        cursor: not-allowed !important;
        user-select: none !important;
      }
    `;
  } else {
    return css`
      @layer sui.overwrite {
        ${STYLED_SELECTOR}:has([required]:not(:disabled)) .sui-label-indicator {
          display: inline-block;
        }
      }

      ${STYLED_SELECTOR}:has(:disabled, ${"." + classes.disabled}) {
        color: ${$.sui.canvastext.disabled} !important;
        cursor: not-allowed !important;
        user-select: none !important;
      }
    `;
  }
});
Label.componentName = "label-root";

export type RootProps = React.ComponentProps<"label"> & {
  asChild?: boolean | undefined;
  lineClamp?: number | undefined;
  multiline?: boolean | undefined;
  numeric?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export default function SuiLabelRoot(props: RootProps): React.ReactElement {
  const {
    htmlFor,
    numeric,
    multiline: multilineProp = false,
    variant = !multilineProp ? "oln-16b-1" : "std-16b-7",
    lineClamp: lineClampProp,
    ...otherRootProps
  } = props;
  let oneline: boolean;
  let lineClamp: number | undefined;
  if (!multilineProp) {
    oneline = true;
    lineClamp = undefined;
    if (__DEV__) {
      if (lineClampProp !== undefined) {
        console.error(
          "suru-ui(suru/Label): 1 行表示 (multiline=false) と 複数表示"
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
          `suru-ui(suru/Label): 範囲外の lineClamp (${lineClampProp}) が指定されました。`,
        );
      }
    }
  }

  return (
    <Label
      {...useMergeProps(
        {
          htmlFor,
          className: clsx(
            "sui-label",
            `sui-label-style_${variant.split("-")[0]}`,
            `sui-label-variant_${variant.replaceAll("-", "")}`,
            {
              "sui-label-numeric": numeric,
              "sui-label-oneline": oneline,
              "sui-label-lineclamp": lineClamp !== undefined,
            },
          ),
          "data-sui-label-lineclamp": lineClamp,
        },
        otherRootProps,
      )}
      css={{
        htmlFor,
      }}
    />
  );
}
