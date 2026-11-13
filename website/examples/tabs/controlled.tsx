import { Tabs } from "@suru-ui/react";
import * as React from "react";

const items = [
  {
    label: "概要",
    value: "overview",
    content: <p>概要を表示します。</p>,
  },
  {
    label: "詳細",
    value: "details",
    content: <p>詳細を表示します。</p>,
  },
  {
    label: "履歴",
    value: "history",
    content: <p>変更履歴を表示します。</p>,
  },
];

export default function ControlledTabsExample(): React.ReactNode {
  const [value, setValue] = React.useState("overview");

  return (
    <div
      style={{
        gap: "0.5rem",
        width: "min(100%, 30rem)",
        display: "grid",
      }}
    >
      <Tabs
        items={items}
        value={value}
        onValueChange={(nextValue) => {
          setValue(String(nextValue));
        }}
      />
      <span
        style={{
          color: "#666",
          fontSize: "0.875rem",
        }}
      >
        現在の値: {value}
      </span>
    </div>
  );
}
