import * as React from "react";
import useGetContentProps, { type GetDetailsContentProps } from "./details.content";
import useGetRootProps, {
  type DetailsOpenChangeHandler,
  type GetDetailsRootProps,
} from "./details.root";
import useGetSummaryProps, { type GetDetailsSummaryProps } from "./details.summary";

export type DetailsApi = Readonly<{
  getRootProps: GetDetailsRootProps;
  getContentProps: GetDetailsContentProps;
  getSummaryProps: GetDetailsSummaryProps;
}>;

export type UseDetailsApiArgs = Readonly<{
  open: boolean | undefined;
  defaultOpen: boolean | undefined;
  onOpenChange: DetailsOpenChangeHandler | undefined;
}>;

export default function useDetailsApi(args: UseDetailsApiArgs): DetailsApi {
  const getRootProps = useGetRootProps(args);
  const getContentProps = useGetContentProps();
  const getSummaryProps = useGetSummaryProps();

  return React.useMemo(
    () => ({
      getRootProps,
      getContentProps,
      getSummaryProps,
    }),
    [
      getRootProps,
      getContentProps,
      getSummaryProps,
    ],
  );
}
