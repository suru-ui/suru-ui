import { Combobox } from "@suru-ui/react";
import * as React from "react";

const GROUPS = [
  {
    items: ["りんご", "ばなな", "みかん"],
    label: "果物",
  },
  {
    items: ["にんじん", "きゅうり", "トマト"],
    label: "野菜",
  },
];

export default function ComboboxGroupedExample(): React.ReactNode {
  return (
    <div style={{ width: "16rem" }}>
      <Combobox items={GROUPS} placeholder="食材を選択" />
    </div>
  );
}
