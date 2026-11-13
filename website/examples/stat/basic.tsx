import { Stat } from "@suru-ui/react";
import * as React from "react";

const STATS = [
  {
    label: "総閲覧者数",
    trend: "+12.5 %",
    value: 11_297,
    description: "先月比",
  },
  {
    label: "問い合わせ",
    trend: "-3.2 %",
    value: 248,
    description: "先月比",
  },
  {
    label: "継続率",
    trend: "0 %",
    value: "92.4 %",
    description: "前月と同じ",
  },
];

export default function BasicStatExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "100%",
        display: "grid",
        maxWidth: "42rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
      }}
    >
      {STATS.map((stat) => (
        <div
          key={stat.label}
          style={{
            border: "1px solid var(--sui-border-1)",
            padding: "1rem",
            borderRadius: "0.75rem",
            backgroundColor: "var(--sui-canvas-1)",
          }}
        >
          <Stat {...stat} />
        </div>
      ))}
    </div>
  );
}
