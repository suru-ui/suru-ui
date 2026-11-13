import { Select } from "@suru-ui/react";
import * as React from "react";

const FOODS = [
  {
    items: ["りんご", "ばなな", "みかん"],
    label: "果物",
  },
  {
    items: ["にんじん", "きゅうり", "トマト"],
    label: "野菜",
  },
];

export default function SelectGroupedExample(): React.ReactNode {
  return (
    <Select
      items={FOODS}
      label="食材"
      style={{
        width: "15rem",
        maxWidth: "100%",
      }}
      placeholder="食材を選択"
    />
  );
}
