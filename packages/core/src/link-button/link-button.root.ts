import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";
import preventDefaultHandler from "../utils/prevent-default-handler";

export type LinkButtonRootArgs = Readonly<{
  ariaDisabled: boolean | `${boolean}` | undefined;
  disabled: boolean | undefined;
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}>;

export type LinkButtonRootProps = Readonly<{
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  // aria
  "aria-disabled": boolean | undefined;
}>;

export interface GetLinkButtonRootProps {
  (args: LinkButtonRootArgs): LinkButtonRootProps;
}

export default function useGetLinkButtonRootProps(): GetLinkButtonRootProps {
  return React.useCallback(
    (args): LinkButtonRootProps => {
      const {
        onClick,
        disabled,
        ariaDisabled,
      } = args;

      return {
        onClick: (disabled || `${ariaDisabled}` === "true") ? preventDefaultHandler : onClick,
        className: clsx("sui-link_button", {
          [classes.disabled]: disabled,
          "sui-link_button-disabled": disabled,
        }),
        "aria-disabled": ariaDisabled === undefined
          ? (disabled ? true : undefined)
          : `${ariaDisabled}` === "true",
      };
    },
    [],
  );
}
