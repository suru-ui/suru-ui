import "./link-button.css";

import * as React from "react";
import Loader from "./link-button.loader";
import Root, { type RootProps } from "./link-button.root";
import Section, { type SectionProps } from "./link-button.section";
import Text from "./link-button.text";

export type LinkButtonArgs = {
  endSection?: SectionProps["children"];
  startSection?: SectionProps["children"];
};

export type LinkButtonProps =
  & Omit<RootProps, keyof LinkButtonArgs | "asChild">
  & LinkButtonArgs;

export default function SuiLinkButton(props: LinkButtonProps): React.ReactElement {
  const {
    children,
    endSection,
    startSection,
    ...otherRootProps
  } = props;

  return (
    <Root {...otherRootProps}>
      {"startSection" in props && (
        <Section className="sui-link_button_section sui-link_button_section-start">
          {startSection}
        </Section>
      )}
      <Text>
        {children}
      </Text>
      {"endSection" in props && (
        <Section className="sui-link_button_section sui-link_button_section-end">
          {endSection}
        </Section>
      )}
      <Loader />
    </Root>
  );
}
