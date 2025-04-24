import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { useContext } from "./button.context";

type TextParams = {
  asChild?: boolean | undefined;
};

export type TextProps =
  & Omit<React.ComponentProps<"span">, keyof TextParams>
  & TextParams;

export default function SuiButtonText(props: TextProps): React.ReactElement {
  const {
    size,
    color,
    loading,
    variant,
    disabled,
    outlined,
  } = useContext();
  const {
    asChild,
    className,
    "aria-hidden": ariaHidden = loading || undefined,
    "aria-disabled": ariaDisabled = disabled || undefined,
    ...otherTextProps
  } = props;
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      {...otherTextProps as {}}
      className={clsx(
        className,
        "SuiButtonText",
        `SuiButtonText-size-${size}`,
        `SuiButtonText-color-${color}`,
        `SuiButtonText-variant-${variant}`,
        {
          [classes.loading]: loading,
          [classes.disabled]: disabled,
          [classes.outlined]: outlined,
          "SuiButtonText-loading": loading,
          "SuiButtonText-disabled": disabled,
          "SuiButtonText-outlined": outlined,
        },
      )}
      aria-hidden={ariaHidden}
      aria-disabled={ariaDisabled}
    />
  );
}
