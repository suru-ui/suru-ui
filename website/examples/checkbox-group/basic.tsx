import { Checkbox, CheckboxGroup } from "@suru-ui/react";
import * as React from "react";

const ITEMS = [
  {
    label: "デザイン",
    value: "design",
  },
  {
    label: "エンジニアリング",
    value: "engineering",
  },
  {
    label: "マーケティング",
    value: "marketing",
  },
];

const rowStyle = {
  gap: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
} as const;

export default function BasicCheckboxGroupExample(): React.ReactNode {
  return (
    <CheckboxGroup
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
      defaultValue={["design"]}
    >
      {ITEMS.map((item) => (
        <label key={item.value} style={rowStyle}>
          <Checkbox value={item.value} />
          {item.label}
        </label>
      ))}
    </CheckboxGroup>
  );
}
