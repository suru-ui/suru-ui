import { Progress } from "@suru-ui/react";
import * as React from "react";

export default function ProgressFormatExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <Progress
        color="blue"
        label="アップロード中"
        value={42}
        locale="ja-JP"
        slotProps={{
          value: { children: (formattedValue) => `${formattedValue} 完了` },
        }}
      />
      <Progress
        max={1}
        color="green"
        label="タスクの完了率"
        value={0.72}
        format={{ style: "percent" }}
        locale="ja-JP"
      />
    </div>
  );
}
