import clsx from "clsx";
import * as React from "react";
import classes from "../utils/classes";
import useControlledState from "../utils/use-controlled-state";
import useUpdateState from "../utils/use-update-state";

export type DetailsRootArgs = void;

export type DetailsRootProps = Readonly<{
  className: string;
  open: boolean;
  ref: React.RefCallback<HTMLDetailsElement | null>;
}>;

export interface GetDetailsRootProps {
  (args: DetailsRootArgs): DetailsRootProps;
}

export interface DetailsOpenChangeHandler {
  (open: boolean): void;
}

export default function useGetDetailsRootProps(
  args: Readonly<{
    defaultOpen: boolean | undefined;
    onOpenChange: DetailsOpenChangeHandler | undefined;
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
  const updateOpen = useUpdateState(setOpen);
  const rootRef = React.useCallback<DetailsRootProps["ref"]>(
    el => {
      if (!el) {
        return;
      }

      function handleToggleEvent(this: HTMLDetailsElement) {
        updateOpen(this.open);
      }

      el.addEventListener("toggle", handleToggleEvent);

      return () => {
        el.removeEventListener("toggle", handleToggleEvent);
      };
    },
    [updateOpen],
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
