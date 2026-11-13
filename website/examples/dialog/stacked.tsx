import { Button, Dialog } from "@suru-ui/react";
import * as React from "react";

export default function DialogStackedExample(): React.ReactNode {
  return (
    <Dialog
      close={<Button>確認しました</Button>}
      title="通知"
      trigger={<Button variant="liquid">通知を確認</Button>}
      variant="stacked"
      description="新しい通知はありません。"
    >
      前回の確認以降に届いた通知はありません。新しい通知が届くと、ここに表示されます。
    </Dialog>
  );
}
