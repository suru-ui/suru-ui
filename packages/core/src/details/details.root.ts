import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";
import useControlledState from "../utils/use-controlled-state";
import useRequestSetState from "../utils/use-request-set-state";

export type DetailsRootArgs = void;

export interface DetailsRootElement {
  readonly addEventListener: {
    (type: string, listener: (this: { readonly open: boolean }) => void): void;
  };
  readonly removeEventListener: {
    (type: string, listener: (this: { readonly open: boolean }) => void): void;
  };
}

export type DetailsRootProps = {
  className: string;
  open: boolean;
  ref: React.RefCallback<DetailsRootElement | null>;
};

export interface GetDetailsRootProps {
  (args: DetailsRootArgs): DetailsRootProps;
}

export interface OpenChangeHandler {
  (open: boolean): void;
}

export default function useGetDetailsRootProps(
  args: Readonly<{
    defaultOpen: boolean | undefined;
    onOpenChange: OpenChangeHandler | undefined;
    open: boolean | undefined;
  }>,
): GetDetailsRootProps {
  const {
    open: initialOpen,
    defaultOpen = false,
    onOpenChange,
  } = args;
  const [open, setOpen] = useControlledState({
    onChange: onOpenChange,
    initialValue: defaultOpen,
    controlledValue: initialOpen,
  });
  const reqOpen = useRequestSetState(setOpen);
  const rootRef = React.useCallback<DetailsRootProps["ref"]>(
    el => {
      if (!el) {
        return;
      }

      function handleToggleEvent(this: { readonly open: boolean }) {
        reqOpen(this.open);
      }

      el.addEventListener("toggle", handleToggleEvent);

      return () => {
        el.removeEventListener("toggle", handleToggleEvent);
      };
    },
    [reqOpen],
  );

  return React.useCallback(
    () => ({
      ref: rootRef,
      open,
      className: clsx("sui-details", {
        [classes.open]: open,
        "sui-details-open": open,
      }),
    }),
    [
      open,
      rootRef,
    ],
  );
}
