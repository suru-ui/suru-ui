import { Radio, RadioGroup } from "@suru-ui/react";
import * as React from "react";

const labels: Record<string, string> = {
  daily: "毎日",
  weekly: "毎週",
  monthly: "毎月",
};

export default function ControlledRadioGroupExample(): React.ReactNode {
  const [value, setValue] = React.useState("monthly");

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <RadioGroup
        style={{ gap: "0.625rem" }}
        value={value}
        onValueChange={(nextValue) => {
          if (typeof nextValue === "string") {
            setValue(nextValue);
          }
        }}
        aria-label="通知の頻度"
      >
        <label
          style={{
            gap: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Radio value="daily" />
          毎日
        </label>
        <label
          style={{
            gap: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Radio value="weekly" />
          毎週
        </label>
        <label
          style={{
            gap: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Radio value="monthly" />
          毎月
        </label>
      </RadioGroup>
      <span
        style={{
          color: "#52525b",
          fontSize: "0.875rem",
        }}
      >
        選択中: {labels[value] ?? value}
      </span>
    </div>
  );
}
