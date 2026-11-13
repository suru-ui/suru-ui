import { Button, AlertDialog } from "@suru-ui/react";
import * as React from "react";

export default function ControlledAlertDialogExample(): React.ReactNode {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
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
          開く
        </Button>
        <Button
          variant="liquid"
          onClick={() => {
            setOpen((previous) => !previous);
          }}
        >
          切り替え
        </Button>
        <span
          style={{
            color: "#525252",
            fontSize: "0.875rem",
          }}
        >
          状態: {open ? "開いています" : "閉じています"}
        </span>
      </div>
      <AlertDialog
        open={open}
        title="下書きを削除しますか？"
        cancel={<Button variant="naked">キャンセル</Button>}
        confirm={<Button color="red">削除する</Button>}
        description="削除した下書きは元に戻せません。"
        onOpenChange={setOpen}
      />
    </div>
  );
}
