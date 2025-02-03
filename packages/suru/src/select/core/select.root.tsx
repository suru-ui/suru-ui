import { Slot, Slottable } from "@suru-ui/slot";
import { useConstantValue } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import { SelectProps } from "../../conform";
import type { Color, Sizing } from "../../theme";
import Conform from "./select.conform";
import { Context, type ContextValue } from "./select.context";

type RootParams = {
  conform: SelectProps;

  asChild?: boolean | undefined;
  color?: Color | undefined;
  disabled?: boolean | undefined;
  selectedContentElement?: string | undefined;
  size?: Sizing | undefined;
};

export type RootProps =
  & Omit<
    React.ComponentProps<"div">,
    keyof RootParams | "aria-invalid" | "aria-disabled" | "aria-required" | "aria-describedby"
  >
  & RootParams;

export default function SuiSelectRoot(props: RootProps): React.ReactElement {
  const {
    size = "md",
    color = "blue",
    asChild,
    conform: conformProp,
    disabled = false,
    children,
    className,
    selectedContentElement,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot : "div";
  const conform = React.useMemo<ContextValue["conform"]>(
    () => ({
      id: conformProp.id,
      name: conformProp.name,
      form: conformProp.form,
      required: conformProp.required,
      defaultValue: conformProp.defaultValue,
    }),
    [
      conformProp.id,
      conformProp.name,
      conformProp.form,
      conformProp.required,
      conformProp.defaultValue,
    ],
  );
  const multiple = useConstantValue(!!conformProp.multiple);

  if (__DEV__) {
    React.useEffect(
      () => {
        if (multiple === !!conformProp.multiple) {
          return;
        }

        console.error("suru-ui(suru/select): multiple を変更することはできません。");
      },
      [!!conformProp.multiple],
    );
  }

  return (
    <Context
      value={React.useMemo(
        () => ({
          size,
          color,
          conform,
          disabled,
          multiple,
          selectedContentId: selectedContentElement,
        }),
        [
          size,
          color,
          conform,
          disabled,
          selectedContentElement,
        ],
      )}
    >
      <Comp
        {...otherRootProps}
        className={clsx(
          className,
          "SuiSelect",
          `SuiSelect-size-${size}`,
          `SuiSelect-color-${color}`,
        )}
        aria-invalid={conformProp["aria-invalid"]}
        aria-disabled={disabled}
        aria-required={conformProp.required}
        aria-describedby={conformProp["aria-describedby"]}
      >
        <Slottable>{children}</Slottable>
        <Conform />
      </Comp>
    </Context>
  );
}
