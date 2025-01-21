import "./typography.style.css";

import * as Typography from "./core";

export type Props = Typography.RootProps;

export default function SuiTypography(props: Props): React.ReactElement {
  return <Typography.Root {...props} />;
}
