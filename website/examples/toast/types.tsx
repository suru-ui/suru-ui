import { Toast, Button } from "@suru-ui/react";
import * as React from "react";

const TYPES = [
  {
    type: "success",
    color: "green",
    label: "成功",
  },
  {
    type: "info",
    color: "blue",
    label: "情報",
  },
  {
    type: "warning",
    color: "yellow",
    label: "警告",
  },
  {
    type: "error",
    color: "red",
    label: "エラー",
  },
] as const;

function TypeButtons(): React.ReactNode {
  const toast = Toast.useClient();

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {TYPES.map(({ type, color, label }) => (
        <Button
          key={type}
          color={color}
          variant="liquid"
          onClick={() => {
            toast.add({
              type,
              title: `${label}の通知`,
              description: "type に応じて通知の配色が変わります。",
            });
          }}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export default function ToastTypesExample(): React.ReactNode {
  return (
    <Toast.Provider>
      <TypeButtons />
      <Toast.List />
    </Toast.Provider>
  );
}
