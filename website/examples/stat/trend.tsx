import { Stat } from "@suru-ui/react";
import * as React from "react";

export default function StatTrendExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "2rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Stat label="自動判定（増加）" trend="+200（20 %）" value={1200} description="先月より" />
      <Stat label="自動判定（減少）" trend="-40（4 %）" value={980} description="先月より" />
      <Stat
        label="明示的に指定"
        trend="変化なし"
        value={1000}
        slotProps={{ trend: { direction: "flat" } }}
        description="前月と同じ"
      />
    </div>
  );
}
