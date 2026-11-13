import { Radio, RadioGroup } from "@suru-ui/react";
import * as React from "react";

export default function RadioGroupOrientationExample(): React.ReactNode {
  return (
    <RadioGroup
      style={{ gap: "1.25rem" }}
      orientation="horizontal"
      defaultValue="system"
      aria-label="テーマ"
    >
      <label
        style={{
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Radio value="light" />
        ライト
      </label>
      <label
        style={{
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Radio value="dark" />
        ダーク
      </label>
      <label
        style={{
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Radio value="system" />
        システム
      </label>
    </RadioGroup>
  );
}
