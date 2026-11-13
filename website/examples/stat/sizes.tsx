import { type StatSize, Stat } from "@suru-ui/react";
import * as React from "react";

const SIZES: readonly StatSize[] = ["sm", "md", "lg"];

export default function StatSizesExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "2rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {SIZES.map((size) => (
        <div
          key={size}
          style={{
            gap: "0.5rem",
            display: "grid",
          }}
        >
          <span
            style={{
              color: "var(--sui-canvas_text-2)",
              fontSize: "0.75rem",
            }}
          >
            {size}
          </span>
          <Stat
            size={size}
            label="総閲覧者数"
            trend="+22 %"
            value={11_297}
            description="先月から増加しました"
          />
        </div>
      ))}
    </div>
  );
}
