import { PasswordField } from "@suru-ui/react";
import * as React from "react";

const rows = [
  {
    size: "md",
    color: "grey",
    label: "naked",
    variant: "naked",
  },
  {
    size: "md",
    color: "blue",
    label: "liquid",
    variant: "liquid",
  },
  {
    size: "lg",
    color: "green",
    label: "大きめ",
    variant: "liquid",
  },
] as const;

export default function PasswordFieldAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "22rem",
        display: "grid",
      }}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            gap: "0.375rem",
            display: "grid",
          }}
        >
          <span
            style={{
              color: "#71717a",
              fontSize: "0.75rem",
            }}
          >
            {row.label}
          </span>
          <PasswordField
            size={row.size}
            color={row.color}
            variant={row.variant}
            slotProps={{ input: { "aria-label": `パスワード (${row.label})` } }}
            defaultValue="secret123"
          />
        </div>
      ))}
    </div>
  );
}
