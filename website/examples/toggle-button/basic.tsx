import { ToggleButton } from "@suru-ui/react";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import * as React from "react";

export default function BasicToggleButtonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.5rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <ToggleButton defaultPressed aria-label="太字">
        <BoldIcon aria-hidden="true" />
      </ToggleButton>
      <ToggleButton aria-label="斜体">
        <ItalicIcon aria-hidden="true" />
      </ToggleButton>
      <ToggleButton aria-label="下線">
        <UnderlineIcon aria-hidden="true" />
      </ToggleButton>
    </div>
  );
}
