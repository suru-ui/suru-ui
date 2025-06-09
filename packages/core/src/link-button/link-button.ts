import * as React from "react";
import useGetLinkButtonRootProps, { type GetLinkButtonRootProps } from "./link-button.root";

export type LinkButtonApi = Readonly<{
  getRootProps: GetLinkButtonRootProps;
}>;

export type UseLinkButtonApiArgs = void;

export default function useLinkButtonApi(_: UseLinkButtonApiArgs): LinkButtonApi {
  const getRootProps = useGetLinkButtonRootProps();

  return React.useMemo(() => ({ getRootProps }), [getRootProps]);
}
