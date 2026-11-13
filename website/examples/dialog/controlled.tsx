import { Button, Dialog } from "@suru-ui/react";
import * as React from "react";

export default function DialogControlledExample(): React.ReactNode {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        ダイアログを開く
      </Button>
      <Dialog
        open={open}
        close={<Button variant="naked">閉じる</Button>}
        title="制御されたダイアログ"
        description="open と onOpenChange で開閉を制御しています。"
        onOpenChange={setOpen}
      >
        トリガーを使わず、外部のボタンから開くこともできます。
      </Dialog>
    </div>
  );
}
