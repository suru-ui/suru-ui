import { ToggleButton } from "@suru-ui/react";
import * as React from "react";

export default function ControlledToggleButtonExample(): React.ReactNode {
  const [pressed, setPressed] = React.useState(false);

  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
        justifyItems: "start",
      }}
    >
      <ToggleButton color="blue" pressed={pressed} onPressedChange={setPressed}>
        {pressed ? "オン" : "オフ"}
      </ToggleButton>
      <span
        style={{
          color: "#666",
          fontSize: "0.875rem",
        }}
      >
        現在の状態: {pressed ? "オン" : "オフ"}
      </span>
    </div>
  );
}
