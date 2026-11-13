import { type SelectVariant, Select } from "@suru-ui/react";
import * as React from "react";

const FRUITS = ["りんご", "ばなな", "ぶどう", "みかん"];
const VARIANTS: readonly SelectVariant[] = ["naked", "liquid"];

export default function SelectAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "15rem",
        display: "grid",
        maxWidth: "100%",
      }}
    >
      {VARIANTS.map((variant) => (
        <Select
          key={variant}
          items={FRUITS}
          label={variant}
          variant={variant}
          placeholder="選択してください"
        />
      ))}
      <Select items={FRUITS} label="radius: full" radius="full" placeholder="選択してください" />
    </div>
  );
}
