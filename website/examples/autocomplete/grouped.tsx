import { Autocomplete } from "@suru-ui/react";
import * as React from "react";

const GROUPS = [
  {
    items: ["りんご", "バナナ", "みかん"],
    label: "果物",
  },
  {
    items: ["にんじん", "きゅうり", "トマト"],
    label: "野菜",
  },
];

export default function GroupedAutocompleteExample(): React.ReactNode {
  return (
    <div style={{ width: "16rem" }}>
      <Autocomplete empty="該当する食材がありません" items={GROUPS} placeholder="食材を検索" />
    </div>
  );
}
