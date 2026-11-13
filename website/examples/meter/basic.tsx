import { Meter } from "@suru-ui/react";
import * as React from "react";

export default function BasicMeterExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <Meter max={100} color="blue" label="ストレージ使用量" value={72} />
      <Meter max={100} size="sm" color="green" label="メモリー使用量" value={48} />
    </div>
  );
}
