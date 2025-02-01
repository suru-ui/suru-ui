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
  const [inputProps, setInputProps] = React.useState<{
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
          ...inputProps,
          size,
          color,
          fullWidth,
          setInputProps,
        }),
        [
          inputProps,
          size,
          color,
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
            "SuiTextInput-fullWidth": fullWidth,
            "SuiTextInput-invalid": inputProps.invalid,
            "SuiTextInput-required": inputProps.required,
            [classes.disabled]: inputProps.disabled,
          },
        )}
      />
    </Context>
  );
}
