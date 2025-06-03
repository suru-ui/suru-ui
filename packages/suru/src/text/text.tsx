import "./text.css";

import * as React from "react";
import Root, { type RootProps } from "./text.root";

export type TextArgs = {};

export type TextProps = RootProps;

export default function SuiText(props: TextProps): React.ReactElement {
  return <Root {...props} />;
}
