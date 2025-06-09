import "./link-icon-button.css";

import * as React from "react";
import Loader from "./link-icon-button.loader";
import Root, { type RootProps } from "./link-icon-button.root";

export type LinkIconButtonArgs = {};

export type LinkIconButtonProps =
  & Omit<Omit<RootProps, "asChild">, keyof LinkIconButtonArgs>
  & LinkIconButtonArgs;

export default function SuiLinkIconButton(props: LinkIconButtonProps): React.ReactElement {
  const {
    children,
    ...otherRootProps
  } = props;

  return (
    <Root {...otherRootProps}>
      {children}
      <Loader />
    </Root>
  );
}
