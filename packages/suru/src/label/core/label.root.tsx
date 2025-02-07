import { styled } from "@suru-ui/styled";
import { cssEscape } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import * as primitive from "../../primitive";
import { $, type Color, isColor, type TypographyVariant } from "../../theme";

type Css = {
  htmlFor: string | undefined;
};

const Label = /* @__PURE__ */ styled.label<Css>`${css => {
  if (css.htmlFor === undefined) {
    return "";
  }

  const htmlFor = `${cssEscape(css.htmlFor)}`;
  const disabled = [
    ":disabled",
    "[aria-disabled=true]",
    `.${classes.disabled}`,
  ];
  const disabledField = `#${htmlFor}:is(${disabled})`;

  return `&:has(${disabledField}, ~ :is(${disabledField}, :has(${disabledField}))) {
    color: ${$.sui.canvasText.disabled} !important;
    cursor: not-allowed !important;
  }`;
}}`;

type RootParams = {
  color?: Color | (string & {}) | primitive.PrimitiveObject | undefined | null;
  disabled?: boolean | undefined;
  inline?: boolean | undefined;
  variant?: TypographyVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<typeof Label>, keyof RootParams | "css">
  & RootParams;

export default function SuiLabelRoot(props: RootProps): React.ReactElement {
  const {
    color = $.sui.canvasText.subtle,
    inline = false,
    htmlFor,
    variant = "std-16n-7" satisfies TypographyVariant,
    disabled = false,
    className,
    "aria-disabled": ariaDisabled = disabled,
    ...otherRootProps
  } = props;

  return (
    <Label
      {...otherRootProps}
      css={{ htmlFor }}
      htmlFor={htmlFor}
      className={clsx(className, "SuiLabel", `SuiLabel-variant-${variant}`, {
        "SuiLabel-inline": inline,
        [classes.disabled]: disabled,
        [`SuiLabel-color-${color}`]: isColor(color),
      })}
      aria-disabled={ariaDisabled}
      data-sui-label-canvastext={isColor(color) ? undefined : primitive.string(color)}
    />
  );
}
