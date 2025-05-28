import * as React from "react";
import Root, { type RootProps } from "./details-group.root";

export type DetailsGroupArgs = {};

export type DetailsGroupProps = RootProps;

export default function SuiDetailsGroup(props: DetailsGroupProps): React.ReactElement {
  return <Root {...props} />;
}
