import "./icon-button.css";

import * as React from "react";
import Loader from "./icon-button.loader";
import Root, { type RootProps } from "./icon-button.root";

export type IconButtonArgs = {};

export type IconButtonProps =
  & Omit<Omit<RootProps, "asChild">, keyof IconButtonArgs>
  & IconButtonArgs;

export default function SuiIconButton(props: IconButtonProps): React.ReactElement {
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
