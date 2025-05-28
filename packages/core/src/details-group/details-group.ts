import * as React from "react";
import useGetDetailsGroupItemRootProps, {
  type GetDetailsGroupItemRootProps,
} from "./details-group.item-root";

export type DetailsGroupApi = Readonly<{
  getDetailsGroupItemRootProps: GetDetailsGroupItemRootProps;
}>;

export type UseDetailsGroupApiArgs = Readonly<{
  name?: string | undefined;
}>;

export default function useDetailsGroupApi(
  args: UseDetailsGroupApiArgs | undefined = {},
): DetailsGroupApi {
  const defaultName = React.useId();
  const { name = defaultName } = args;
  const getDetailsGroupItemRootProps = useGetDetailsGroupItemRootProps({ name });

  return React.useMemo(() => ({ getDetailsGroupItemRootProps }), [getDetailsGroupItemRootProps]);
}
