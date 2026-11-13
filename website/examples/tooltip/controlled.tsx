import { Button, Tooltip } from "@suru-ui/react";
import * as React from "react";

export default function ControlledTooltipExample(): React.ReactNode {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button
        color="blue"
        onClick={() => {
          setOpen((current) => !current);
        }}
      >
        {open ? "ツールチップを閉じる" : "ツールチップを開く"}
      </Button>
      <Tooltip
        open={open}
        delay={0}
        trigger={<Button variant="naked">対象のボタン</Button>}
        keepOpenOnClick
        onOpenChange={setOpen}
      >
        外部のボタンから開閉しています
      </Tooltip>
    </div>
  );
}
