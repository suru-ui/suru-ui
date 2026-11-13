import { Toast, Button } from "@suru-ui/react";
import * as React from "react";

function NotifyButton(): React.ReactNode {
  const toast = Toast.useClient();

  return (
    <Button
      color="blue"
      onClick={() => {
        toast.add({
          title: "保存しました",
          description: "変更内容は自動的に同期されます。",
        });
      }}
    >
      通知を表示
    </Button>
  );
}

export default function BasicToastExample(): React.ReactNode {
  return (
    <Toast.Provider limit={3} timeout={5000}>
      <NotifyButton />
      <Toast.List />
    </Toast.Provider>
  );
}
