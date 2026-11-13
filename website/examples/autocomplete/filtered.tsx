import { Autocomplete } from "@suru-ui/react";
import * as React from "react";

const FRUITS = ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"] as const;

export default function FilteredAutocompleteExample(): React.ReactNode {
  const [query, setQuery] = React.useState("");
  const filteredItems = FRUITS.filter((fruit) => fruit.includes(query));

  return (
    <div
      style={{
        gap: "0.5rem",
        width: "18rem",
        display: "grid",
      }}
    >
      <Autocomplete
        empty="候補がありません"
        items={FRUITS}
        filter={null}
        status={query ? `${filteredItems.length} 件の候補` : undefined}
        placeholder="果物を検索"
        filteredItems={filteredItems}
        onValueChange={setQuery}
      />
      <span
        style={{
          color: "#525252",
          fontSize: "0.875rem",
        }}
      >
        入力値: {query || "（未入力）"}
      </span>
    </div>
  );
}
