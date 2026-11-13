import { Chip } from "@suru-ui/react";
import * as React from "react";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

const VARIANTS = ["solid", "naked", "liquid"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export default function ChipAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {VARIANTS.map((variant) => (
          <Chip key={variant} color="blue" variant={variant}>
            {variant}
          </Chip>
        ))}
        {SIZES.map((size) => (
          <Chip key={size} size={size} color="purple">
            {size}
          </Chip>
        ))}
      </div>
      <div
        style={{
          gap: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {COLORS.map((color) => (
          <Chip key={color} color={color}>
            {color}
          </Chip>
        ))}
      </div>
    </div>
  );
}
