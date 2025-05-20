import useButtonApi from "@suru-ui/core/button";
import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import type { Color, ColorVariant, Sizing } from "../theme";
import classes from "../utils/classes";
import { Context } from "./button.context";

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
  & Omit<React.ComponentProps<"button">, keyof RootArgs>
  & RootArgs;

export default function SuiButtonRoot(props: RootProps): React.ReactElement {
  const {
    name,
    size = "md",
    type,
    color = "blue",
    asChild,
    loading: loadingProp,
    onClick,
    variant = "solid",
    disabled,
    outlined = false,
    className,
    "aria-disabled": ariaDisabled = !!(!disabled && loadingProp) || loadingProp,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot : "button";
  const loading = loadingProp || false;
  const api = useButtonApi();
  const apiRootProps = api.getRootProps({
    name,
    type,
    onClick,
    disabled,
    ariaDisabled,
  });

  return (
    <Context value={React.useMemo(() => ({ loading }), [loading])}>
      <Comp
        {...useMergeProps(otherRootProps as {}, apiRootProps, {
          className: clsx(
            className,
            `sui-button-size_${size}`,
            `sui-button-color_${color}`,
            `sui-button-variant_${variant}`,
            {
              [classes.loading]: loading,
              [classes.outlined]: outlined,
              "sui-button-loading": loading,
              "sui-button-outlined": outlined,
            },
          ),
        })}
      />
    </Context>
  );
}
