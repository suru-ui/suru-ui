import "./text-input.css";

import * as React from "react";
import type { Color, Sizing } from "../theme";
import * as TextInput from "./core";

type Params = {
  color?: Color | undefined;
  endSection?: TextInput.SectionProps["children"];
  size?: Sizing | undefined;
  startSection?: TextInput.SectionProps["children"];
};

export type Props =
  & Omit<React.ComponentProps<"input">, keyof Params | "children">
  & Params;

export default function SuiTextInput(props: Props): React.ReactElement {
  const {
    size,
    color,
    endSection,
    startSection,
    ...otherInputProps
  } = props;

  return (
    <TextInput.Root
      size={size}
      color={color}
    >
      {!("startSection" in props)
        ? null
        : (
          <TextInput.Section className="SuiTextInputSection-position-start">
            {startSection}
          </TextInput.Section>
        )}

      <TextInput.Input {...otherInputProps} />

      {!("endSection" in props)
        ? null
        : (
          <TextInput.Section className="SuiTextInputSection-position-end">
            {endSection}
          </TextInput.Section>
        )}
    </TextInput.Root>
  );
}
