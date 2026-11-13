import { Button, HoverCard } from "@suru-ui/react";
import * as React from "react";

export default function HoverCardPlacementExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <HoverCard
        arrow
        trigger={<Button variant="liquid">上に表示</Button>}
        slotProps={{
          positioner: {
            side: "top",
            sideOffset: 8,
          },
        }}
      >
        トリガーの上に矢印付きで表示されます。
      </HoverCard>
      <HoverCard
        arrow
        trigger={<Button variant="liquid">右に表示</Button>}
        slotProps={{
          positioner: {
            side: "right",
            align: "start",
            sideOffset: 8,
          },
        }}
      >
        トリガーの右側に表示されます。画面の端では自動的に位置が調整されます。
      </HoverCard>
    </div>
  );
}
