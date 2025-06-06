import { Slot } from "@suru-ui/slot";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import Context from "./text-input.context";

export type EscapeFocusTrapArgs = {
  disabled?: boolean | undefined;
};

export type EscapeFocusTrapProps = EscapeFocusTrapArgs & {
  children: React.ReactNode;
};

export default function SuiTextEscapeFocusTrap(props: EscapeFocusTrapProps): React.ReactElement {
  const ctx = React.use(Context);
  assertRequiredContext("TextEscapeFocusTrap", ctx);
  const {
    children,
    disabled,
  } = props;
  const { getEscapeFocusTrapProps } = ctx;
  const apiEscapeFocusTrapProps = getEscapeFocusTrapProps({ disabled });

  return <Slot {...apiEscapeFocusTrapProps}>{children}</Slot>;
}
