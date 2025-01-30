import "./overlay.style.css";

import * as React from "react";
import * as Overlay from "./core";

export type Props = Overlay.RootProps;

export default function SuiOverlay(props: Props): React.ReactElement {
  return <Overlay.Root {...props} />;
}
