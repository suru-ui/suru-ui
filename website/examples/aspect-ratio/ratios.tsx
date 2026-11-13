import { AspectRatio } from "@suru-ui/react";
import * as React from "react";

const RATIOS = [
  {
    color: "#dbeafe",
    label: "1:1",
    ratio: "1 / 1",
  },
  {
    color: "#dcfce7",
    label: "4:3",
    ratio: "4 / 3",
  },
  {
    color: "#ede9fe",
    label: "16:9",
    ratio: "16 / 9",
  },
  {
    color: "#fee2e2",
    label: "9:16",
    ratio: "9 / 16",
  },
] as const;

export default function RatiosAspectRatioExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "100%",
        display: "grid",
        maxWidth: "30rem",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      }}
    >
      {RATIOS.map(({ color, label, ratio }) => (
        <AspectRatio key={label} ratio={ratio} radius="md">
          <div
            style={{
              color: "#1e293b",
              height: "100%",
              display: "flex",
              alignItems: "center",
              background: color,
              fontWeight: 600,
              justifyContent: "center",
            }}
          >
            {label}
          </div>
        </AspectRatio>
      ))}
    </div>
  );
}
