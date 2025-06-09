import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";
import preventDefaultHandler from "../utils/prevent-default-handler";

export type LinkIconButtonRootArgs = Readonly<{
  ariaDisabled: boolean | `${boolean}` | undefined;
  disabled: boolean | undefined;
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}>;

export type LinkIconButtonRootProps = Readonly<{
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  // aria
  "aria-disabled": boolean | undefined;
}>;

export interface GetLinkIconButtonRootProps {
  (args: LinkIconButtonRootArgs): LinkIconButtonRootProps;
}

export default function useGetLinkIconButtonRootProps(): GetLinkIconButtonRootProps {
  return React.useCallback(
    (args): LinkIconButtonRootProps => {
      const {
        onClick,
        disabled,
        ariaDisabled,
      } = args;

      return {
        onClick: (disabled || `${ariaDisabled}` === "true") ? preventDefaultHandler : onClick,
        className: clsx("sui-link_icon_button", {
          [classes.disabled]: disabled,
          "sui-link_icon_button-disabled": disabled,
        }),
        "aria-disabled": ariaDisabled === undefined
          ? (disabled ? true : undefined)
          : `${ariaDisabled}` === "true",
      };
    },
    [],
  );
}
