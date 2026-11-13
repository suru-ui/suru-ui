import { Button } from "@suru-ui/react";
import * as React from "react";

const VARIANTS = ["solid", "naked", "liquid"] as const;
const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

export default function AppearanceButtonExample(): React.ReactNode {
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
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
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
          <Button key={color} color={color}>
            {color}
          </Button>
        ))}
      </div>
    </div>
  );
}
