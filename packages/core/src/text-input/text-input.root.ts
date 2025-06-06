import * as React from "react";
import useCreateMemo from "../utils/use-create-memo";

export type TextInputRootArgs<T extends Element = Element> = Readonly<{
  onClick: React.MouseEventHandler<T> | undefined;
}>;

export type TextInputRootProps<T extends Element = Element> = Readonly<{
  className: string;
  onClick: React.MouseEventHandler<T> | undefined;
}>;

export interface GetTextInputRootProps {
  <T extends Element>(args: TextInputRootArgs<T>): TextInputRootProps;
}

export default function useGetTextInputRootProps(
  args: Readonly<{
    escapeTargets: Set<Element>;
  }>,
): GetTextInputRootProps {
  const { escapeTargets } = args;
  const createMemo = useCreateMemo();

  return React.useCallback(
    args => {
      const {
        onClick,
      } = args;
      const handleClick = createMemo<React.MouseEventHandler<any>>(
        () => evt => {
          onClick?.(evt);
          if (evt.defaultPrevented) {
            return;
          }

          if (
            evt.defaultPrevented
            || escapeTargets.has(evt.target as Element)
            || !(evt.currentTarget instanceof Element)
          ) {
            return;
          }

          const input = evt.currentTarget.getElementsByClassName("sui-text_input_input").item(0);
          if (
            input instanceof HTMLInputElement
            && !input.readOnly
            && !input.disabled
            && !input.classList.contains("sui-text_input_input-disabled")
            && input.ariaDisabled !== "true"
          ) {
            input.focus();
          }
        },
        [onClick],
      );

      return {
        onClick: handleClick,
        className: "sui-text_input",
      };
    },
    [escapeTargets],
  );
}
