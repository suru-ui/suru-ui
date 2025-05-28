import { useDetailsGroupApi } from "@suru-ui/core";
import * as React from "react";
import Context from "./details-group.context";

export type RootArgs = {
  name?: string | undefined;
  children: React.ReactNode;
};

export type RootProps = RootArgs;

export default function SuiDetailsGroupRoot(props: RootProps): React.ReactElement {
  const {
    name,
    children,
  } = props;
  const api = useDetailsGroupApi({ name });

  return <Context value={api}>{children}</Context>;
}
