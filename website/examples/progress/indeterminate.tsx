import { Progress } from "@suru-ui/react";
import * as React from "react";

export default function IndeterminateProgressExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <Progress color="blue" label="データを準備しています" value={null} />
      <Progress color="green" label="完了した処理" value={100} />
    </div>
  );
}
