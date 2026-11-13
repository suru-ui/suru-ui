import { Button, Drawer } from "@suru-ui/react";
import * as React from "react";

const DIRECTIONS = [
  {
    label: "左",
    direction: "left",
  },
  {
    label: "右",
    direction: "right",
  },
  {
    label: "上",
    direction: "up",
  },
  {
    label: "下",
    direction: "down",
  },
] as const;

export default function DrawerDirectionsExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {DIRECTIONS.map(({ label, direction }) => (
        <Drawer
          key={direction}
          title={`${label}から表示`}
          trigger={<Button variant="liquid">{label}から表示</Button>}
          description={`${label}端から表示されるドロワーです。`}
          swipeDirection={direction}
          showSwipeHandle
        >
          スワイプする方向を swipeDirection で指定できます。
        </Drawer>
      ))}
    </div>
  );
}
