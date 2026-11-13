import { Checkbox } from "@suru-ui/react";
import * as React from "react";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

const VARIANTS = ["naked", "liquid"] as const;

const rowStyle = {
  gap: "0.5rem",
  display: "inline-flex",
  minWidth: "5.5rem",
  alignItems: "center",
} as const;

export default function CheckboxAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {VARIANTS.map((variant) => (
          <label key={variant} style={rowStyle}>
            <Checkbox variant={variant} defaultChecked />
            {variant}
          </label>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {COLORS.map((color) => (
          <label key={color} style={rowStyle}>
            <Checkbox color={color} defaultChecked />
            {color}
          </label>
        ))}
      </div>
    </div>
  );
}
