import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import type { Color, Sizing } from "../../theme";
import { Context } from "./text-input.context";

type RootParams = {
  asChild?: boolean | undefined;
  color?: Color | undefined;
  fullWidth?: boolean | undefined;
  size?: Sizing | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"div">, keyof RootParams>
  & RootParams;

export default function SuiTextInputRoot(props: RootProps): React.ReactElement {
  const {
    size = "md",
    color = "blue",
    asChild,
    className,
    fullWidth = false,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot : "div";
  const [{
    invalid,
    disabled,
    required,
  }, setInputProps] = React.useState<{
    invalid: "false" | "true" | "grammar" | "spelling" | undefined;
    disabled: boolean;
    required: boolean;
  }>({
    invalid: undefined,
    disabled: false,
    required: false,
  });

  return (
    <Context
      value={React.useMemo(
        () => ({
          size,
          color,
          invalid,
          disabled,
          required,
          fullWidth,
          setInputProps,
        }),
        [
          size,
          color,
          invalid,
          disabled,
          required,
          fullWidth,
        ],
      )}
    >
      <Comp
        {...otherRootProps}
        className={clsx(
          className,
          "SuiTextInput",
          `SuiTextInput-size-${size}`,
          `SuiTextInput-color-${color}`,
          {
            [classes.invalid]: invalid,
            [classes.disabled]: disabled,
            [classes.required]: required,
            [classes.fullWidth]: fullWidth,
            "SuiTextInput-invalid": invalid,
            "SuiTextInput-disabled": disabled,
            "SuiTextInput-required": required,
            "SuiTextInput-fullWidth": fullWidth,
          },
        )}
      />
    </Context>
  );
}
