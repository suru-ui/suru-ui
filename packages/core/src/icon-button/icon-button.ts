import * as React from "react";
import useGetIconButtonRootProps, { type GetIconButtonRootProps } from "./icon-button.root";

export type IconButtonApi = Readonly<{
  getRootProps: GetIconButtonRootProps;
}>;

export type UseIconButtonApiArgs = void;

export default function useIconButtonApi(_: UseIconButtonApiArgs): IconButtonApi {
  const getRootProps = useGetIconButtonRootProps();

  return React.useMemo(() => ({ getRootProps }), [getRootProps]);
}
