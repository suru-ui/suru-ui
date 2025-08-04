import { Slot } from "@suru-ui/slot";
import clsx from "clsx";
import * as React from "react";
import { classes, useElementRef, useMergeProps } from "../utils";
import Context from "./text-input.context";

export type EscapeFocusTrapProps = {
  children: React.ReactNode;
  disabled?: boolean | undefined;
};

export default function SuiTextInputEscapeFocusTrap(
  props: EscapeFocusTrapProps,
): React.ReactElement {
  const ctx = React.use(Context);
  if (!ctx) {
    throw new Error(
      "suru-ui(suru/TextInput): Context の値が `undefined` でした。"
        + "<TextInput.Root /> で囲う必要があります。",
    );
  }

  const { ignoreFocus } = ctx;
  const {
    children,
    disabled,
  } = props;
  const [ref, slotProps] = useElementRef();

  React.useEffect(
    (): void | (() => void) => {
      if (disabled) {
        return;
      }

      const elem = ref.current;
      if (!elem) {
        return;
      }

      ignoreFocus.add(elem);

      return () => {
        ignoreFocus.delete(elem);
      };
    },
    [
      disabled,
      ignoreFocus,
      ref,
    ],
  );

  return (
    <Slot
      {...useMergeProps(slotProps, {
        className: clsx("sui-text_input-escape_focus_trap", {
          "sui-text_input-escape_focus_trap-disabled": disabled,
          [classes.disabled]: disabled,
        }),
      })}
    >
      {children}
    </Slot>
  );
}
