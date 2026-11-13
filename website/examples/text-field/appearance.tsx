import { TextField } from "@suru-ui/react";
import * as React from "react";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const rowStyle: React.CSSProperties = {
  gap: "0.75rem",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  color: "#666",
  width: "4.5rem",
  fontSize: "0.8125rem",
};

export default function AppearanceTextFieldExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
      }}
    >
      <div style={rowStyle}>
        <span style={labelStyle}>variant</span>
        <TextField
          style={{ width: "12rem" }}
          variant="naked"
          slotProps={{ input: { "aria-label": "naked" } }}
          placeholder="naked"
        />
        <TextField
          style={{ width: "12rem" }}
          variant="liquid"
          slotProps={{ input: { "aria-label": "liquid" } }}
          placeholder="liquid"
        />
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>size</span>
        {SIZES.map((size) => (
          <TextField
            key={size}
            size={size}
            style={{ width: "10rem" }}
            slotProps={{ input: { "aria-label": size } }}
            placeholder={size}
          />
        ))}
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>color</span>
        {COLORS.map((color) => (
          <TextField
            key={color}
            color={color}
            style={{ width: "8rem" }}
            slotProps={{ input: { "aria-label": color } }}
            defaultValue={color}
          />
        ))}
      </div>
    </div>
  );
}
