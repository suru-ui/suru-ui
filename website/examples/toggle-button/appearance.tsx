import { ToggleButton } from "@suru-ui/react";
import * as React from "react";

const VARIANTS = ["liquid", "naked"] as const;
const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

const rowStyle: React.CSSProperties = {
  gap: "0.75rem",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  color: "#666",
  width: "4.5rem",
  fontSize: "0.8125rem",
};

export default function AppearanceToggleButtonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
      }}
    >
      <div style={rowStyle}>
        <span style={labelStyle}>variant</span>
        {VARIANTS.map((variant) => (
          <ToggleButton key={variant} variant={variant}>
            {variant}
          </ToggleButton>
        ))}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>color</span>
        {COLORS.map((color) => (
          <ToggleButton key={color} color={color} defaultPressed>
            {color}
          </ToggleButton>
        ))}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>outlined</span>
        <ToggleButton defaultPressed>枠線なし</ToggleButton>
        <ToggleButton outlined defaultPressed>
          枠線あり
        </ToggleButton>
      </div>
    </div>
  );
}
