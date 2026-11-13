import { Button } from "@suru-ui/react";
import { Trash2Icon } from "lucide-react";
import * as React from "react";

const VARIANTS = ["solid", "naked", "liquid"] as const;
const RADII = ["none", "xs", "sm", "md", "lg", "full", "circle"] as const;

export default function ShapeButtonExample(): React.ReactNode {
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
          <Button key={variant} squared variant={variant} aria-label={`${variant} の削除`}>
            <Trash2Icon aria-hidden="true" />
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
        {RADII.map((radius) => (
          <Button key={radius} radius={radius}>
            {radius}
          </Button>
        ))}
      </div>
    </div>
  );
}
