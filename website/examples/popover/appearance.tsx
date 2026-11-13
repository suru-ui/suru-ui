import { Button, Popover } from "@suru-ui/react";
import * as React from "react";

export default function PopoverAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Popover
        size="md"
        trigger={<Button variant="liquid">標準</Button>}
        slotProps={{ popup: { style: { maxWidth: "16rem" } } }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          枠線と背景で内容を区切ります。
        </p>
      </Popover>
      <Popover
        trigger={<Button variant="liquid">枠線なし</Button>}
        outlined={false}
        slotProps={{ popup: { style: { maxWidth: "16rem" } } }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          枠線を外し、背景色だけで内容を区切ります。
        </p>
      </Popover>
      <Popover
        size="lg"
        radius="lg"
        trigger={<Button variant="liquid">大きめ</Button>}
        slotProps={{ popup: { style: { maxWidth: "20rem" } } }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          大きさと角丸を変えた表示です。
        </p>
      </Popover>
    </div>
  );
}
