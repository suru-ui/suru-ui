import { Button, Drawer } from "@suru-ui/react";
import * as React from "react";

export default function BasicDrawerExample(): React.ReactNode {
  const [open, setOpen] = React.useState(false);

  function close(): void {
    setOpen(false);
  }

  return (
    <Drawer
      open={open}
      title="通知を削除しますか？"
      footer={
        <>
          <Button color="red" onClick={close}>
            削除する
          </Button>
          <Button variant="naked" onClick={close}>
            キャンセル
          </Button>
        </>
      }
      trigger={<Button color="red">通知を削除</Button>}
      description="この操作は取り消せません。"
      swipeDirection="down"
      showSwipeHandle
      onOpenChange={setOpen}
    >
      削除すると、この通知は完全に失われます。必要な内容は事前に控えてください。
    </Drawer>
  );
}
