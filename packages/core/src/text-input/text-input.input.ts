import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";

export type TextInputInputArgs = Readonly<{
  ariaDisabled: boolean | `${boolean}` | undefined;
  disabled: boolean | undefined;
  type: React.HTMLInputTypeAttribute | undefined;
}>;

export type TextInputInputProps = Readonly<{
  "aria-disabled": boolean | undefined;
  className: string;
  disabled: boolean | undefined;
  type: React.HTMLInputTypeAttribute;
}>;

export interface GetTextInputInputProps {
  (args: TextInputInputArgs): TextInputInputProps;
}

export default function useGetTextInputInputProps(): GetTextInputInputProps {
  return React.useCallback(
    args => {
      const {
        type = "text",
        disabled,
        ariaDisabled,
      } = args;

      return {
        type,
        disabled,
        className: clsx("sui-text_input_input", {
          [classes.disabled]: disabled,
          "sui-text_input_input-disabled": disabled,
        }),
        "aria-disabled": ariaDisabled === undefined || disabled
          ? undefined
          : `${ariaDisabled}` === "true",
      };
    },
    [],
  );
}
