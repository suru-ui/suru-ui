import { type StatusSize, type StatusColor, Status } from "@suru-ui/react";
import * as React from "react";

const COLORS: readonly StatusColor[] = [
  "grey",
  "blue",
  "purple",
  "magenta",
  "red",
  "orange",
  "yellow",
  "green",
];

const SIZES: readonly StatusSize[] = ["sm", "md", "lg"];

export default function StatusAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "1rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {COLORS.map((color) => (
          <Status key={color} color={color}>
            {color}
          </Status>
        ))}
      </div>
      <div
        style={{
          gap: "1.25rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {SIZES.map((size) => (
          <Status key={size} size={size} color="blue">
            {size}
          </Status>
        ))}
      </div>
    </div>
  );
}
