import { Button, Tooltip } from "@suru-ui/react";
import * as React from "react";

const SIDES = ["top", "right", "bottom", "left"] as const;

export default function PositionTooltipExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        padding: "2rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {SIDES.map((side) => (
        <Tooltip
          key={side}
          side={side}
          delay={200}
          trigger={<Button variant="liquid">{side}</Button>}
          showArrow
          sideOffset={10}
        >
          {side} に表示されます
        </Tooltip>
      ))}
    </div>
  );
}
