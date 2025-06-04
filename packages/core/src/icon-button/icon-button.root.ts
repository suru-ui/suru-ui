import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";
import preventDefaultHandler from "../utils/prevent-default-handler";

export type IconButtonRootArgs<T extends Element = Element> = Readonly<{
  ariaDisabled: boolean | `${boolean}` | undefined;
  disabled: boolean | undefined;
  name: string | undefined;
  onClick: React.MouseEventHandler<T> | undefined;
  type: "button" | "submit" | "reset" | undefined;
}>;

export type IconButtonRootProps<T extends Element = Element> = Readonly<{
  "aria-disabled": boolean | undefined;
  className: string;
  disabled: boolean | undefined;
  onClick: React.MouseEventHandler<T> | undefined;
  type: "button" | "submit" | "reset";
}>;

export interface GetIconButtonRootProps {
  <T extends Element>(args: IconButtonRootArgs<T>): IconButtonRootProps;
}

export default function useGetIconButtonRootProps(): GetIconButtonRootProps {
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
        className: clsx("sui-icon_button", {
          [classes.disabled]: disabled,
          "sui-icon_button-disabled": disabled,
        }),
        "aria-disabled": ariaDisabled === undefined || disabled
          ? undefined
          : `${ariaDisabled}` === "true",
      };
    },
    [],
  );
}
