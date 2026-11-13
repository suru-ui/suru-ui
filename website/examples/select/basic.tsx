import { Select } from "@suru-ui/react";
import * as React from "react";

const FRUITS = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function BasicSelectExample(): React.ReactNode {
  return (
    <Select
      items={FRUITS}
      label="果物"
      style={{
        width: "15rem",
        maxWidth: "100%",
      }}
      placeholder="果物を選択"
    />
  );
}
