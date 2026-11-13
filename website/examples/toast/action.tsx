import { Toast, Button } from "@suru-ui/react";
import * as React from "react";

function DeleteButton({ onUndo }: { onUndo: () => void }): React.ReactNode {
  const toast = Toast.useClient();

  return (
    <Button
      color="red"
      onClick={() => {
        toast.add({
          title: "項目を削除しました",
          actionProps: {
            onClick: onUndo,
            children: "元に戻す",
          },
          description: "この操作は元に戻せます。",
        });
      }}
    >
      削除する
    </Button>
  );
}

export default function ActionToastExample(): React.ReactNode {
  const [undoCount, setUndoCount] = React.useState(0);

  return (
    <Toast.Provider>
      <div
        style={{
          gap: "0.75rem",
          display: "grid",
          justifyItems: "start",
        }}
      >
        <DeleteButton
          onUndo={() => {
            setUndoCount((count) => count + 1);
          }}
        />
        <span
          style={{
            color: "#666",
            fontSize: "0.875rem",
          }}
        >
          元に戻した回数: {undoCount}
        </span>
      </div>
      <Toast.List>
        {(toast) => <Toast key={toast.id} close="閉じる" toast={toast} actionsPosition="bottom" />}
      </Toast.List>
    </Toast.Provider>
  );
}
