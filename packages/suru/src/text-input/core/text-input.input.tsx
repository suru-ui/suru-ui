import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import Text from "../../text";
import { useContext } from "./text-input.context";

type InputParams = {
  asChild?: boolean | undefined;
};

export type InputProps =
  & Omit<React.ComponentProps<"input">, keyof InputParams>
  & InputParams;

export default function SuiTextInputInput(props: InputProps): React.ReactElement {
  const {
    size,
    color,
    invalid,
    disabled,
    required,
    fullWidth,
    setInputProps,
  } = useContext();
  const {
    asChild,
    disabled: disabledProp = false,
    required: requiredProp = false,
    className,
    "aria-invalid": ariaInvalid,
    ...otherInputProps
  } = props;
  const Comp = asChild ? Slot : "input";
  const invalidProp = ariaInvalid === undefined ? undefined : `${ariaInvalid}` as const;

  React.useEffect(
    () => {
      setInputProps({
        invalid: invalidProp,
        disabled: disabledProp,
        required: requiredProp,
      });
    },
    [
      invalidProp,
      disabledProp,
      requiredProp,
    ],
  );

  return (
    <Text
      asChild
      oneline
    >
      <Comp
        {...otherInputProps}
        disabled={disabled}
        required={required}
        className={clsx(
          className,
          "SuiTextInputInput",
          `SuiTextInputInput-size-${size}`,
          `SuiTextInputInput-color-${color}`,
          {
            "SuiTextInputInput-fullWidth": fullWidth,
            "SuiTextInputInput-invalid": invalid,
            "SuiTextInputInput-required": required,
            [classes.disabled]: disabled,
          },
        )}
        aria-invalid={invalid}
      />
    </Text>
  );
}
