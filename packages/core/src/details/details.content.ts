import * as React from "react";

export type DetailsContentArgs = void;

export type DetailsContentProps = Readonly<{
  className: string;
}>;

export interface GetDetailsContentProps {
  (args: DetailsContentArgs): DetailsContentProps;
}

export default function useGetDetailsContentProps(): GetDetailsContentProps {
  return React.useCallback(
    () => ({
      className: "sui-details_content",
    }),
    [],
  );
}
