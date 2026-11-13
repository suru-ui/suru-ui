import { Segments } from "@suru-ui/react";
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
    disabled: true,
  },
];

export default function SegmentsControlledExample(): React.ReactNode {
  const [value, setValue] = React.useState("week");

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <Segments
        items={ITEMS}
        value={value}
        onValueChange={(nextValue) => {
          setValue(String(nextValue));
        }}
      />
      <span
        style={{
          color: "var(--sui-canvas_text-2)",
          fontSize: "0.875rem",
        }}
      >
        現在の値: {value}
      </span>
    </div>
  );
}
