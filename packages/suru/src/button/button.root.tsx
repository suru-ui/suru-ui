import { useButtonApi } from "@suru-ui/core";
import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import type { Color, ColorVariant, Sizing } from "../theme";
import classes from "../utils/classes";
import Context from "./button.context";

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
    "aria-disabled": ariaDisabled = !!(!disabled && loadingProp) || loadingProp,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "button";
  const loading = loadingProp || false;
  const { getRootProps } = useButtonApi();
  const apiRootProps = getRootProps({
    name,
    type,
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
            name,
            className: clsx(
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
          },
          otherRootProps as {},
        )}
      />
    </Context>
  );
}
