import "./label.css";

import * as Label from "./core";

export type Props = Label.RootProps;

export default function SuiLabel(props: Props): React.ReactElement {
  return <Label.Root {...props} />;
}
