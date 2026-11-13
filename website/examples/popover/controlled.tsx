import { Button, Popover } from "@suru-ui/react";
import * as React from "react";

export default function ControlledPopoverExample(): React.ReactNode {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Popover open={open} trigger={<Button>詳細を表示</Button>} onOpenChange={setOpen}>
        <div
          style={{
            gap: "0.5rem",
            display: "grid",
            maxWidth: "17rem",
          }}
        >
          <strong style={{ fontSize: "0.9375rem" }}>外部の状態で開閉しています</strong>
          <p
            style={{
              color: "#52525b",
              margin: 0,
              fontSize: "0.875rem",
              lineHeight: 1.6,
            }}
          >
            ポップオーバーの開閉状態は、トリガーとは別のボタンからも変更できます。
          </p>
        </div>
      </Popover>
      <Button
        variant="naked"
        onClick={() => {
          setOpen((current) => !current);
        }}
      >
        {open ? "閉じる" : "開く"}
      </Button>
    </div>
  );
}
