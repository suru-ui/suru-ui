import { Button, AlertDialog } from "@suru-ui/react";
import { Trash2Icon, AlertTriangleIcon } from "lucide-react";
import * as React from "react";

const VARIANTS = ["default", "stacked"] as const;

export default function AppearanceAlertDialogExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {VARIANTS.map((variant, index) => (
        <AlertDialog
          key={variant}
          icon={
            index === 0 ? (
              <Trash2Icon aria-hidden="true" />
            ) : (
              <AlertTriangleIcon aria-hidden="true" />
            )
          }
          title={index === 0 ? "プロジェクトを削除しますか？" : "変更を破棄しますか？"}
          cancel={<Button variant="naked">キャンセル</Button>}
          confirm={<Button color="red">実行する</Button>}
          trigger={<Button variant="liquid">{variant}</Button>}
          variant={variant}
          slotProps={{
            icon: {
              color: index === 0 ? "red" : "yellow",
              muted: true,
            },
          }}
          description={
            index === 0
              ? "この操作は取り消せません。すべてのデータが削除されます。"
              : "保存していない変更はすべて失われます。"
          }
        />
      ))}
    </div>
  );
}
