import { Switch } from "@suru-ui/react";
import * as React from "react";

const VARIANTS = ["liquid", "naked"] as const;
const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const rowStyle: React.CSSProperties = {
  gap: "0.75rem",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  color: "var(--sui-color-text-muted, #666)",
  width: "4.5rem",
  fontSize: "0.8125rem",
};

export default function AppearanceSwitchExample(): React.ReactNode {
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
          <Switch key={variant} variant={variant} defaultChecked aria-label={variant} />
        ))}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>size</span>
        {SIZES.map((size) => (
          <Switch key={size} size={size} defaultChecked aria-label={size} />
        ))}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>color</span>
        {COLORS.map((color) => (
          <Switch key={color} color={color} defaultChecked aria-label={color} />
        ))}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>outlined</span>
        <Switch defaultChecked aria-label="枠線あり" />
        <Switch outlined={false} defaultChecked aria-label="枠線なし" />
      </div>
    </div>
  );
}
