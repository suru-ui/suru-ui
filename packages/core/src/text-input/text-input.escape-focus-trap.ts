import * as React from "react";
import useElementRef from "../utils/use-element-ref";

export type TextInputEscapeFocusTrapArgs = Readonly<{
  disabled: boolean | undefined;
}>;

export type TextInputEscapeFocusTrapProps = Readonly<
  {
    className: string;
  } | {
    className: string;
    ref: React.RefCallback<any>;
  }
>;

export interface GetTextInputEscapeFocusTrapProps {
  (args: TextInputEscapeFocusTrapArgs): TextInputEscapeFocusTrapProps;
}

export default function useGetTextInputEscapeFocusTrapProps(
  args: Readonly<{
    escapeTargets: Set<Element>;
  }>,
): GetTextInputEscapeFocusTrapProps {
  const { escapeTargets } = args;
  const [ref, props] = useElementRef();

  React.useEffect(
    (): void | (() => void) => {
      const elem = ref.current;
      if (!elem) {
        return;
      }

      escapeTargets.add(elem);

      return () => {
        escapeTargets.delete(elem);
      };
    },
    [
      escapeTargets,
      ref,
    ],
  );

  return React.useCallback(
    args => {
      const { disabled } = args;
      if (disabled) {
        return {
          className: "sui-text_input_escape_focus_trap",
        };
      }

      return {
        ...props,
        className: `${props.className} sui-text_input_escape_focus_trap`,
      };
    },
    [props],
  );
}
