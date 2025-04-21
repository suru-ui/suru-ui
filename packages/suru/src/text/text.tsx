import "./text.css";

import * as Text from "./parts";

export type Props = Text.RootProps;

export default function SuiText(props: Props): React.ReactElement {
  return <Text.Root {...props} />;
}
