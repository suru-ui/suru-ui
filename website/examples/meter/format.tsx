import { Meter } from "@suru-ui/react";
import * as React from "react";

export default function MeterFormatExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <Meter
        max={256}
        color="blue"
        label="ストレージ"
        value={183}
        format={{
          unit: "gigabyte",
          style: "unit",
          maximumFractionDigits: 0,
        }}
        locale="ja-JP"
      />
      <Meter
        max={1}
        color="green"
        label="完了したタスク"
        value={0.72}
        format={{ style: "percent" }}
        locale="ja-JP"
      />
    </div>
  );
}
