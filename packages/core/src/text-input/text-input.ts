import * as React from "react";
import useGetEscapeFocusTrapProps, {
  type GetTextInputEscapeFocusTrapProps,
} from "./text-input.escape-focus-trap";
import useGetInputProps, { type GetTextInputInputProps } from "./text-input.input";
import useGetRootProps, { type GetTextInputRootProps } from "./text-input.root";

export type TextInputApi = Readonly<{
  getRootProps: GetTextInputRootProps;
  getInputProps: GetTextInputInputProps;
  getEscapeFocusTrapProps: GetTextInputEscapeFocusTrapProps;
}>;

export type UseTextInputApiArgs = void;

export default function useTextInputApi(_: UseTextInputApiArgs): TextInputApi {
  const [escapeTargets] = React.useState(() => new Set<Element>());
  const getRootProps = useGetRootProps({ escapeTargets });
  const getInputProps = useGetInputProps();
  const getEscapeFocusTrapProps = useGetEscapeFocusTrapProps({ escapeTargets });

  return React.useMemo(
    () => ({
      getRootProps,
      getInputProps,
      getEscapeFocusTrapProps,
    }),
    [
      getRootProps,
      getInputProps,
      getEscapeFocusTrapProps,
    ],
  );
}
