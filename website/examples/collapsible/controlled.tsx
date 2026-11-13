import { Button, Collapsible } from "@suru-ui/react";
import * as React from "react";

export default function CollapsibleControlledExample(): React.ReactNode {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ width: "22rem" }}>
      <Collapsible
        open={open}
        trigger={
          <Button style={{ width: "100%" }} variant="liquid">
            詳細設定
            <Collapsible.Indicator />
          </Button>
        }
        onOpenChange={setOpen}
      >
        開閉状態は open と onOpenChange で制御できます。
      </Collapsible>
      <p
        style={{
          color: "#525252",
          fontSize: "0.875rem",
          marginBlock: "0.75rem 0",
        }}
      >
        現在の状態: {open ? "開いています" : "閉じています"}
      </p>
    </div>
  );
}
