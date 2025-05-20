import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";
import preventDefaultHandler from "../utils/prevent-default-handler";

export type ButtonRootArgs<T extends Element = Element> = Readonly<{
  ariaDisabled: boolean | `${boolean}` | undefined;
  disabled: boolean | undefined;
  name: string | undefined;
  onClick: React.MouseEventHandler<T> | undefined;
  type: "button" | "submit" | "reset" | undefined;
}>;

export type ButtonRootProps<T extends Element = Element> = Readonly<{
  "aria-disabled": boolean | undefined;
  className: string;
  disabled: boolean | undefined;
  onClick: React.MouseEventHandler<T> | undefined;
  type: "button" | "submit" | "reset";
}>;

export interface GetButtonRootProps {
  <T extends Element>(args: ButtonRootArgs<T>): ButtonRootProps;
}

export default function useGetButtonRootProps(): GetButtonRootProps {
  return React.useCallback(
    args => {
      const {
        name,
        type = name === "__intent__" ? "submit" : "button", // conform 用
        onClick,
        disabled,
        ariaDisabled,
      } = args;

      return {
        type,
        onClick: (disabled || `${ariaDisabled}` === "true") ? preventDefaultHandler : onClick,
        disabled,
        className: clsx("sui-button", {
          [classes.disabled]: disabled,
          "sui-button-disabled": disabled,
        }),
        "aria-disabled": ariaDisabled === undefined || disabled
          ? undefined
          : `${ariaDisabled}` === "true",
      };
    },
    [],
  );
}
