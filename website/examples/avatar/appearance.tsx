import { Avatar } from "@suru-ui/react";
import * as React from "react";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;
const SIZES = ["sm", "md", "lg"] as const;
const RADII = ["none", "sm", "md", "lg", "full", "circle"] as const;

export default function AppearanceAvatarExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
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
        {COLORS.map((color) => (
          <Avatar key={color} color={color} radius="full">
            名
          </Avatar>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {SIZES.map((size) => (
          <Avatar key={size} size={size} color="blue" radius="full">
            名
          </Avatar>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {RADII.map((radius) => (
          <Avatar key={radius} size="md" color="purple" radius={radius}>
            名
          </Avatar>
        ))}
      </div>
    </div>
  );
}
