import { type SegmentsActiveVariant, Segments } from "@suru-ui/react";
import * as React from "react";

const ITEMS = [
  {
    label: "日",
    value: "day",
  },
  {
    label: "週",
    value: "week",
  },
  {
    label: "月",
    value: "month",
  },
];

const VARIANTS: readonly SegmentsActiveVariant[] = ["solid", "liquid", "naked"];

export default function SegmentsAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
      }}
    >
      {VARIANTS.map((activeVariant) => (
        <div
          key={activeVariant}
          style={{
            gap: "0.375rem",
            display: "grid",
          }}
        >
          <span
            style={{
              color: "var(--sui-canvas_text-2)",
              fontSize: "0.75rem",
            }}
          >
            {activeVariant}
          </span>
          <Segments items={ITEMS} defaultValue="week" activeVariant={activeVariant} />
        </div>
      ))}
      <div
        style={{
          gap: "0.375rem",
          display: "grid",
        }}
      >
        <span
          style={{
            color: "var(--sui-canvas_text-2)",
            fontSize: "0.75rem",
          }}
        >
          blue
        </span>
        <Segments color="blue" items={ITEMS} defaultValue="week" />
      </div>
    </div>
  );
}
