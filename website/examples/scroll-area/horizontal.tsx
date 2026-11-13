import { ScrollArea } from "@suru-ui/react";
import * as React from "react";

const CELLS = Array.from({ length: 48 }, (_, index) => index + 1);

export default function ScrollAreaHorizontalExample(): React.ReactNode {
  return (
    <ScrollArea
      style={{
        width: "22rem",
        border: "1px solid var(--sui-border-1)",
        height: "14rem",
        maxWidth: "100%",
        borderRadius: "0.75rem",
        backgroundColor: "var(--sui-canvas-1)",
      }}
      horizontal
    >
      <div
        style={{
          gap: "0.5rem",
          display: "grid",
          padding: "1rem",
          gridTemplateColumns: "repeat(8, 5rem)",
        }}
      >
        {CELLS.map((cell) => (
          <div
            key={cell}
            style={{
              color: "var(--sui-canvas_text-2)",
              height: "3rem",
              display: "grid",
              fontSize: "0.875rem",
              placeItems: "center",
              borderRadius: "0.375rem",
              backgroundColor: "var(--sui-canvas-2)",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
