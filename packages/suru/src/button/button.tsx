import "./button.css";

import * as React from "react";
import Loader from "./button.loader";
import Root, { type RootProps } from "./button.root";
import Section, { type SectionProps } from "./button.section";
import Text from "./button.text";

export type ButtonArgs = {
  endSection?: SectionProps["children"];
  startSection?: SectionProps["children"];
};

export type ButtonProps =
  & Omit<RootProps, keyof ButtonArgs | "asChild">
  & ButtonArgs;

export default function SuiButton(props: ButtonProps): React.ReactElement {
  const {
    children,
    endSection,
    startSection,
    ...otherRootProps
  } = props;

  return (
    <Root {...otherRootProps}>
      {"startSection" in props && (
        <Section className="sui-button_section sui-button_section-start">
          {startSection}
        </Section>
      )}
      <Text>
        {children}
      </Text>
      {"endSection" in props && (
        <Section className="sui-button_section sui-button_section-end">
          {endSection}
        </Section>
      )}
      <Loader />
    </Root>
  );
}
