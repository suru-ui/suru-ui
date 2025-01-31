import "./button.css";

import * as React from "react";
import * as Button from "./core";

export type Props = Omit<Button.RootProps, "asChild"> & {
  loading?: boolean | undefined;
  endSection?: Button.SectionProps["children"];
  startSection?: Button.SectionProps["children"];
};

export default function SuiButton(props: Props): React.ReactElement {
  const {
    children,
    disabled = false,
    className,
    endSection,
    startSection,
    ...otherRootProps
  } = props;

  return (
    <Button.Root
      {...otherRootProps}
      disabled={disabled}
    >
      {!("startSection" in props)
        ? null
        : (
          <Button.Section className="SuiButtonSection-position-start">
            {startSection}
          </Button.Section>
        )}

      <Button.Text>
        {children}
      </Button.Text>

      {!("endSection" in props) ? null : (
        <Button.Section className="SuiButtonSection-position-end">
          {endSection}
        </Button.Section>
      )}

      <Button.Loader />
    </Button.Root>
  );
}
