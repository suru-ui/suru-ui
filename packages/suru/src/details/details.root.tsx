import { useDetailsApi } from "@suru-ui/core";
import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import GroupContext from "../details-group/details-group.context";
import type { Sizing } from "../theme";
import { Context } from "./details.context";

export type RootArgs = {
  asChild?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  radius?: Sizing | null | undefined;
  size?: Sizing | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"details">, keyof RootArgs>
  & RootArgs;

export default function SuiDetailsRoot(props: RootProps): React.ReactElement {
  const ctx = React.use(GroupContext);
  const {
    open,
    size = "md",
    radius = size,
    asChild,
    defaultOpen,
    onOpenChange,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "details";
  const {
    getRootProps,
    getContentProps,
    getSummaryProps,
  } = useDetailsApi({
    open,
    defaultOpen,
    onOpenChange,
  });
  const { getDetailsGroupItemRootProps } = ctx || {};
  const apiGroupItemProps = getDetailsGroupItemRootProps?.();
  const apiRootProps = getRootProps();
  const { open: isOpen } = apiRootProps;

  return (
    <Context
      value={React.useMemo(
        () => ({
          isOpen,
          getContentProps,
          getSummaryProps,
        }),
        [
          isOpen,
          getContentProps,
          getSummaryProps,
        ],
      )}
    >
      <Comp
        {...useMergeProps(
          apiRootProps,
          {
            className: clsx(`sui-details-size_${size}`, {
              [`sui-details-radius_${radius}`]: radius !== null,
            }),
          },
          apiGroupItemProps,
          otherRootProps as {},
        )}
      />
    </Context>
  );
}
