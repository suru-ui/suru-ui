import { Textarea } from "@suru-ui/react";
import * as React from "react";

const VARIANTS = ["naked", "liquid"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const rowStyle: React.CSSProperties = {
  gap: "0.75rem",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
};

const labelStyle: React.CSSProperties = {
  color: "#666",
  width: "4rem",
  fontSize: "0.8125rem",
  paddingTop: "0.5rem",
};

export default function AppearanceTextareaExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
      }}
    >
      <div style={rowStyle}>
        <span style={labelStyle}>variant</span>
        {VARIANTS.map((variant) => (
          <Textarea
            key={variant}
            rows={3}
            style={{ width: "12rem" }}
            variant={variant}
            defaultValue={variant}
            aria-label={variant}
          />
        ))}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>size</span>
        {SIZES.map((size) => (
          <Textarea
            key={size}
            rows={3}
            size={size}
            style={{ width: "10rem" }}
            defaultValue={size}
            aria-label={size}
          />
        ))}
      </div>
    </div>
  );
}
