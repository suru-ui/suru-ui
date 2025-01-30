import "./dots-loader.style.css";

import * as React from "react";
import * as DotsLoader from "./core";

export type Props = Omit<DotsLoader.RootProps, "children">;

export default function SuiDotsLoader(props: Props): React.ReactElement {
  return (
    <DotsLoader.Root {...props}>
      <DotsLoader.Dot number={1} />
      <DotsLoader.Dot number={2} />
      <DotsLoader.Dot number={3} />
    </DotsLoader.Root>
  );
}
