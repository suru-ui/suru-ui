import * as React from "react";

export type DetailsGroupItemRootArgs = void;

export type DetailsGroupItemRootProps = {
  className: string;
  name: string;
};

export interface GetDetailsGroupItemRootProps {
  (args: DetailsGroupItemRootArgs): DetailsGroupItemRootProps;
}

export default function useGetDetailsGroupItemRootProps(
  args: Readonly<{
    name: string;
  }>,
): GetDetailsGroupItemRootProps {
  const { name } = args;

  return React.useCallback(
    () => ({
      name,
      className: "sui-details_group_item",
    }),
    [name],
  );
}
