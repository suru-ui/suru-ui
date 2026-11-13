import { Button, Popover } from "@suru-ui/react";
import * as React from "react";

export default function BasicPopoverExample(): React.ReactNode {
  return (
    <Popover
      trigger={<Button>共有の設定を開く</Button>}
      slotProps={{
        popup: { style: { maxWidth: "18rem" } },
      }}
    >
      <div
        style={{
          gap: "0.625rem",
          display: "grid",
        }}
      >
        <strong style={{ fontSize: "0.9375rem" }}>共有の設定</strong>
        <p
          style={{
            color: "#52525b",
            margin: 0,
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          リンクを知っている人だけがこの項目を閲覧できます。共有を停止すると、リンクは無効になります。
        </p>
        <Button size="sm" variant="liquid">
          設定を確認する
        </Button>
      </div>
    </Popover>
  );
}
