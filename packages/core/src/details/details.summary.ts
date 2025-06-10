import * as React from "react";

export type DetailsSummaryArgs = void;

export type DetailsSummaryProps = Readonly<{
  className: string;
}>;

export interface GetDetailsSummaryProps {
  (args: DetailsSummaryArgs): DetailsSummaryProps;
}

export default function useGetDetailsSummaryProps(): GetDetailsSummaryProps {
  return React.useCallback(
    () => ({
      className: "sui-details_summary",
    }),
    [],
  );
}
