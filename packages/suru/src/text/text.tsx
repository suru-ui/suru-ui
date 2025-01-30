import "./text.css";

import * as Text from "./core";

export type Props = Text.RootProps;

export default function SuiText(props: Props): React.ReactElement {
  return <Text.Root {...props} />;
}
