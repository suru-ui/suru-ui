import "./button.css";

import * as React from "react";
import * as Button from "./parts";

type Params = {
  endSection?: Button.SectionProps["children"];
  fullWidth?: boolean | undefined;
  loading?: boolean | undefined;
  startSection?: Button.SectionProps["children"];
};

export type Props =
  & Omit<Button.RootProps, "asChild" | keyof Params>
  & Params;

export default function SuiButton(props: Props): React.ReactElement {
  const {
    children,
    disabled = false,
    fullWidth,
    endSection,
    startSection,
    ...otherRootProps
  } = props;

  return (
    <Button.Root
      {...otherRootProps}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {"startSection" in props && (
        <Button.Section className="SuiButtonSection-position-start">
          {startSection}
        </Button.Section>
      )}

      <Button.Text>
        {children}
      </Button.Text>

      {"endSection" in props && (
        <Button.Section className="SuiButtonSection-position-end">
          {endSection}
        </Button.Section>
      )}

      <Button.Loader />
    </Button.Root>
  );
}
