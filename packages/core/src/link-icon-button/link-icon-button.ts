import * as React from "react";
import useGetLinkIconButtonRootProps, {
  type GetLinkIconButtonRootProps,
} from "./link-icon-button.root";

export type LinkIconButtonApi = Readonly<{
  getRootProps: GetLinkIconButtonRootProps;
}>;

export type UseLinkIconButtonApiArgs = void;

export default function useLinkIconButtonApi(_: UseLinkIconButtonApiArgs): LinkIconButtonApi {
  const getRootProps = useGetLinkIconButtonRootProps();

  return React.useMemo(() => ({ getRootProps }), [getRootProps]);
}
