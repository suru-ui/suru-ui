import "./error-text.css";

import * as ErrorText from "./parts";

export type Props = ErrorText.RootProps;

export default function SuiErrorText(props: Props): React.ReactElement {
  return <ErrorText.Root {...props} />;
}
