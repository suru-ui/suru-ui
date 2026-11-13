import { Button, Popover } from "@suru-ui/react";
import * as React from "react";

const placements = [
  {
    side: "top",
    align: "center",
    label: "上",
  },
  {
    side: "bottom",
    align: "center",
    label: "下",
  },
  {
    side: "left",
    align: "center",
    label: "左",
  },
  {
    side: "right",
    align: "center",
    label: "右",
  },
] as const;

export default function PopoverPlacementExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {placements.map((placement) => (
        <Popover
          key={placement.label}
          arrow
          trigger={<Button variant="liquid">{placement.label}</Button>}
          slotProps={{
            positioner: {
              side: placement.side,
              align: placement.align,
              sideOffset: 10,
            },
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              lineHeight: 1.6,
            }}
          >
            {placement.label}に表示されます。画面の端では自動的に位置が調整されます。
          </p>
        </Popover>
      ))}
    </div>
  );
}
