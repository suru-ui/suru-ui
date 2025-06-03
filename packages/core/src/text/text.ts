import * as React from "react";
import useGetTextRootProps, { type GetTextRootProps } from "./text.root";

export type TextApi = Readonly<{
  getRootProps: GetTextRootProps;
}>;

export type UseTextApiArgs = void;

export default function useTextApi(_: UseTextApiArgs): TextApi {
  const getRootProps = useGetTextRootProps();

  return React.useMemo(() => ({ getRootProps }), [getRootProps]);
}
