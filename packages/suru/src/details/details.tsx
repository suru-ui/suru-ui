import "./details.css";

import * as React from "react";
import Content from "./details.content";
import Indicator from "./details.indicator";
import Root, { type RootProps } from "./details.root";
import Summary from "./details.summary";

export type AccordionArgs = {
  summary: React.ReactNode;
};

export type AccordionProps =
  & Omit<Omit<RootProps, "asChild">, keyof AccordionArgs>
  & AccordionArgs;

export default function SuiAccordion(props: AccordionProps): React.ReactElement {
  const {
    summary,
    children,
    ...otherRootProps
  } = props;

  return (
    <Root {...otherRootProps}>
      <Summary>
        <div>{summary}</div>
        <Indicator />
      </Summary>
      <Content>{children}</Content>
    </Root>
  );
}
