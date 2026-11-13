import { Button, AlertDialog } from "@suru-ui/react";
import { Trash2Icon } from "lucide-react";
import * as React from "react";

export default function BasicAlertDialogExample(): React.ReactNode {
  return (
    <AlertDialog
      icon={<Trash2Icon aria-hidden="true" />}
      title="プロジェクトを削除しますか？"
      cancel={<Button variant="naked">キャンセル</Button>}
      confirm={<Button color="red">削除する</Button>}
      trigger={<Button color="red">プロジェクトを削除</Button>}
      slotProps={{
        icon: {
          color: "red",
          muted: true,
        },
      }}
      description="このプロジェクトに含まれるすべてのデータが削除されます。この操作は取り消せません。"
    />
  );
}
