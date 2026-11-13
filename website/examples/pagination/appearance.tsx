import { Pagination } from "@suru-ui/react";
import * as React from "react";

const rows = [
  {
    size: "sm",
    color: "grey",
    label: "小さめ",
    radius: "sm",
  },
  {
    size: "md",
    color: "blue",
    label: "標準",
    radius: "md",
  },
  {
    size: "lg",
    color: "green",
    label: "大きめ",
    radius: "full",
  },
] as const;

export default function PaginationAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
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
          <Pagination
            size={row.size}
            color={row.color}
            radius={row.radius}
            totalPages={8}
            defaultPage={4}
            aria-label={`${row.label}のページ`}
          />
        </div>
      ))}
    </div>
  );
}
