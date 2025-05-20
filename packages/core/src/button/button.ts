import * as React from "react";
import useGetButtonRootProps, { type GetButtonRootProps } from "./button.root";

export type ButtonApi = Readonly<{
  getRootProps: GetButtonRootProps;
}>;

export type UseButtonApiArgs = void;

export default function useButtonApi(_: UseButtonApiArgs): ButtonApi {
  const getRootProps = useGetButtonRootProps();

  return React.useMemo(() => ({ getRootProps }), [getRootProps]);
}
