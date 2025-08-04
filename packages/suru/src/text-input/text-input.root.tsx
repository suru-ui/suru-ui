import { Slot } from "@suru-ui/slot";
import * as React from "react";
import type { Color, Sizing } from "../theme";
import { useMergeProps } from "../utils";
import Context from "./text-input.context";

export type RootProps = React.ComponentProps<"div"> & {
  asChild?: boolean | undefined;
  colorScheme?: Color | undefined;
  sizing?: Sizing | undefined;
};

export default function SuiTextInputRoot(props: RootProps): React.ReactElement {
  const {
    sizing = "md",
    asChild,
    onClick,
    colorScheme = "blue",
    ...otherRootProps
  } = props;
  const Comp = asChild ? Slot as never : "div";
  const ctxValue = React.useMemo(() => ({ ignoreFocus: new Set() }), []);
  const handleClick = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(
    evt => {
      onClick?.(evt);
      if (
        evt.defaultPrevented
        || ctxValue.ignoreFocus.has(evt.target)
        || !(evt.currentTarget instanceof Element)
      ) {
        return;
      }

      const inputs = evt.currentTarget.getElementsByClassName("sui-text_input-input");
      if (inputs.length !== 1) {
        return;
      }

      const input = inputs.item(0);
      if (
        input instanceof HTMLInputElement
        && !input.readOnly
        && !input.disabled
        && !input.classList.contains("sui-text_input-input-disabled")
        && !input.classList.contains("sui-disabled")
        && input.ariaDisabled !== "true"
      ) {
        input.focus();
      }
    },
    [onClick],
  );

  return (
    <Context value={ctxValue}>
      <Comp
        {...useMergeProps(
          {
            onClick: handleClick,
            className:
              `sui-text_input sui-text_input-size_${sizing} sui-text_input-color_${colorScheme}`,
          },
          otherRootProps,
        )}
      />
    </Context>
  );
}
