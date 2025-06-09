import { useLinkIconButtonApi } from "@suru-ui/core";
import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import type { Color, ColorVariant, Sizing } from "../theme";
import classes from "../utils/classes";
import Context from "./link-icon-button.context";

export type RootArgs = {
  asChild?: boolean | undefined;
  disabled?: boolean | undefined;
  color?: Color | undefined;
  loading?: boolean | undefined;
  outlined?: boolean | undefined;
  size?: Sizing | undefined;
  variant?: ColorVariant | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"a">, keyof RootArgs>
  & RootArgs;

export default function SuiLinkIconButtonRoot(props: RootProps): React.ReactElement {
  const {
    size = "md",
    color = "blue",
    asChild,
    loading: loadingProp,
    onClick,
    variant = "solid",
    disabled,
    outlined = false,
    "aria-disabled": ariaDisabled = !!(!disabled && loadingProp) || loadingProp,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "a";
  const loading = loadingProp || false;
  const { getRootProps } = useLinkIconButtonApi();
  const apiRootProps = getRootProps({
    onClick,
    disabled,
    ariaDisabled,
  });

  return (
    <Context value={React.useMemo(() => ({ loading }), [loading])}>
      <Comp
        {...useMergeProps(
          apiRootProps,
          {
            className: clsx(
              `sui-link_icon_button-size_${size}`,
              `sui-link_icon_button-color_${color}`,
              `sui-link_icon_button-variant_${variant}`,
              {
                [classes.loading]: loading,
                [classes.outlined]: outlined,
                "sui-link_icon_button-loading": loading,
                "sui-link_icon_button-outlined": outlined,
              },
            ),
          },
          otherRootProps as {},
        )}
      />
    </Context>
  );
}
