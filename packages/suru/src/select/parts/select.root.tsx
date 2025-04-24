import { Slot, Slottable } from "@suru-ui/slot";
import { useImmutable } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { SelectProps } from "../../conform";
import type { Color, Sizing } from "../../theme";
import Conform from "./select.conform";
import { Context } from "./select.context";

type RootParams = {
  conform: SelectProps;

  asChild?: boolean | undefined;
  color?: Color | undefined;
  disabled?: boolean | undefined;
  selectedContentElement?: string | undefined;
  size?: Sizing | undefined;
};

export type RootProps =
  & Omit<React.ComponentProps<"div">, keyof RootParams | "aria-invalid" | "aria-describedby">
  & RootParams;

export default function SuiSelectRoot(props: RootProps): React.ReactElement {
  const {
    size = "md",
    color = "blue",
    asChild,
    conform,
    disabled = false,
    children,
    className,
    "aria-disabled": ariaDisabled,
    "aria-required": ariaRequired,
    selectedContentElement,
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot : "div";
  const {
    id: fieldId,
    form: formId,
    name: fieldName,
    multiple: multipleProp = false,
    required = false,
    defaultValue,
    "aria-invalid": invalid = false,
    "aria-describedby": ariaDescribedby,
  } = conform;
  const multiple = useImmutable(
    multipleProp,
    __DEV__ && {
      scope: "suru/select",
      value: "conform.multiple",
    },
  );

  return (
    <Context
      value={React.useMemo(
        () => ({
          size,
          color,
          formId,
          conform,
          fieldId,
          invalid,
          disabled,
          multiple,
          required,
          fieldName,
          defaultValue,
          selectedContentId: selectedContentElement,
        }),
        [
          size,
          color,
          formId,
          conform,
          fieldId,
          invalid,
          disabled,
          // multiple, 不変
          required,
          fieldName,
          defaultValue,
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
          {
            [classes.invalid]: invalid,
            [classes.disabled]: disabled,
            [classes.required]: required,
            "SuiSelect-invalid": invalid,
            "SuiSelect-disabled": disabled,
            "SuiSelect-required": required,
          },
        )}
        aria-invalid={invalid || undefined}
        aria-disabled={ariaDisabled ?? (disabled || undefined)}
        aria-required={ariaRequired ?? (required || undefined)}
        aria-describedby={ariaDescribedby}
      >
        <Slottable>{children}</Slottable>
        <Conform />
      </Comp>
    </Context>
  );
}
