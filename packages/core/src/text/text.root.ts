import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";

export type TextRootArgs = Readonly<{
  ariaDisabled: boolean | `${boolean}` | undefined;
}>;

export type TextRootProps = Readonly<{
  "aria-disabled": boolean | undefined;
  className: string;
}>;

export interface GetTextRootProps {
  (args: TextRootArgs): TextRootProps;
}

export default function useGetTextRootProps(): GetTextRootProps {
  return React.useCallback(
    args => {
      const {
        ariaDisabled: ariaDisabledArg,
      } = args;
      const ariaDisabled = ariaDisabledArg === undefined
        ? undefined
        : `${ariaDisabledArg}` === "true";

      return {
        "aria-disabled": ariaDisabled,
        className: clsx("sui-text", {
          [classes.disabled]: ariaDisabled,
          "sui-text-disabled": ariaDisabled,
        }),
      };
    },
    [],
  );
}
