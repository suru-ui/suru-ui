import { Progress } from "@suru-ui/react";
import * as React from "react";

export default function BasicProgressExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <Progress color="blue" label="ファイルをアップロードしています" value={64} />
      <Progress color="green" label="バックアップが完了しました" value={100} />
    </div>
  );
}
