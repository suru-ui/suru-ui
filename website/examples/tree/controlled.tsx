import { Tree } from "@suru-ui/react";
import * as React from "react";

const items = [
  {
    id: "src",
    items: [
      {
        id: "button",
        label: "Button.tsx",
      },
      {
        id: "input",
        label: "Input.tsx",
      },
      {
        id: "index",
        label: "index.ts",
      },
    ],
    label: "src",
  },
  {
    id: "public",
    items: [
      {
        id: "favicon",
        label: "favicon.ico",
      },
    ],
    label: "public",
  },
  {
    id: "package",
    label: "package.json",
  },
];

export default function ControlledTreeExample(): React.ReactNode {
  const [value, setValue] = React.useState<readonly string[]>(["button"]);
  const [expandedValue, setExpandedValue] = React.useState<readonly string[]>(["src"]);

  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
      }}
    >
      <Tree
        items={items}
        style={{ width: "17rem" }}
        value={value}
        expandedValue={expandedValue}
        onValueChange={setValue}
        onExpandedValueChange={setExpandedValue}
        aria-label="プロジェクトのファイル"
      />
      <span
        style={{
          color: "#666",
          fontSize: "0.875rem",
        }}
      >
        選択中: {value.length > 0 ? value.join(", ") : "なし"}
      </span>
    </div>
  );
}
