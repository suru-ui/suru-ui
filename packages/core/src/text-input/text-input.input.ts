import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";

export type TextInputInputArgs = Readonly<{
  disabled: boolean | undefined;
  type: React.HTMLInputTypeAttribute | undefined;
}>;

export type TextInputInputProps = Readonly<{
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
      } = args;

      return {
        type,
        disabled,
        className: clsx("sui-text_input_input", {
          [classes.disabled]: disabled,
          "sui-text_input_input-disabled": disabled,
        }),
      };
    },
    [],
  );
}
