import { Autocomplete } from "@suru-ui/react";
import * as React from "react";

const FRUITS = ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"];

export default function BasicAutocompleteExample(): React.ReactNode {
  return (
    <div style={{ width: "16rem" }}>
      <Autocomplete
        empty="該当するフルーツがありません"
        items={FRUITS}
        placeholder="フルーツを検索"
      />
    </div>
  );
}
