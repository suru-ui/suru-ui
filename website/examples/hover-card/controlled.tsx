import { Button, HoverCard } from "@suru-ui/react";
import * as React from "react";

export default function HoverCardControlledExample(): React.ReactNode {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <HoverCard
        open={open}
        delay={0}
        trigger={<Button>詳細を見る</Button>}
        closeDelay={300}
        onOpenChange={setOpen}
      >
        外部の状態で開閉を制御しています。
      </HoverCard>
      <Button
        variant="liquid"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {open ? "閉じる" : "開く"}
      </Button>
    </div>
  );
}
