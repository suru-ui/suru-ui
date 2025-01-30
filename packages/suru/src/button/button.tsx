import "./button.style.css";

import * as React from "react";
import DotsLoader from "../dots-loader";
import Overlay from "../overlay";
import { $ } from "../theme";
import * as Button from "./core";

export type Props = Button.RootProps & {
  loading?: boolean | undefined;
  endSection?: Button.SectionProps["children"];
  startSection?: Button.SectionProps["children"];
};

export default function SuiButton(props: Props): React.ReactElement {
  const {
    loading = false,
    children,
    disabled = false,
    endSection,
    startSection,
    ...otherRootProps
  } = props;

  return (
    <Button.Root
      {...otherRootProps}
      disabled={disabled}
    >
      {!("startSection" in props) ? null : (
        <Button.Section>
          {startSection}
        </Button.Section>
      )}

      <Button.Text>
        {children}
      </Button.Text>

      {!("endSection" in props) ? null : (
        <Button.Section>
          {endSection}
        </Button.Section>
      )}

      {loading && !disabled ? <SuiButtonLoader /> : null}
    </Button.Root>
  );
}

function SuiButtonLoader() {
  const {
    size,
    color,
    variant,
  } = Button.useContext();

  return (
    <Overlay>
      <DotsLoader
        color={`${$.sui[color][variant].canvasText}`}
        size={`calc(${$.sui.sizing[size]} / 6)`}
      />
    </Overlay>
  );
}
