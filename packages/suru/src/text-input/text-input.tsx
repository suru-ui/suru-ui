import "./text-input.css";

import * as React from "react";
import EscapeFocusTrap from "./text-input.escape-focus-trap";
import Input, { type InputProps } from "./text-input.input";
import Root, { type RootProps } from "./text-input.root";

export type TextInputArgs = {
  endSection?: React.ReactNode;
  inputProps?: InputProps | undefined;
  startSection?: React.ReactNode;
};

export type TextInputProps =
  & Omit<RootProps, keyof TextInputArgs | "asChild">
  & TextInputArgs;

function SuiTextInput(props: TextInputProps): React.ReactElement {
  const {
    children,
    endSection,
    inputProps,
    startSection,
    ...otherRootProps
  } = props;

  return (
    <Root {...otherRootProps}>
      {"startSection" in props && (
        <div className="sui-text_input_section sui-text_input_section-start">
          {startSection}
        </div>
      )}
      <Input {...inputProps}>
        {children}
      </Input>
      {"endSection" in props && (
        <div className="sui-text_input_section sui-text_input_section-end">
          {endSection}
        </div>
      )}
    </Root>
  );
}

export default /* @__PURE__ */ Object.assign(SuiTextInput, { EscapeFocusTrap });
