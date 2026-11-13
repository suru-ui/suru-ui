import { Button } from "@suru-ui/react";
import * as React from "react";

const SIZES = ["xs", "sm", "md", "lg"] as const;

export default function SizeButtonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {SIZES.map((size) => (
          <Button key={size} size={size} thin>
            {size} thin
          </Button>
        ))}
      </div>
    </div>
  );
}
