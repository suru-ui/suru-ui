import { Combobox } from "@suru-ui/react";
import * as React from "react";

const FRUITS = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function BasicComboboxExample(): React.ReactNode {
  return (
    <div style={{ width: "16rem" }}>
      <Combobox items={FRUITS} placeholder="果物を選択" />
    </div>
  );
}
