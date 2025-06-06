import { useTextInputApi } from "@suru-ui/core";
import { Slot } from "@suru-ui/slot";
import { useMergeProps } from "@suru-ui/utils";
import * as React from "react";
import type { Color, Sizing } from "../theme";
import Context from "./text-input.context";

export type RootArgs = {
  asChild?: boolean | undefined;
  color?: Color | undefined;
  size?: Sizing | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"div">, keyof RootArgs>
  & RootArgs;

export default function SuiTextInputRoot(props: RootProps): React.ReactElement {
  const {
    size = "md",
    color = "blue",
    asChild,
    onClick,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "div";
  const {
    getRootProps,
    getInputProps,
    getEscapeFocusTrapProps,
  } = useTextInputApi();
  const apiRootProps = getRootProps({ onClick });

  return (
    <Context
      value={React.useMemo(
        () => ({
          getInputProps,
          getEscapeFocusTrapProps,
        }),
        [
          getEscapeFocusTrapProps,
          getInputProps,
        ],
      )}
    >
      <Comp
        {...useMergeProps(
          apiRootProps,
          { className: `sui-text_input-size_${size} sui-text_input-color_${color}` },
          otherRootProps as {},
        )}
      />
    </Context>
  );
}
