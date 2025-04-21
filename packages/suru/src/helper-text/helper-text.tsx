import "./helper-text.css";

import * as HelperText from "./parts";

export type Props = HelperText.RootProps;

export default function SuiHelperText(props: Props): React.ReactElement {
  return <HelperText.Root {...props} />;
}
